jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GuidelinesGate from './GuidelinesGate';

const mockGuidelines = {
  version: '2.0',
  lastUpdated: '2024-01-15',
  summary: 'Updated community standards for safe discourse.',
  items: [
    'Be respectful and constructive in discussions',
    'No promotion of unsafe practices',
    'Cite sources when making scientific claims'
  ]
};

describe('GuidelinesGate', () => {
  it('renders the dialog when open is true', () => {
    render(
      <GuidelinesGate
        open={true}
        guidelines={mockGuidelines}
        onAccept={jest.fn()}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText(/Community Guidelines/)).toBeInTheDocument();
  });

  it('shows community guideline items', () => {
    render(
      <GuidelinesGate
        open={true}
        guidelines={mockGuidelines}
        onAccept={jest.fn()}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('Be respectful and constructive in discussions')).toBeInTheDocument();
    expect(screen.getByText('No promotion of unsafe practices')).toBeInTheDocument();
    expect(screen.getByText('Cite sources when making scientific claims')).toBeInTheDocument();
  });

  it('calls onAccept when accept button is clicked', () => {
    const onAccept = jest.fn();
    render(
      <GuidelinesGate
        open={true}
        guidelines={mockGuidelines}
        onAccept={onAccept}
        onClose={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText('I agree and will comply'));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when cancel button is clicked', () => {
    const onClose = jest.fn();
    render(
      <GuidelinesGate
        open={true}
        guidelines={mockGuidelines}
        onAccept={jest.fn()}
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render content when open is false', () => {
    render(
      <GuidelinesGate
        open={false}
        guidelines={mockGuidelines}
        onAccept={jest.fn()}
        onClose={jest.fn()}
      />
    );
    expect(screen.queryByText(/Community Guidelines/)).not.toBeInTheDocument();
  });
});
