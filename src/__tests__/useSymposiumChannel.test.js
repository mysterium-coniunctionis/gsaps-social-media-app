import { act, renderHook, waitFor } from '@testing-library/react';
import { useSymposiumChannel } from '../api/symposiumClient';

const realtimeMocks = {};

jest.mock('../context/RealtimeContext', () => {
  const subscribeToChannel = jest.fn(() => jest.fn());
  const emitWithAck = jest.fn((event, payload, { onSuccess } = {}) => onSuccess?.(payload));
  const updatePresence = jest.fn();

  realtimeMocks.subscribeToChannel = subscribeToChannel;
  realtimeMocks.emitWithAck = emitWithAck;
  realtimeMocks.updatePresence = updatePresence;

  return {
    __esModule: true,
    useRealtime: () => ({
      subscribeToChannel,
      emitWithAck,
      presenceByRoom: {},
      updatePresence,
      isConnected: false
    })
  };
});

jest.mock('../data/symposiumData', () => ({
  findSymposiumById: jest.fn(() => ({
    agenda: [],
    speakerQueue: [],
    notes: [],
    polls: [],
    attendees: []
  }))
}));

describe('useSymposiumChannel', () => {
  beforeEach(() => {
    realtimeMocks.subscribeToChannel?.mockClear();
    realtimeMocks.emitWithAck?.mockClear();
    realtimeMocks.updatePresence?.mockClear();
    const { findSymposiumById } = require('../data/symposiumData');
    findSymposiumById.mockReset();
    findSymposiumById.mockReturnValue({
      agenda: [],
      speakerQueue: [],
      notes: [],
      polls: [],
      protocolDraft: 'protocol stub',
      attendees: []
    });
  });

  it('adds chat messages optimistically and records last event', () => {
    const { result } = renderHook(() => useSymposiumChannel('symp-001'));

    act(() => {
      result.current.sendChatMessage({ author: 'Tester', body: 'Hello' });
    });

    expect(result.current.chat.some((msg) => msg.body === 'Hello' && msg.optimistic)).toBe(true);
    expect(realtimeMocks.emitWithAck).toHaveBeenCalledWith(
      expect.stringContaining('chat:new'),
      expect.objectContaining({ body: 'Hello' }),
      expect.any(Object)
    );
  });

  it('increments poll votes optimistically', () => {
    const { findSymposiumById } = require('../data/symposiumData');
    findSymposiumById.mockReturnValue({
      agenda: [],
      speakerQueue: [],
      notes: [],
      polls: [
        { id: 'poll-1', options: [{ id: 'opt-1', label: 'Yes', votes: 0 }] }
      ],
      protocolDraft: 'protocol stub',
      attendees: []
    });

    const { result } = renderHook(() => useSymposiumChannel('symp-001'));

    act(() => {
      result.current.castPollVote('poll-1', 'opt-1');
    });

    expect(result.current.polls[0].options[0].votes).toBe(1);
  });

  it('publishes canvas updates and records last event', async () => {
    const { result } = renderHook(() => useSymposiumChannel('symp-001'));

    act(() => {
      result.current.updateCanvasDraft('new content');
    });

    expect(result.current.canvas).toBe('new content');
    expect(realtimeMocks.emitWithAck).toHaveBeenCalledWith(
      expect.stringContaining('canvas:update'),
      expect.objectContaining({ content: 'new content' }),
      expect.any(Object)
    );
    await waitFor(() =>
      expect(result.current.lastEvent).toEqual({ type: 'canvas:update', payload: expect.any(Object) })
    );
  });
});
