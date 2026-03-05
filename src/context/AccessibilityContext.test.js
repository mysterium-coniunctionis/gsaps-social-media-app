import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AccessibilityProvider, useAccessibility } from './AccessibilityContext';

// Test component that consumes the context
const TestConsumer = () => {
  const { preferences, togglePreference, setPreference } = useAccessibility();

  return (
    <div>
      <span data-testid="highContrast">{String(preferences.highContrast)}</span>
      <span data-testid="largeText">{String(preferences.largeText)}</span>
      <span data-testid="reduceMotion">{String(preferences.reduceMotion)}</span>
      <span data-testid="captions">{String(preferences.captions)}</span>

      <button onClick={() => togglePreference('highContrast')}>Toggle Contrast</button>
      <button onClick={() => togglePreference('largeText')}>Toggle Large Text</button>
      <button onClick={() => togglePreference('reduceMotion')}>Toggle Reduce Motion</button>
      <button onClick={() => setPreference('captions', false)}>Disable Captions</button>
    </div>
  );
};

describe('AccessibilityContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
  });

  it('provides default preferences', () => {
    render(
      <AccessibilityProvider>
        <TestConsumer />
      </AccessibilityProvider>
    );

    expect(screen.getByTestId('highContrast').textContent).toBe('false');
    expect(screen.getByTestId('largeText').textContent).toBe('false');
    expect(screen.getByTestId('reduceMotion').textContent).toBe('false');
    expect(screen.getByTestId('captions').textContent).toBe('true');
  });

  it('toggles preferences on button click', () => {
    render(
      <AccessibilityProvider>
        <TestConsumer />
      </AccessibilityProvider>
    );

    expect(screen.getByTestId('highContrast').textContent).toBe('false');

    fireEvent.click(screen.getByText('Toggle Contrast'));
    expect(screen.getByTestId('highContrast').textContent).toBe('true');

    fireEvent.click(screen.getByText('Toggle Contrast'));
    expect(screen.getByTestId('highContrast').textContent).toBe('false');
  });

  it('sets a specific preference value', () => {
    render(
      <AccessibilityProvider>
        <TestConsumer />
      </AccessibilityProvider>
    );

    expect(screen.getByTestId('captions').textContent).toBe('true');

    fireEvent.click(screen.getByText('Disable Captions'));
    expect(screen.getByTestId('captions').textContent).toBe('false');
  });

  it('persists preferences to localStorage', () => {
    render(
      <AccessibilityProvider>
        <TestConsumer />
      </AccessibilityProvider>
    );

    fireEvent.click(screen.getByText('Toggle Large Text'));

    const stored = JSON.parse(localStorage.getItem('a11y-preferences'));
    expect(stored.largeText).toBe(true);
  });

  it('loads preferences from localStorage on mount', () => {
    localStorage.setItem('a11y-preferences', JSON.stringify({
      highContrast: true,
      largeText: true,
      reduceMotion: true,
      captions: false
    }));

    render(
      <AccessibilityProvider>
        <TestConsumer />
      </AccessibilityProvider>
    );

    expect(screen.getByTestId('highContrast').textContent).toBe('true');
    expect(screen.getByTestId('largeText').textContent).toBe('true');
    expect(screen.getByTestId('reduceMotion').textContent).toBe('true');
    expect(screen.getByTestId('captions').textContent).toBe('false');
  });

  it('applies body classes based on preferences', () => {
    render(
      <AccessibilityProvider>
        <TestConsumer />
      </AccessibilityProvider>
    );

    fireEvent.click(screen.getByText('Toggle Contrast'));
    expect(document.body.classList.contains('high-contrast-mode')).toBe(true);

    fireEvent.click(screen.getByText('Toggle Large Text'));
    expect(document.body.classList.contains('large-text-mode')).toBe(true);

    fireEvent.click(screen.getByText('Toggle Reduce Motion'));
    expect(document.body.classList.contains('reduced-motion')).toBe(true);
  });

  it('falls back to defaults on malformed localStorage data', () => {
    localStorage.setItem('a11y-preferences', 'not-json');

    render(
      <AccessibilityProvider>
        <TestConsumer />
      </AccessibilityProvider>
    );

    expect(screen.getByTestId('highContrast').textContent).toBe('false');
    expect(screen.getByTestId('captions').textContent).toBe('true');
  });

  it('merges partial stored preferences with defaults', () => {
    localStorage.setItem('a11y-preferences', JSON.stringify({ highContrast: true }));

    render(
      <AccessibilityProvider>
        <TestConsumer />
      </AccessibilityProvider>
    );

    expect(screen.getByTestId('highContrast').textContent).toBe('true');
    expect(screen.getByTestId('captions').textContent).toBe('true');
    expect(screen.getByTestId('largeText').textContent).toBe('false');
  });
});
