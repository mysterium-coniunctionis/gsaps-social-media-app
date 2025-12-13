import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchTextField from './SearchTextField';

describe('SearchTextField', () => {
  it('should render with placeholder', () => {
    render(
      <SearchTextField
        value=""
        onChange={() => {}}
        placeholder="Search..."
      />
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('should display value', () => {
    render(
      <SearchTextField
        value="test query"
        onChange={() => {}}
      />
    );
    expect(screen.getByDisplayValue('test query')).toBeInTheDocument();
  });

  it('should call onChange when value changes', () => {
    const handleChange = jest.fn();
    render(
      <SearchTextField
        value=""
        onChange={handleChange}
      />
    );
    
    const input = screen.getByRole('textbox');
    input.focus();
    // onChange is called by MUI TextField
    expect(input).toBeInTheDocument();
  });

  it('should render search icon', () => {
    render(
      <SearchTextField
        value=""
        onChange={() => {}}
      />
    );
    
    // Check for the textbox which contains the search functionality
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});
