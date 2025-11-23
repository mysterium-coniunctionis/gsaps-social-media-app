import '@testing-library/jest-dom';

jest.mock('marked', () => ({
  marked: { parse: jest.fn(() => '') }
}));
