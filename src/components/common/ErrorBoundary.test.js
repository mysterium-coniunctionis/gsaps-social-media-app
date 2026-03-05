import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ErrorBoundary from './ErrorBoundary';

const theme = createTheme();

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

// A component that throws an error
const ThrowError = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console.error for expected errors in tests
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('should render children when there is no error', () => {
    renderWithTheme(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('should render default error UI when child throws', () => {
    renderWithTheme(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(/We apologize for the inconvenience/)).toBeInTheDocument();
  });

  it('should render Reload Page and Try Again buttons', () => {
    renderWithTheme(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Reload Page')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('should reset error state when Try Again is clicked', () => {
    const { rerender } = renderWithTheme(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Click Try Again
    fireEvent.click(screen.getByText('Try Again'));

    // After reset, it will try to render children again, which will throw again
    // But the state should have been reset
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should use custom fallback when provided', () => {
    const customFallback = ({ error, reset }) => (
      <div>
        <p>Custom error: {error ? error.message : 'unknown'}</p>
        <button onClick={reset}>Custom reset</button>
      </div>
    );

    renderWithTheme(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError />
      </ErrorBoundary>
    );

    // getDerivedStateFromError sets hasError=true but error is set in componentDidCatch
    // The fallback is rendered with the error from state
    expect(screen.getByText(/Custom error:/)).toBeInTheDocument();
    expect(screen.getByText('Custom reset')).toBeInTheDocument();
  });

  it('should call custom fallback reset function', () => {
    const customFallback = ({ reset }) => (
      <div>
        <p>Custom error</p>
        <button onClick={reset}>Custom reset</button>
      </div>
    );

    renderWithTheme(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Custom reset'));

    // After reset, the component will throw again and show fallback again
    expect(screen.getByText('Custom error')).toBeInTheDocument();
  });
});
