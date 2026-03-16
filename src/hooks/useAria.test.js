jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));

const mockContext = {
  isAriaOpen: false,
  conversationHistory: [],
  currentContext: { type: null, data: null },
  isVoiceActive: false,
  voiceSupported: false,
  openAria: jest.fn(),
  closeAria: jest.fn(),
  toggleAria: jest.fn(),
  addMessage: jest.fn(),
  clearHistory: jest.fn(),
  updateContext: jest.fn(),
  setIsVoiceActive: jest.fn(),
  cacheAnalysis: jest.fn(),
  getCachedAnalysis: jest.fn()
};

jest.mock('../context/AriaContext', () => ({
  useAriaContext: jest.fn(() => mockContext)
}));

jest.mock('../api/ariaService', () => ({
  analyzePaper: jest.fn(),
  explainTerm: jest.fn(),
  findRelatedPapers: jest.fn(),
  answerQuestion: jest.fn(),
  generateSuggestions: jest.fn()
}));

import { renderHook, act } from '@testing-library/react';
import { useAria } from './useAria';
import { useAriaContext } from '../context/AriaContext';
import { fireEvent } from '@testing-library/react';

describe('useAria', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mockContext state
    mockContext.isAriaOpen = false;
    useAriaContext.mockReturnValue(mockContext);
  });

  test('returns all expected properties', () => {
    const { result } = renderHook(() => useAria());

    expect(result.current).toHaveProperty('isOpen');
    expect(result.current).toHaveProperty('sendMessage');
    expect(result.current).toHaveProperty('toggle');
    expect(result.current).toHaveProperty('open');
    expect(result.current).toHaveProperty('close');
    expect(result.current).toHaveProperty('conversationHistory');
    expect(result.current).toHaveProperty('currentContext');
    expect(result.current).toHaveProperty('isVoiceActive');
    expect(result.current).toHaveProperty('voiceSupported');
    expect(result.current).toHaveProperty('clearHistory');
    expect(result.current).toHaveProperty('updateContext');
    expect(result.current).toHaveProperty('startVoiceInput');
    expect(result.current).toHaveProperty('stopVoiceInput');
    expect(result.current).toHaveProperty('getSuggestions');
    expect(result.current).toHaveProperty('detectContext');
    expect(result.current).toHaveProperty('cacheAnalysis');
    expect(result.current).toHaveProperty('getCachedAnalysis');
  });

  test('keyboard shortcut Ctrl+K calls toggleAria', () => {
    renderHook(() => useAria());

    act(() => {
      fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    });

    expect(mockContext.toggleAria).toHaveBeenCalled();
  });

  test('Escape key calls closeAria when isAriaOpen is true', () => {
    mockContext.isAriaOpen = true;
    useAriaContext.mockReturnValue({ ...mockContext, isAriaOpen: true });

    renderHook(() => useAria());

    act(() => {
      fireEvent.keyDown(window, { key: 'Escape' });
    });

    expect(mockContext.closeAria).toHaveBeenCalled();
  });

  test('Escape key does not call closeAria when isAriaOpen is false', () => {
    mockContext.isAriaOpen = false;
    useAriaContext.mockReturnValue({ ...mockContext, isAriaOpen: false });

    renderHook(() => useAria());

    act(() => {
      fireEvent.keyDown(window, { key: 'Escape' });
    });

    expect(mockContext.closeAria).not.toHaveBeenCalled();
  });

  test('detectContext returns paper type for /library/ path', () => {
    delete window.location;
    window.location = { pathname: '/library/paper-123' };

    const { result } = renderHook(() => useAria());

    const context = result.current.detectContext();
    expect(context.type).toBe('paper');
    expect(context.paperId).toBe('paper-123');
  });

  test('detectContext returns course type for /courses/ path', () => {
    delete window.location;
    window.location = { pathname: '/courses/course-456' };

    const { result } = renderHook(() => useAria());

    const context = result.current.detectContext();
    expect(context.type).toBe('course');
    expect(context.courseId).toBe('course-456');
  });

  test('detectContext returns feed type for /feed path', () => {
    delete window.location;
    window.location = { pathname: '/feed' };

    const { result } = renderHook(() => useAria());

    const context = result.current.detectContext();
    expect(context.type).toBe('feed');
  });

  test('detectContext returns general type for unknown path', () => {
    delete window.location;
    window.location = { pathname: '/settings' };

    const { result } = renderHook(() => useAria());

    const context = result.current.detectContext();
    expect(context.type).toBe('general');
  });

  test('detectContext returns post type for /post/ path', () => {
    delete window.location;
    window.location = { pathname: '/post/post-789' };

    const { result } = renderHook(() => useAria());

    const context = result.current.detectContext();
    expect(context.type).toBe('post');
    expect(context.postId).toBe('post-789');
  });
});
