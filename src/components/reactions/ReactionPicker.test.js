jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));
jest.mock('../../api/auth', () => ({ loginUser: jest.fn(), registerUser: jest.fn(), logoutUser: jest.fn(), getCurrentUser: jest.fn() }));
jest.mock('../../api/api', () => ({ setUnauthorizedHandler: jest.fn() }));

jest.mock('../../theme/animations', () => ({
  scaleIn: 'mock-scaleIn',
  pulse: 'mock-pulse'
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import ReactionPicker, { REACTIONS } from './ReactionPicker';

const theme = createTheme();

describe('REACTIONS constant', () => {
  it('has 8 entries', () => {
    const keys = Object.keys(REACTIONS);
    expect(keys).toHaveLength(8);
    expect(keys).toEqual(['like', 'love', 'laugh', 'wow', 'sad', 'angry', 'celebrate', 'think']);
  });

  it('each reaction has emoji, label, and color properties', () => {
    Object.values(REACTIONS).forEach((reaction) => {
      expect(reaction).toHaveProperty('emoji');
      expect(reaction).toHaveProperty('label');
      expect(reaction).toHaveProperty('color');
      expect(typeof reaction.emoji).toBe('string');
      expect(typeof reaction.label).toBe('string');
      expect(typeof reaction.color).toBe('string');
    });
  });

  it('has correct labels for all reaction types', () => {
    expect(REACTIONS.like.label).toBe('Like');
    expect(REACTIONS.love.label).toBe('Love');
    expect(REACTIONS.laugh.label).toBe('Haha');
    expect(REACTIONS.wow.label).toBe('Wow');
    expect(REACTIONS.sad.label).toBe('Sad');
    expect(REACTIONS.angry.label).toBe('Angry');
    expect(REACTIONS.celebrate.label).toBe('Celebrate');
    expect(REACTIONS.think.label).toBe('Think');
  });
});

describe('ReactionPicker component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders reaction buttons when open', () => {
    // Create a real DOM element for anchorEl
    const anchorEl = document.createElement('button');
    document.body.appendChild(anchorEl);

    render(
      <ThemeProvider theme={theme}>
        <ReactionPicker
          anchorEl={anchorEl}
          open={true}
          onClose={jest.fn()}
          onReactionSelect={jest.fn()}
          currentReaction={null}
        />
      </ThemeProvider>
    );

    // Each reaction renders a span with role="img" and aria-label
    Object.values(REACTIONS).forEach((reaction) => {
      const elements = screen.getAllByLabelText(reaction.label);
      expect(elements.length).toBeGreaterThanOrEqual(1);
    });

    document.body.removeChild(anchorEl);
  });

  it('calls onReactionSelect when a reaction is clicked', () => {
    const anchorEl = document.createElement('button');
    document.body.appendChild(anchorEl);
    const onReactionSelect = jest.fn();
    const onClose = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <ReactionPicker
          anchorEl={anchorEl}
          open={true}
          onClose={onClose}
          onReactionSelect={onReactionSelect}
          currentReaction={null}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getAllByLabelText('Like')[0]);

    expect(onReactionSelect).toHaveBeenCalledWith('like');
    expect(onClose).toHaveBeenCalled();

    document.body.removeChild(anchorEl);
  });
});
