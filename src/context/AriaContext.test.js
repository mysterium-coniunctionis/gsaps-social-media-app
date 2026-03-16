import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AriaProvider, useAriaContext } from './AriaContext';

function TestComponent({ action }) {
  const ctx = useAriaContext();
  return (
    <div>
      <span data-testid="isOpen">{String(ctx.isAriaOpen)}</span>
      <span data-testid="history">{JSON.stringify(ctx.conversationHistory)}</span>
      <span data-testid="context">{JSON.stringify(ctx.currentContext)}</span>
      <span data-testid="voiceActive">{String(ctx.isVoiceActive)}</span>
      <button data-testid="action" onClick={() => action(ctx)}>Act</button>
    </div>
  );
}

function renderWithProvider(action = () => {}) {
  return render(
    <AriaProvider>
      <TestComponent action={action} />
    </AriaProvider>
  );
}

describe('AriaContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  describe('useAriaContext outside provider', () => {
    it('throws an error when used outside AriaProvider', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      function Orphan() {
        useAriaContext();
        return null;
      }

      expect(() => render(<Orphan />)).toThrow(
        'useAriaContext must be used within AriaProvider'
      );

      spy.mockRestore();
    });
  });

  describe('openAria / closeAria / toggleAria', () => {
    it('openAria sets isAriaOpen to true', () => {
      renderWithProvider((ctx) => ctx.openAria());

      expect(screen.getByTestId('isOpen')).toHaveTextContent('false');

      act(() => screen.getByTestId('action').click());

      expect(screen.getByTestId('isOpen')).toHaveTextContent('true');
    });

    it('openAria with context sets both open and context', () => {
      const newCtx = { type: 'paper', paperId: 'p1' };
      renderWithProvider((ctx) => ctx.openAria(newCtx));

      act(() => screen.getByTestId('action').click());

      expect(screen.getByTestId('isOpen')).toHaveTextContent('true');
      const contextValue = JSON.parse(screen.getByTestId('context').textContent);
      expect(contextValue.type).toBe('paper');
      expect(contextValue.paperId).toBe('p1');
    });

    it('closeAria sets isAriaOpen to false', () => {
      let callCount = 0;
      renderWithProvider((ctx) => {
        callCount++;
        if (callCount === 1) ctx.openAria();
        else ctx.closeAria();
      });

      act(() => screen.getByTestId('action').click());
      expect(screen.getByTestId('isOpen')).toHaveTextContent('true');

      act(() => screen.getByTestId('action').click());
      expect(screen.getByTestId('isOpen')).toHaveTextContent('false');
    });

    it('toggleAria toggles isAriaOpen', () => {
      renderWithProvider((ctx) => ctx.toggleAria());

      act(() => screen.getByTestId('action').click());
      expect(screen.getByTestId('isOpen')).toHaveTextContent('true');

      act(() => screen.getByTestId('action').click());
      expect(screen.getByTestId('isOpen')).toHaveTextContent('false');
    });
  });

  describe('addMessage', () => {
    it('adds a message to conversation history', () => {
      renderWithProvider((ctx) =>
        ctx.addMessage({ role: 'user', content: 'Hello', id: 'msg-1', timestamp: '2026-01-01T00:00:00Z' })
      );

      act(() => screen.getByTestId('action').click());

      const history = JSON.parse(screen.getByTestId('history').textContent);
      expect(history).toHaveLength(1);
      expect(history[0].role).toBe('user');
      expect(history[0].content).toBe('Hello');
      expect(history[0].id).toBe('msg-1');
    });
  });

  describe('clearHistory', () => {
    it('clears conversation history and localStorage', () => {
      localStorage.setItem('aria_conversation_history', JSON.stringify([{ role: 'user', content: 'Hi' }]));

      let callCount = 0;
      renderWithProvider((ctx) => {
        callCount++;
        if (callCount === 1) ctx.addMessage({ role: 'user', content: 'Test', id: 'msg-2', timestamp: '2026-01-01T00:00:00Z' });
        else ctx.clearHistory();
      });

      act(() => screen.getByTestId('action').click());
      let history = JSON.parse(screen.getByTestId('history').textContent);
      expect(history.length).toBeGreaterThan(0);

      act(() => screen.getByTestId('action').click());
      history = JSON.parse(screen.getByTestId('history').textContent);
      expect(history).toHaveLength(0);
      // clearHistory removes the key, but the useEffect that persists
      // conversationHistory fires afterward and writes '[]' back.
      // Verify the stored value represents an empty history.
      const stored = localStorage.getItem('aria_conversation_history');
      expect(!stored || stored === '[]').toBe(true);
    });
  });

  describe('updateContext', () => {
    it('merges new context with existing context', () => {
      let callCount = 0;
      renderWithProvider((ctx) => {
        callCount++;
        if (callCount === 1) ctx.updateContext({ type: 'paper', paperId: 'p1' });
        else ctx.updateContext({ courseId: 'c1' });
      });

      act(() => screen.getByTestId('action').click());
      let contextValue = JSON.parse(screen.getByTestId('context').textContent);
      expect(contextValue.type).toBe('paper');
      expect(contextValue.paperId).toBe('p1');

      act(() => screen.getByTestId('action').click());
      contextValue = JSON.parse(screen.getByTestId('context').textContent);
      expect(contextValue.type).toBe('paper');
      expect(contextValue.paperId).toBe('p1');
      expect(contextValue.courseId).toBe('c1');
    });
  });

  describe('cacheAnalysis and getCachedAnalysis', () => {
    it('caches and retrieves analysis data', () => {
      let cached = null;
      let callCount = 0;
      renderWithProvider((ctx) => {
        callCount++;
        if (callCount === 1) {
          ctx.cacheAnalysis('key1', { summary: 'test' });
        } else {
          cached = ctx.getCachedAnalysis('key1');
        }
      });

      act(() => screen.getByTestId('action').click());
      act(() => screen.getByTestId('action').click());

      expect(cached).toEqual({ summary: 'test' });
    });

    it('returns null for expired cache entries', () => {
      let cached = 'not-null';
      let callCount = 0;
      const realDateNow = Date.now;

      renderWithProvider((ctx) => {
        callCount++;
        if (callCount === 1) {
          ctx.cacheAnalysis('key2', { summary: 'old' });
        } else {
          // Simulate time passing beyond maxAge
          Date.now = () => realDateNow() + 400000;
          cached = ctx.getCachedAnalysis('key2', 300000);
          Date.now = realDateNow;
        }
      });

      act(() => screen.getByTestId('action').click());
      act(() => screen.getByTestId('action').click());

      expect(cached).toBeNull();
    });

    it('returns null for non-existent keys', () => {
      let cached = 'not-null';
      renderWithProvider((ctx) => {
        cached = ctx.getCachedAnalysis('nonexistent');
      });

      // Trigger action to invoke getCachedAnalysis via re-render
      act(() => screen.getByTestId('action').click());

      expect(cached).toBeNull();
    });
  });

  describe('localStorage persistence', () => {
    it('persists conversation history to localStorage on change', () => {
      renderWithProvider((ctx) =>
        ctx.addMessage({ role: 'assistant', content: 'Saved', id: 'msg-3', timestamp: '2026-01-01T00:00:00Z' })
      );

      act(() => screen.getByTestId('action').click());

      const stored = JSON.parse(localStorage.getItem('aria_conversation_history'));
      expect(stored).toHaveLength(1);
      expect(stored[0].content).toBe('Saved');
    });

    it('loads conversation history from localStorage on init', () => {
      const saved = [{ role: 'user', content: 'Previously saved', id: 'old-1', timestamp: '2026-01-01T00:00:00Z' }];
      localStorage.setItem('aria_conversation_history', JSON.stringify(saved));

      renderWithProvider();

      const history = JSON.parse(screen.getByTestId('history').textContent);
      expect(history).toHaveLength(1);
      expect(history[0].content).toBe('Previously saved');
    });
  });
});
