jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

jest.mock('../../utils/dateUtils', () => ({
  formatRelativeTime: jest.fn(() => '2 days ago')
}));

jest.mock('./AddToCollectionMenu', () => {
  return function MockAddToCollectionMenu() {
    return null;
  };
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaperCard from './PaperCard';

const mockPaper = {
  id: 'paper-001',
  title: 'Psilocybin-Induced Neuroplasticity in Treatment-Resistant Depression',
  authors: ['Carhart-Harris, R.L.', 'Goodwin, G.M.', 'Nutt, D.J.'],
  journal: 'Nature Medicine',
  year: 2023,
  doi: '10.1038/nature.2023.001',
  topics: ['Psilocybin', 'Neuroplasticity', 'Depression'],
  researchType: 'clinical-trial',
  openAccess: true,
  rating: 4.8,
  ratingCount: 42,
  views: 1250,
  downloads: 340,
  citations: 28,
  discussionCount: 15,
  abstract: 'A study on psilocybin effects on neuroplasticity.',
  fileUrl: '/papers/paper-001.pdf'
};

describe('PaperCard', () => {
  it('renders the paper title', () => {
    render(<PaperCard paper={mockPaper} />);
    expect(screen.getByText('Psilocybin-Induced Neuroplasticity in Treatment-Resistant Depression')).toBeInTheDocument();
  });

  it('renders authors', () => {
    render(<PaperCard paper={mockPaper} />);
    expect(screen.getByText('Carhart-Harris, R.L., Goodwin, G.M., Nutt, D.J.')).toBeInTheDocument();
  });

  it('renders journal and year', () => {
    render(<PaperCard paper={mockPaper} />);
    expect(screen.getByText(/Nature Medicine/)).toBeInTheDocument();
    expect(screen.getByText(/2023/)).toBeInTheDocument();
  });

  it('shows Open Access badge when openAccess is true', () => {
    render(<PaperCard paper={mockPaper} />);
    expect(screen.getByText('OA')).toBeInTheDocument();
  });

  it('does not show Open Access badge when openAccess is false', () => {
    const closedPaper = { ...mockPaper, openAccess: false };
    render(<PaperCard paper={closedPaper} />);
    expect(screen.queryByText('OA')).not.toBeInTheDocument();
  });

  it('renders topic chips', () => {
    render(<PaperCard paper={mockPaper} />);
    expect(screen.getByText('Psilocybin')).toBeInTheDocument();
    expect(screen.getByText('Neuroplasticity')).toBeInTheDocument();
  });
});
