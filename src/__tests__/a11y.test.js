import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { GamificationProvider } from '../context/GamificationContext';
import { ToastProvider } from '../components/common/Toast';
import { AccessibilityProvider } from '../context/AccessibilityContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('axios', () => ({
  create: () => ({
    get: jest.fn(),
    post: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  }),
}));

jest.mock('../pages/workspaces/ResearchWorkspace', () => () => <div>ResearchWorkspace</div>);

// Mock CrisisButton to avoid MUI Tooltip animation timing issues in tests
jest.mock('../components/crisis/CrisisButton', () => () => (
  <button aria-label="Crisis support resources">Crisis Support</button>
));

describe('Accessibility smoke test', () => {
  expect.extend(toHaveNoViolations);

  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  afterEach(async () => {
    // Clear all queries and cancel pending ones
    queryClient.clear();
    cleanup();
  });

  const renderApp = async () => {
    const view = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <GamificationProvider>
              <ThemeProvider>
                <AccessibilityProvider>
                  <ToastProvider>
                    <App />
                  </ToastProvider>
                </AccessibilityProvider>
              </ThemeProvider>
            </GamificationProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
    // Allow any pending updates to settle
    await waitFor(() => {
      expect(view.container).toBeInTheDocument();
    });
    return view;
  };

  it('has no critical axe violations on initial render', async () => {
    const { container } = await renderApp();

    const results = await axe(container, {
      rules: {
        region: { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
