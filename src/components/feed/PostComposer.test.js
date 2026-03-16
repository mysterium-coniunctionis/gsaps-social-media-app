jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));
jest.mock('../../api/auth', () => ({ loginUser: jest.fn(), registerUser: jest.fn(), logoutUser: jest.fn(), getCurrentUser: jest.fn() }));
jest.mock('../../api/api', () => ({ setUnauthorizedHandler: jest.fn() }));

jest.mock('../../components/common/MentionInput', () => ({ value, onChange, placeholder, ...props }) => (
  <div data-testid="mention-input">
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
));
jest.mock('../../utils/moderation', () => ({
  detectContentIssues: jest.fn(() => ({ hasIssues: false, violations: [], findings: [], recommendedAction: 'allow' })),
  recordAuditEvent: jest.fn()
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import PostComposer from './PostComposer';

const theme = createTheme();

const defaultProps = {
  open: true,
  onClose: jest.fn(),
  onSubmit: jest.fn(),
  currentUser: {
    id: 'user-1',
    name: 'Test User',
    username: 'testuser',
    avatar: ''
  }
};

const renderPostComposer = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <PostComposer {...defaultProps} {...props} />
    </ThemeProvider>
  );
};

describe('PostComposer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dialog when open is true', () => {
    renderPostComposer({ open: true });

    expect(screen.getByText('Create Post')).toBeInTheDocument();
    expect(screen.getByTestId('mention-input')).toBeInTheDocument();
  });

  it('does not render dialog content when open is false', () => {
    renderPostComposer({ open: false });

    expect(screen.queryByText('Create Post')).not.toBeInTheDocument();
  });

  it('shows post button that is initially disabled (empty content)', () => {
    renderPostComposer();

    const postButton = screen.getByRole('button', { name: /post/i });
    expect(postButton).toBeDisabled();
  });

  it('calls onClose when cancel is clicked', async () => {
    const onClose = jest.fn();
    renderPostComposer({ onClose });

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);

    // With empty content, onClose is called directly without confirm dialog
    expect(onClose).toHaveBeenCalled();
  });
});
