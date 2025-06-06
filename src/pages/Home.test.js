import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({ currentUser: null })
}));

import Home from './Home';

test('renders welcome heading', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(screen.getByText(/Welcome to GSAPS Social/i)).toBeInTheDocument();
});

