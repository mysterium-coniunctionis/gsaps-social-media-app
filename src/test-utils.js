import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

/**
 * Creates a fresh QueryClient configured for testing (no retries, no GC)
 */
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Infinity },
      mutations: { retry: false }
    }
  });

/**
 * Renders a component wrapped in all required providers for testing.
 *
 * @param {React.ReactElement} ui - Component to render
 * @param {Object} options
 * @param {string} [options.route='/'] - Initial route for MemoryRouter
 * @param {QueryClient} [options.queryClient] - Custom QueryClient
 * @param {Object} [options.renderOptions] - Extra options forwarded to RTL render
 */
export const renderWithProviders = (ui, { route = '/', queryClient, ...renderOptions } = {}) => {
  const client = queryClient || createTestQueryClient();

  const Wrapper = ({ children }) => (
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[route]}>
        <ThemeProvider>{children}</ThemeProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient: client
  };
};
