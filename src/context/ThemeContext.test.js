import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, useTheme as useThemeContext } from './ThemeContext';

const TestComponent = () => {
  const { mode, toggleTheme, colorMode } = useThemeContext();

  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button onClick={toggleTheme}>toggle</button>
      <button onClick={colorMode.toggleColorMode}>legacy-toggle</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides toggleTheme for direct access', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('light');

    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(localStorage.getItem('theme_mode')).toBe('dark');
  });

  it('keeps legacy colorMode.toggleColorMode functional', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('legacy-toggle'));
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
  });
});
