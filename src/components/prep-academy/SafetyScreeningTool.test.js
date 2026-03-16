jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));

jest.mock('../common/GlassCard', () => {
  return function MockGlassCard({ children, ...props }) {
    return <div data-testid="glass-card" {...props}>{children}</div>;
  };
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import SafetyScreeningTool from './SafetyScreeningTool';

const theme = createTheme();

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('SafetyScreeningTool', () => {
  it('renders the Safety Screening heading', () => {
    renderWithTheme(<SafetyScreeningTool />);
    expect(screen.getByText('Safety Screening')).toBeInTheDocument();
  });

  it('renders the first step - Physical Health', () => {
    renderWithTheme(<SafetyScreeningTool />);
    const elements = screen.getAllByText('Physical Health');
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });

  it('shows stepper with 3 step labels', () => {
    renderWithTheme(<SafetyScreeningTool />);
    expect(screen.getAllByText('Physical Health').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Mental Health').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Medications').length).toBeGreaterThanOrEqual(1);
  });

  it('has a Back button that is disabled on the first step', () => {
    renderWithTheme(<SafetyScreeningTool />);
    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('button')).toBeDisabled();
  });

  it('has a Continue button that is disabled when no answers are given', () => {
    renderWithTheme(<SafetyScreeningTool />);
    const continueButton = screen.getByText('Continue');
    expect(continueButton).toBeInTheDocument();
    expect(continueButton.closest('button')).toBeDisabled();
  });

  it('renders questions with Yes/No radio options', () => {
    renderWithTheme(<SafetyScreeningTool />);
    const yesOptions = screen.getAllByLabelText('Yes');
    const noOptions = screen.getAllByLabelText('No');
    expect(yesOptions.length).toBeGreaterThan(0);
    expect(noOptions.length).toBeGreaterThan(0);
  });

  it('enables Continue button after answering all questions in the step', () => {
    renderWithTheme(<SafetyScreeningTool />);

    // Answer all physical health questions with "No"
    const noOptions = screen.getAllByLabelText('No');
    noOptions.forEach(option => {
      fireEvent.click(option);
    });

    const continueButton = screen.getByText('Continue');
    expect(continueButton.closest('button')).not.toBeDisabled();
  });
});
