import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastProvider, useToast, Toast } from './Toast';

const theme = createTheme();

const renderWithTheme = (component) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

const ToastTrigger = () => {
  const { showToast, success, error, warning, info, hideToast } = useToast();

  return (
    <div>
      <button onClick={() => showToast('Generic message')}>show-generic</button>
      <button onClick={() => success('Success message')}>show-success</button>
      <button onClick={() => error('Error message')}>show-error</button>
      <button onClick={() => warning('Warning message')}>show-warning</button>
      <button onClick={() => info('Info message')}>show-info</button>
      <button onClick={() => showToast('Persistent toast', 'info', 0)}>show-persistent</button>
    </div>
  );
};

describe('ToastProvider', () => {
  it('should render children', () => {
    renderWithTheme(
      <ToastProvider>
        <div>App content</div>
      </ToastProvider>
    );

    expect(screen.getByText('App content')).toBeInTheDocument();
  });

  it('should show a toast when showToast is called', () => {
    renderWithTheme(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('show-generic'));
    expect(screen.getByText('Generic message')).toBeInTheDocument();
  });

  it('should show success toast', () => {
    renderWithTheme(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('show-success'));
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('should show error toast', () => {
    renderWithTheme(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('show-error'));
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should show warning toast', () => {
    renderWithTheme(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('show-warning'));
    expect(screen.getByText('Warning message')).toBeInTheDocument();
  });

  it('should show info toast', () => {
    renderWithTheme(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('show-info'));
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('should show multiple toasts at once', () => {
    renderWithTheme(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('show-success'));
    fireEvent.click(screen.getByText('show-error'));

    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});

describe('useToast', () => {
  it('should throw when used outside ToastProvider', () => {
    const consoleError = console.error;
    console.error = jest.fn();

    const BrokenComponent = () => {
      useToast();
      return null;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      'useToast must be used within a ToastProvider'
    );

    console.error = consoleError;
  });
});

describe('Toast standalone component', () => {
  it('should render when open is true', () => {
    renderWithTheme(
      <Toast open={true} message="Standalone toast" severity="success" onClose={() => {}} />
    );

    expect(screen.getByText('Standalone toast')).toBeInTheDocument();
  });

  it('should not render when open is false', () => {
    renderWithTheme(
      <Toast open={false} message="Hidden toast" severity="info" onClose={() => {}} />
    );

    expect(screen.queryByText('Hidden toast')).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const onClose = jest.fn();
    renderWithTheme(
      <Toast open={true} message="Closable toast" severity="warning" onClose={onClose} />
    );

    const closeButtons = screen.getAllByRole('button');
    fireEvent.click(closeButtons[0]);
    expect(onClose).toHaveBeenCalled();
  });

  it('should render with different severity levels', () => {
    const severities = ['success', 'error', 'warning', 'info'];

    severities.forEach((severity) => {
      const { unmount } = renderWithTheme(
        <Toast open={true} message={`${severity} toast`} severity={severity} onClose={() => {}} />
      );
      expect(screen.getByText(`${severity} toast`)).toBeInTheDocument();
      unmount();
    });
  });
});
