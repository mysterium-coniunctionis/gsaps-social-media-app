jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));
jest.mock('../../api/auth', () => ({ loginUser: jest.fn(), registerUser: jest.fn(), logoutUser: jest.fn(), getCurrentUser: jest.fn() }));
jest.mock('../../api/api', () => ({ setUnauthorizedHandler: jest.fn() }));

jest.mock('../../utils/dateUtils', () => ({
  formatRelativeTime: jest.fn(() => '1 hour ago')
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CommentSection from './CommentSection';

const theme = createTheme();

const defaultProps = {
  postId: 'post-1',
  onComment: jest.fn()
};

const renderCommentSection = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <CommentSection {...defaultProps} {...props} />
    </ThemeProvider>
  );
};

describe('CommentSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders existing comments', () => {
    renderCommentSection();

    // The component loads mock comments internally via useEffect
    expect(screen.getByText('Bob Williams')).toBeInTheDocument();
    expect(screen.getByText('This is fascinating! Would love to learn more about the methodology.')).toBeInTheDocument();
    expect(screen.getByText('David Martinez')).toBeInTheDocument();
  });

  it('shows comment input', () => {
    renderCommentSection();

    expect(screen.getByPlaceholderText('Write a comment...')).toBeInTheDocument();
  });

  it('renders reply buttons on comments', () => {
    renderCommentSection();

    const replyButtons = screen.getAllByRole('button', { name: /reply/i });
    expect(replyButtons.length).toBeGreaterThan(0);
  });
});
