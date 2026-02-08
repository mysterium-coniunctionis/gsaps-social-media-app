import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AccessibilityProvider, useAccessibility } from './AccessibilityContext';

const TestConsumer = () => {
  const { preferences, togglePreference, setPreference } = useAccessibility();

  return (
    <div>
      <span data-testid="highContrast">{String(preferences.highContrast)}</span>
      <span data-testid="largeText">{String(preferences.largeText)}</span>
      <span data-testid="reduceMotion">{String(preferences.reduceMotion)}</span>
      <span data-testid="captions">{String(preferences.captions)}</span>
      <button onClick={() => togglePreference('highContrast')}>toggle-hc</button>
      <button onClick={() => togglePreference('largeText')}>toggle-lt</button>
      <button onClick={() => togglePreference('reduceMotion')}>toggle-rm</button>
      <button onClick={() => togglePreference('captions')}>toggle-cap</button>
      <button onClick={() => setPreference('largeText', true)}>set-lt-true</button>
    </div>
  );
};

describe('AccessibilityContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
  });

  describe('default preferences', () => {
    it('should provide default preferences', () => {
      render(
        <AccessibilityProvider>
          <TestConsumer />
        </AccessibilityProvider>
      );

      expect(screen.getByTestId('highContrast')).toHaveTextContent('false');
      expect(screen.getByTestId('largeText')).toHaveTextContent('false');
      expect(screen.getByTestId('reduceMotion')).toHaveTextContent('false');
      expect(screen.getByTestId('captions')).toHaveTextContent('true');
    });
  });

  describe('togglePreference', () => {
    it('should toggle highContrast from false to true', () => {
      render(
        <AccessibilityProvider>
          <TestConsumer />
        </AccessibilityProvider>
      );

      expect(screen.getByTestId('highContrast')).toHaveTextContent('false');
      fireEvent.click(screen.getByText('toggle-hc'));
      expect(screen.getByTestId('highContrast')).toHaveTextContent('true');
    });

    it('should toggle largeText from false to true and back', () => {
      render(
        <AccessibilityProvider>
          <TestConsumer />
        </AccessibilityProvider>
      );

      fireEvent.click(screen.getByText('toggle-lt'));
      expect(screen.getByTestId('largeText')).toHaveTextContent('true');

      fireEvent.click(screen.getByText('toggle-lt'));
      expect(screen.getByTestId('largeText')).toHaveTextContent('false');
    });

    it('should toggle captions from true to false (default is true)', () => {
      render(
        <AccessibilityProvider>
          <TestConsumer />
        </AccessibilityProvider>
      );

      expect(screen.getByTestId('captions')).toHaveTextContent('true');
      fireEvent.click(screen.getByText('toggle-cap'));
      expect(screen.getByTestId('captions')).toHaveTextContent('false');
    });
  });

  describe('setPreference', () => {
    it('should set a specific preference value', () => {
      render(
        <AccessibilityProvider>
          <TestConsumer />
        </AccessibilityProvider>
      );

      expect(screen.getByTestId('largeText')).toHaveTextContent('false');
      fireEvent.click(screen.getByText('set-lt-true'));
      expect(screen.getByTestId('largeText')).toHaveTextContent('true');
    });
  });

  describe('localStorage persistence', () => {
    it('should persist preferences to localStorage', () => {
      render(
        <AccessibilityProvider>
          <TestConsumer />
        </AccessibilityProvider>
      );

      fireEvent.click(screen.getByText('toggle-hc'));

      const stored = JSON.parse(localStorage.getItem('a11y-preferences'));
      expect(stored.highContrast).toBe(true);
    });

    it('should restore preferences from localStorage', () => {
      localStorage.setItem(
        'a11y-preferences',
        JSON.stringify({
          highContrast: true,
          largeText: true,
          reduceMotion: true,
          captions: false
        })
      );

      render(
        <AccessibilityProvider>
          <TestConsumer />
        </AccessibilityProvider>
      );

      expect(screen.getByTestId('highContrast')).toHaveTextContent('true');
      expect(screen.getByTestId('largeText')).toHaveTextContent('true');
      expect(screen.getByTestId('reduceMotion')).toHaveTextContent('true');
      expect(screen.getByTestId('captions')).toHaveTextContent('false');
    });

    it('should handle invalid JSON in localStorage gracefully', () => {
      localStorage.setItem('a11y-preferences', 'not-json');

      render(
        <AccessibilityProvider>
          <TestConsumer />
        </AccessibilityProvider>
      );

      // Should fall back to defaults
      expect(screen.getByTestId('highContrast')).toHaveTextContent('false');
      expect(screen.getByTestId('captions')).toHaveTextContent('true');
    });

    it('should merge stored preferences with defaults for partial data', () => {
      localStorage.setItem(
        'a11y-preferences',
        JSON.stringify({ highContrast: true })
      );

      render(
        <AccessibilityProvider>
          <TestConsumer />
        </AccessibilityProvider>
      );

      expect(screen.getByTestId('highContrast')).toHaveTextContent('true');
      // Defaults for other preferences
      expect(screen.getByTestId('largeText')).toHaveTextContent('false');
      expect(screen.getByTestId('captions')).toHaveTextContent('true');
    });
  });

  describe('body class application', () => {
    it('should apply high-contrast-mode class when highContrast is toggled on', () => {
      render(
        <AccessibilityProvider>
          <TestConsumer />
        </AccessibilityProvider>
      );

      fireEvent.click(screen.getByText('toggle-hc'));
      expect(document.body.classList.contains('high-contrast-mode')).toBe(true);
    });

    it('should apply large-text-mode class when largeText is toggled on', () => {
      render(
        <AccessibilityProvider>
          <TestConsumer />
        </AccessibilityProvider>
      );

      fireEvent.click(screen.getByText('toggle-lt'));
      expect(document.body.classList.contains('large-text-mode')).toBe(true);
    });

    it('should apply reduced-motion class when reduceMotion is toggled on', () => {
      render(
        <AccessibilityProvider>
          <TestConsumer />
        </AccessibilityProvider>
      );

      fireEvent.click(screen.getByText('toggle-rm'));
      expect(document.body.classList.contains('reduced-motion')).toBe(true);
    });

    it('should apply captions-enabled class by default', () => {
      render(
        <AccessibilityProvider>
          <TestConsumer />
        </AccessibilityProvider>
      );

      expect(document.body.classList.contains('captions-enabled')).toBe(true);
    });

    it('should remove body class when preference is toggled off', () => {
      render(
        <AccessibilityProvider>
          <TestConsumer />
        </AccessibilityProvider>
      );

      fireEvent.click(screen.getByText('toggle-hc'));
      expect(document.body.classList.contains('high-contrast-mode')).toBe(true);

      fireEvent.click(screen.getByText('toggle-hc'));
      expect(document.body.classList.contains('high-contrast-mode')).toBe(false);
    });
  });
});
