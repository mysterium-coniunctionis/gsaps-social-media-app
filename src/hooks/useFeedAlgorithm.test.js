jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));

jest.mock('../utils/neuralFeed', () => {
  const profile = { topicInterests: {}, authorAffinities: {}, engagementHistory: [], abVariant: 'control' };
  return {
    rankFeedPosts: jest.fn((posts) => posts.map((p, i) => ({ ...p, _feedScore: 100 - i, _explanation: [] }))),
    createDefaultUserProfile: jest.fn(() => ({ ...profile })),
    updateUserProfile: jest.fn((p) => p),
    getABVariant: jest.fn(() => 'control')
  };
});

import React, { useState } from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import useFeedAlgorithm from './useFeedAlgorithm';
import { rankFeedPosts, createDefaultUserProfile } from '../utils/neuralFeed';

// Test component that exposes hook state
function TestComponent({ rawPosts = [], options = {} }) {
  const hook = useFeedAlgorithm(rawPosts, options);

  return (
    <div>
      <span data-testid="posts">{JSON.stringify(hook.posts.map(p => p.id))}</span>
      <span data-testid="isLoading">{String(hook.isLoading)}</span>
      <span data-testid="hasMore">{String(hook.hasMore)}</span>
      <span data-testid="totalPosts">{hook.stats.totalPosts}</span>
      <button data-testid="loadMore" onClick={hook.loadMore}>Load More</button>
      <button data-testid="markNotInterested" onClick={() => hook.markNotInterested('post-3')}>Not Interested</button>
      <button data-testid="resetProfile" onClick={hook.resetProfile}>Reset</button>
      <button data-testid="trackView" onClick={() => hook.trackView('post-1')}>Track View</button>
      <button data-testid="trackViewEnd" onClick={() => hook.trackViewEnd('post-1')}>Track View End</button>
    </div>
  );
}

describe('useFeedAlgorithm', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    localStorage.clear();
    // Reset mocks but restore implementations
    const neuralFeed = require('../utils/neuralFeed');
    jest.clearAllMocks();
    const profile = { topicInterests: {}, authorAffinities: {}, engagementHistory: [], abVariant: 'control' };
    neuralFeed.createDefaultUserProfile.mockImplementation(() => ({ ...profile }));
    neuralFeed.rankFeedPosts.mockImplementation((posts) => posts.map((p, i) => ({ ...p, _feedScore: 100 - i, _explanation: [] })));
    neuralFeed.updateUserProfile.mockImplementation((p) => p);
    neuralFeed.getABVariant.mockImplementation(() => 'control');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const makePosts = (count) =>
    Array.from({ length: count }, (_, i) => ({
      id: `post-${i + 1}`,
      title: `Post ${i + 1}`,
      topic: 'science',
      authorId: `author-${i}`
    }));

  test('returns empty posts when rawPosts is empty', () => {
    render(<TestComponent rawPosts={[]} />);

    expect(screen.getByTestId('posts')).toHaveTextContent('[]');
    expect(screen.getByTestId('hasMore')).toHaveTextContent('false');
  });

  test('returns ranked posts after initial render', () => {
    const rawPosts = makePosts(5);
    render(<TestComponent rawPosts={rawPosts} options={{ pageSize: 10 }} />);

    // Before timeout, loading should be true
    expect(screen.getByTestId('isLoading')).toHaveTextContent('true');

    // Advance past the 100ms ranking timeout
    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
    const posts = JSON.parse(screen.getByTestId('posts').textContent);
    expect(posts).toHaveLength(5);
    expect(rankFeedPosts).toHaveBeenCalled();
  });

  test('loadMore adds next page of posts', () => {
    const rawPosts = makePosts(15);
    render(<TestComponent rawPosts={rawPosts} options={{ pageSize: 10 }} />);

    // Wait for initial ranking
    act(() => {
      jest.advanceTimersByTime(150);
    });

    let posts = JSON.parse(screen.getByTestId('posts').textContent);
    expect(posts).toHaveLength(10);
    expect(screen.getByTestId('hasMore')).toHaveTextContent('true');

    // Trigger loadMore
    act(() => {
      screen.getByTestId('loadMore').click();
    });

    // Advance past the 300ms load timeout
    act(() => {
      jest.advanceTimersByTime(350);
    });

    posts = JSON.parse(screen.getByTestId('posts').textContent);
    expect(posts).toHaveLength(15);
    expect(screen.getByTestId('hasMore')).toHaveTextContent('false');
  });

  test('trackView and trackViewEnd do not crash', () => {
    const rawPosts = makePosts(3);
    render(<TestComponent rawPosts={rawPosts} options={{ enableTracking: true }} />);

    act(() => {
      jest.advanceTimersByTime(150);
    });

    act(() => {
      screen.getByTestId('trackView').click();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      screen.getByTestId('trackViewEnd').click();
    });

    expect(screen.getByTestId('totalPosts')).toHaveTextContent('3');
  });

  test('markNotInterested removes post from displayed', () => {
    const rawPosts = makePosts(5);
    render(<TestComponent rawPosts={rawPosts} options={{ pageSize: 10 }} />);

    act(() => {
      jest.advanceTimersByTime(150);
    });

    let posts = JSON.parse(screen.getByTestId('posts').textContent);
    expect(posts).toHaveLength(5);

    act(() => {
      screen.getByTestId('markNotInterested').click();
    });

    posts = JSON.parse(screen.getByTestId('posts').textContent);
    expect(posts).toHaveLength(4);
    expect(posts).not.toContain('post-3');
  });

  test('resetProfile creates new default profile', () => {
    const rawPosts = makePosts(3);
    render(<TestComponent rawPosts={rawPosts} options={{ persistProfile: true, userId: 'test-user' }} />);

    act(() => {
      jest.advanceTimersByTime(150);
    });

    createDefaultUserProfile.mockClear();

    act(() => {
      screen.getByTestId('resetProfile').click();
    });

    expect(createDefaultUserProfile).toHaveBeenCalled();
  });
});
