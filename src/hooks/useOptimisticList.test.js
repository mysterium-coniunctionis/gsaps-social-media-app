jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));

jest.mock('../context/RealtimeContext', () => ({
  useRealtime: jest.fn()
}));

import { renderHook, act } from '@testing-library/react';
import { useOptimisticList } from './useOptimisticList';
import { useRealtime } from '../context/RealtimeContext';

describe('useOptimisticList', () => {
  let mockEmitWithAck;
  let mockReconcileOptimisticUpdate;
  let mockSetItems;

  beforeEach(() => {
    mockEmitWithAck = jest.fn();
    mockReconcileOptimisticUpdate = jest.fn();
    mockSetItems = jest.fn();

    useRealtime.mockReturnValue({
      emitWithAck: mockEmitWithAck,
      reconcileOptimisticUpdate: mockReconcileOptimisticUpdate
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderOptimisticList = (overrides = {}) =>
    renderHook(() =>
      useOptimisticList({
        roomId: 'room-1',
        namespace: 'comments',
        setItems: mockSetItems,
        ...overrides
      })
    );

  test('addOptimisticItem calls setItems with optimistic item then calls emitWithAck', () => {
    const { result } = renderOptimisticList();

    const item = { text: 'hello' };
    act(() => {
      result.current.addOptimisticItem('new-comment', item);
    });

    // setItems should be called with a function that appends the optimistic item
    expect(mockSetItems).toHaveBeenCalledTimes(1);
    const updater = mockSetItems.mock.calls[0][0];
    const newState = updater([]);
    expect(newState).toHaveLength(1);
    expect(newState[0]).toMatchObject({
      text: 'hello',
      optimistic: true,
      status: 'pending'
    });
    expect(newState[0].id).toBeDefined();
    expect(newState[0].tempId).toBeDefined();

    // emitWithAck should be called with the event, payload and callbacks
    expect(mockEmitWithAck).toHaveBeenCalledTimes(1);
    expect(mockEmitWithAck.mock.calls[0][0]).toBe('new-comment');
    expect(mockEmitWithAck.mock.calls[0][1]).toMatchObject({
      text: 'hello',
      roomId: 'room-1',
      namespace: 'comments'
    });
  });

  test('onSuccess callback updates item to confirmed', () => {
    const { result } = renderOptimisticList();

    const userOnSuccess = jest.fn();
    let tempId;
    act(() => {
      tempId = result.current.addOptimisticItem(
        'new-comment',
        { text: 'hello' },
        { onSuccess: userOnSuccess }
      );
    });

    // Extract the onSuccess callback passed to emitWithAck
    const emitCallbacks = mockEmitWithAck.mock.calls[0][2];
    const serverItem = { id: 'server-123', text: 'hello' };

    mockSetItems.mockClear();
    act(() => {
      emitCallbacks.onSuccess(serverItem);
    });

    // setItems should update the item to confirmed
    expect(mockSetItems).toHaveBeenCalledTimes(1);
    const updater = mockSetItems.mock.calls[0][0];
    const existingItems = [{ id: tempId, text: 'hello', optimistic: true, status: 'pending', tempId }];
    const updated = updater(existingItems);
    expect(updated[0]).toMatchObject({
      id: 'server-123',
      optimistic: false,
      status: 'confirmed'
    });

    // User's onSuccess callback should be called
    expect(userOnSuccess).toHaveBeenCalledWith(serverItem);
  });

  test('onError callback removes item', () => {
    const { result } = renderOptimisticList();

    const userOnError = jest.fn();
    let tempId;
    act(() => {
      tempId = result.current.addOptimisticItem(
        'new-comment',
        { text: 'hello' },
        { onError: userOnError }
      );
    });

    const emitCallbacks = mockEmitWithAck.mock.calls[0][2];
    const error = new Error('Server error');

    mockSetItems.mockClear();
    act(() => {
      emitCallbacks.onError(error);
    });

    // setItems should filter out the item
    expect(mockSetItems).toHaveBeenCalledTimes(1);
    const updater = mockSetItems.mock.calls[0][0];
    const existingItems = [
      { id: 'other-1', text: 'other' },
      { id: tempId, text: 'hello', optimistic: true, status: 'pending', tempId }
    ];
    const updated = updater(existingItems);
    expect(updated).toHaveLength(1);
    expect(updated[0].id).toBe('other-1');

    // User's onError callback should be called
    expect(userOnError).toHaveBeenCalledWith(error);
  });

  test('removeOptimistic removes item by tempId', () => {
    const { result } = renderOptimisticList();

    act(() => {
      result.current.removeOptimistic('temp-abc');
    });

    expect(mockSetItems).toHaveBeenCalledTimes(1);
    const updater = mockSetItems.mock.calls[0][0];
    const existingItems = [
      { id: 'temp-abc', text: 'will be removed' },
      { id: 'keep-me', text: 'stays' }
    ];
    const updated = updater(existingItems);
    expect(updated).toHaveLength(1);
    expect(updated[0].id).toBe('keep-me');
  });

  test('removeOptimistic does nothing when tempId is falsy', () => {
    const { result } = renderOptimisticList();

    act(() => {
      result.current.removeOptimistic(null);
    });

    expect(mockSetItems).not.toHaveBeenCalled();
  });

  test('confirmFromServer handles new items without tempId', () => {
    const { result } = renderOptimisticList();

    const incoming = { id: 'server-999', text: 'new from server' };
    act(() => {
      result.current.confirmFromServer(incoming);
    });

    expect(mockSetItems).toHaveBeenCalledTimes(1);
    const updater = mockSetItems.mock.calls[0][0];
    const existingItems = [{ id: 'existing-1', text: 'existing' }];
    const updated = updater(existingItems);
    // Should append the new item since no tempId or id match
    expect(updated).toHaveLength(2);
    expect(updated[1]).toMatchObject({
      id: 'server-999',
      text: 'new from server',
      optimistic: false,
      status: 'confirmed'
    });
  });

  test('confirmFromServer replaces temp item when tempId matches', () => {
    const { result } = renderOptimisticList();

    const incoming = { id: 'server-555', tempId: 'temp-match', text: 'confirmed text' };
    act(() => {
      result.current.confirmFromServer(incoming);
    });

    expect(mockReconcileOptimisticUpdate).toHaveBeenCalledWith('temp-match', incoming);

    const updater = mockSetItems.mock.calls[0][0];
    const existingItems = [
      { id: 'temp-match', text: 'optimistic text', optimistic: true, status: 'pending', tempId: 'temp-match' }
    ];
    const updated = updater(existingItems);
    expect(updated).toHaveLength(1);
    expect(updated[0]).toMatchObject({
      id: 'server-555',
      text: 'confirmed text',
      optimistic: false,
      status: 'confirmed'
    });
  });

  test('confirmFromServer does nothing when incoming is null', () => {
    const { result } = renderOptimisticList();

    act(() => {
      result.current.confirmFromServer(null);
    });

    expect(mockSetItems).not.toHaveBeenCalled();
    expect(mockReconcileOptimisticUpdate).not.toHaveBeenCalled();
  });
});
