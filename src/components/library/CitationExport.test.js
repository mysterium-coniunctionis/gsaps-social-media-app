jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CitationExport from './CitationExport';

const mockPaper = {
  title: 'Psilocybin-Induced Neuroplasticity in Treatment-Resistant Depression',
  authors: ['Carhart-Harris, R.L.', 'Goodwin, G.M.'],
  journal: 'Nature Medicine',
  year: 2023,
  doi: '10.1038/nature.2023.001',
  volume: '29',
  issue: '3',
  pages: '123-135'
};

describe('CitationExport', () => {
  it('renders format selection buttons for BibTeX, APA, and MLA', () => {
    render(<CitationExport paper={mockPaper} />);
    expect(screen.getByText('BibTeX')).toBeInTheDocument();
    expect(screen.getByText('APA')).toBeInTheDocument();
    expect(screen.getByText('MLA')).toBeInTheDocument();
  });

  it('shows BibTeX citation by default', () => {
    render(<CitationExport paper={mockPaper} />);
    expect(screen.getByText(/@article\{/)).toBeInTheDocument();
  });

  it('generates APA citation when APA button is clicked', () => {
    render(<CitationExport paper={mockPaper} />);
    fireEvent.click(screen.getByText('APA'));
    expect(screen.getByText(/Carhart-Harris, R\.L\. & Goodwin, G\.M\./)).toBeInTheDocument();
  });

  it('generates MLA citation when MLA button is clicked', () => {
    render(<CitationExport paper={mockPaper} />);
    fireEvent.click(screen.getByText('MLA'));
    expect(screen.getByText(/Carhart-Harris, R\.L\. and Goodwin, G\.M\./)).toBeInTheDocument();
  });

  it('has a Copy Citation button', () => {
    render(<CitationExport paper={mockPaper} />);
    expect(screen.getByText('Copy Citation')).toBeInTheDocument();
  });

  it('renders the Cite this Paper heading', () => {
    render(<CitationExport paper={mockPaper} />);
    expect(screen.getByText('Cite this Paper')).toBeInTheDocument();
  });
});
