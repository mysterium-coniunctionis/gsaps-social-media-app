jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));
jest.mock('../../api/auth', () => ({ loginUser: jest.fn(), registerUser: jest.fn(), logoutUser: jest.fn(), getCurrentUser: jest.fn() }));
jest.mock('../../api/api', () => ({ setUnauthorizedHandler: jest.fn() }));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

jest.mock('./CommentSection', () => () => <div data-testid="comment-section" />);
jest.mock('../reactions/ReactionButton', () => ({ onReactionChange, currentReaction }) => (
  <button data-testid="reaction-button" onClick={() => onReactionChange('like')}>
    {currentReaction || 'Like'}
  </button>
));
jest.mock('../reactions/ReactionsSummary', () => () => <div data-testid="reactions-summary" />);
jest.mock('../../utils/dateUtils', () => ({
  formatRelativeTime: jest.fn(() => '2 hours ago')
}));

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import PostCard from './PostCard';

const theme = createTheme();

const mockPost = {
  id: 'post-1',
  content: 'This is a test post content',
  author: {
    id: 'author-1',
    name: 'Alice Johnson',
    username: 'alice_j',
    avatar: '',
    verified: true,
    credentials: 'PhD'
  },
  tags: ['science', 'research'],
  images: [],
  reactions: [{ type: 'like', userId: 'user-2' }],
  comments: 3,
  shares: 1,
  timestamp: new Date().toISOString(),
  currentUserReaction: null,
  isBookmarked: false
};

const defaultProps = {
  post: mockPost,
  currentUserId: 'current-user',
  onReaction: jest.fn(),
  onComment: jest.fn(),
  onShare: jest.fn(),
  onBookmark: jest.fn(),
  onDelete: jest.fn(),
  onReport: jest.fn()
};

const renderPostCard = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <PostCard {...defaultProps} {...props} />
    </ThemeProvider>
  );
};

describe('PostCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders author name, username, and content', () => {
    renderPostCard();

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText(/@alice_j/)).toBeInTheDocument();
    expect(screen.getByText('This is a test post content')).toBeInTheDocument();
  });

  it('renders verified badge when author.verified is true', () => {
    renderPostCard();

    expect(screen.getByTestId('VerifiedIcon')).toBeInTheDocument();
  });

  it('does not show delete option for posts by other users', async () => {
    renderPostCard({ currentUserId: 'different-user' });

    const moreButton = screen.getByTestId('MoreVertIcon').closest('button');
    await userEvent.click(moreButton);

    expect(screen.queryByText('Delete post')).not.toBeInTheDocument();
    expect(screen.getByText('Report post')).toBeInTheDocument();
  });

  it('calls onReaction when reaction button is clicked', async () => {
    const onReaction = jest.fn();
    renderPostCard({ onReaction });

    const reactionButton = screen.getByTestId('reaction-button');
    await userEvent.click(reactionButton);

    expect(onReaction).toHaveBeenCalledWith('post-1', 'like');
  });
});
