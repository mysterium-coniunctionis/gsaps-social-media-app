jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));
jest.mock('../../api/auth', () => ({ loginUser: jest.fn(), registerUser: jest.fn(), logoutUser: jest.fn(), getCurrentUser: jest.fn() }));
jest.mock('../../api/api', () => ({ setUnauthorizedHandler: jest.fn() }));

jest.mock('./ReactionPicker', () => {
  const MockReactionPicker = ({ open, onReactionSelect, onClose }) =>
    open ? (
      <div data-testid="reaction-picker">
        <button data-testid="select-like" onClick={() => { onReactionSelect('like'); onClose(); }}>Like</button>
      </div>
    ) : null;
  MockReactionPicker.REACTIONS = {
    like: { emoji: '\u{1F44D}', label: 'Like', color: '#2196f3' },
    love: { emoji: '\u2764\uFE0F', label: 'Love', color: '#f44336' }
  };
  return { __esModule: true, default: MockReactionPicker, REACTIONS: MockReactionPicker.REACTIONS };
});
jest.mock('./EmojiReactionBurst', () => () => null);
jest.mock('../../theme/animations', () => ({
  heartbeat: 'mock-heartbeat'
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import ReactionButton from './ReactionButton';

const theme = createTheme();

const defaultProps = {
  currentReaction: null,
  onReactionChange: jest.fn(),
  count: 0,
  size: 'medium'
};

const renderReactionButton = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <ReactionButton {...defaultProps} {...props} />
    </ThemeProvider>
  );
};

describe('ReactionButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders default like icon when no current reaction', () => {
    renderReactionButton();

    expect(screen.getByText('Like')).toBeInTheDocument();
    expect(screen.getByTestId('ThumbUpOutlinedIcon')).toBeInTheDocument();
  });

  it('calls onReaction when clicked', () => {
    const onReactionChange = jest.fn();
    renderReactionButton({ onReactionChange });

    // Click the button to open the picker
    const likeButton = screen.getByText('Like');
    fireEvent.click(likeButton);

    // Select a reaction from the picker
    const selectLike = screen.getByTestId('select-like');
    fireEvent.click(selectLike);

    expect(onReactionChange).toHaveBeenCalledWith('like');
  });
});
