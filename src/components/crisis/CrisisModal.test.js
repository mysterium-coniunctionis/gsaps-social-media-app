import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CrisisModal from './CrisisModal';
import CrisisButton from './CrisisButton';

const theme = createTheme();

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('CrisisModal', () => {
  it('should render when open is true', () => {
    renderWithTheme(<CrisisModal open={true} onClose={() => {}} />);

    expect(screen.getByText('Crisis Support')).toBeInTheDocument();
    expect(screen.getByText('You are not alone. Help is available 24/7.')).toBeInTheDocument();
  });

  it('should not render content when open is false', () => {
    renderWithTheme(<CrisisModal open={false} onClose={() => {}} />);

    expect(screen.queryByText('Crisis Support')).not.toBeInTheDocument();
  });

  it('should display emergency 911 banner', () => {
    renderWithTheme(<CrisisModal open={true} onClose={() => {}} />);

    expect(screen.getByText('If you are in immediate danger, call 911')).toBeInTheDocument();
    expect(screen.getByText('Call 911')).toBeInTheDocument();
  });

  it('should have accessible close button', () => {
    const onClose = jest.fn();
    renderWithTheme(<CrisisModal open={true} onClose={onClose} />);

    const closeButton = screen.getByLabelText('Close crisis support modal');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should display three tabs: Hotlines, Grounding Exercises, Safety Tips', () => {
    renderWithTheme(<CrisisModal open={true} onClose={() => {}} />);

    expect(screen.getByRole('tab', { name: /hotlines/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /grounding exercises/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /safety tips/i })).toBeInTheDocument();
  });

  it('should show hotlines by default', () => {
    renderWithTheme(<CrisisModal open={true} onClose={() => {}} />);

    // Check that crisis resources are displayed
    expect(screen.getByText('Fireside Project')).toBeInTheDocument();
    expect(screen.getByText('988 Suicide & Crisis Lifeline')).toBeInTheDocument();
  });

  it('should switch to grounding exercises tab when clicked', () => {
    renderWithTheme(<CrisisModal open={true} onClose={() => {}} />);

    const groundingTab = screen.getByRole('tab', { name: /grounding exercises/i });
    fireEvent.click(groundingTab);

    expect(screen.getByText(/these exercises can help you feel more grounded/i)).toBeInTheDocument();
  });

  it('should switch to safety tips tab when clicked', () => {
    renderWithTheme(<CrisisModal open={true} onClose={() => {}} />);

    const safetyTab = screen.getByRole('tab', { name: /safety tips/i });
    fireEvent.click(safetyTab);

    expect(screen.getByText('Remember: This will pass')).toBeInTheDocument();
    expect(screen.getByText('Ground yourself')).toBeInTheDocument();
    expect(screen.getByText('Be gentle with yourself')).toBeInTheDocument();
  });

  it('should display additional resources links', () => {
    renderWithTheme(<CrisisModal open={true} onClose={() => {}} />);

    expect(screen.getByText('Additional Resources')).toBeInTheDocument();
    expect(screen.getByText('Zendo Project')).toBeInTheDocument();
    expect(screen.getByText('MAPS Integration List')).toBeInTheDocument();
    expect(screen.getByText('Psychedelic.Support')).toBeInTheDocument();
  });

  it('should display psychedelic-specific safety tips', () => {
    renderWithTheme(<CrisisModal open={true} onClose={() => {}} />);

    const safetyTab = screen.getByRole('tab', { name: /safety tips/i });
    fireEvent.click(safetyTab);

    expect(screen.getByText('For Psychedelic Experiences')).toBeInTheDocument();
    expect(screen.getByText(/Change your environment/)).toBeInTheDocument();
    expect(screen.getByText(/Surrender rather than resist/)).toBeInTheDocument();
  });

  it('should have Fireside Project call button in footer', () => {
    renderWithTheme(<CrisisModal open={true} onClose={() => {}} />);

    expect(screen.getByText('Call Fireside Project')).toBeInTheDocument();
  });

  it('should display supportive footer message', () => {
    renderWithTheme(<CrisisModal open={true} onClose={() => {}} />);

    expect(screen.getByText(/You matter. Help is always available./)).toBeInTheDocument();
  });
});

describe('CrisisButton', () => {
  it('should render the floating action button', () => {
    renderWithTheme(<CrisisButton />);

    // MUI Tooltip sets aria-label from title prop on the wrapped element
    const fab = screen.getByLabelText('Crisis Support - Get Help Now');
    expect(fab).toBeInTheDocument();
  });

  it('should have 24/7 badge', () => {
    renderWithTheme(<CrisisButton />);

    expect(screen.getByText('24/7')).toBeInTheDocument();
  });

  it('should have accessible aria-label', () => {
    renderWithTheme(<CrisisButton />);

    const fab = screen.getByLabelText('Crisis Support - Get Help Now');
    expect(fab).toHaveAttribute('aria-label', 'Crisis Support - Get Help Now');
  });

  it('should open CrisisModal when clicked', () => {
    renderWithTheme(<CrisisButton />);

    const fab = screen.getByLabelText('Crisis Support - Get Help Now');
    fireEvent.click(fab);

    // Modal should now be open
    expect(screen.getByText('Crisis Support')).toBeInTheDocument();
    expect(screen.getByText('You are not alone. Help is available 24/7.')).toBeInTheDocument();
  });

  it('should close CrisisModal when close button is clicked', async () => {
    renderWithTheme(<CrisisButton />);

    // Open the modal
    const fab = screen.getByLabelText('Crisis Support - Get Help Now');
    fireEvent.click(fab);

    // Verify modal is open
    expect(screen.getByText('Crisis Support')).toBeInTheDocument();

    // Close the modal
    const closeButton = screen.getByLabelText('Close crisis support modal');
    fireEvent.click(closeButton);

    // Wait for the modal to close (MUI Dialog has closing animation)
    await waitFor(() => {
      expect(screen.queryByText('You are not alone. Help is available 24/7.')).not.toBeInTheDocument();
    });
  });
});
