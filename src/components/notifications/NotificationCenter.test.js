jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));
jest.mock('../../api/auth', () => ({ loginUser: jest.fn(), registerUser: jest.fn(), logoutUser: jest.fn(), getCurrentUser: jest.fn() }));
jest.mock('../../api/api', () => ({ setUnauthorizedHandler: jest.fn() }));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

jest.mock('./NotificationItem', () => ({ notification, onRead, onDelete }) => (
  <li data-testid={`notification-${notification.id}`}>
    {notification.message}
  </li>
));
jest.mock('../../theme/animations', () => ({
  badgePulse: 'mock-animation'
}));

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import NotificationCenter from './NotificationCenter';

const theme = createTheme();

const renderNotificationCenter = () => {
  return render(
    <ThemeProvider theme={theme}>
      <NotificationCenter />
    </ThemeProvider>
  );
};

describe('NotificationCenter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders bell icon button', () => {
    renderNotificationCenter();

    expect(screen.getByLabelText('Open notifications')).toBeInTheDocument();
    expect(screen.getByTestId('NotificationsIcon')).toBeInTheDocument();
  });

  it('shows unread count badge', () => {
    renderNotificationCenter();

    // Advance timers to load mock notifications
    act(() => {
      jest.advanceTimersByTime(600);
    });

    // The component has 3 unread notifications in its mock data
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('opens notification list on click', async () => {
    renderNotificationCenter();

    act(() => {
      jest.advanceTimersByTime(600);
    });

    const bellButton = screen.getByLabelText('Open notifications');
    await userEvent.click(bellButton);

    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Sarah Chen liked your post')).toBeInTheDocument();
  });

  it('mark all as read button exists', async () => {
    renderNotificationCenter();

    act(() => {
      jest.advanceTimersByTime(600);
    });

    const bellButton = screen.getByLabelText('Open notifications');
    await userEvent.click(bellButton);

    expect(screen.getByText('Mark all read')).toBeInTheDocument();
  });
});
