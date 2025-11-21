import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { GamificationProvider } from '../context/GamificationContext';
import { ToastProvider } from '../components/common/Toast';
import { AccessibilityProvider } from '../context/AccessibilityContext';

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

describe('Accessibility smoke test', () => {
  expect.extend(toHaveNoViolations);

  const renderApp = () =>
    render(
      <BrowserRouter>
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
      </BrowserRouter>
    );

  it('has no critical axe violations on initial render', async () => {
    const { container } = renderApp();
    const results = await axe(container, {
      rules: {
        region: { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
