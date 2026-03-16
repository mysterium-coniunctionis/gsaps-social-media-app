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

jest.mock('./InstructorDisplay', () => {
  return function MockInstructorDisplay({ instructor }) {
    return <span data-testid="instructor-display">{instructor?.name || ''}</span>;
  };
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseCard from './CourseCard';

const mockCourse = {
  title: 'Introduction to Psychedelic Research',
  slug: 'intro-psychedelic-research',
  description: 'A comprehensive course on psychedelic research fundamentals.',
  instructor: {
    name: 'Dr. Jane Smith',
    verified: true
  },
  thumbnail: '/images/course-thumb.jpg',
  price: 49.99,
  rating: 4.7,
  ratingCount: 128,
  duration: '12 hours',
  lessonsCount: 24,
  studentsEnrolled: 1500,
  ceCredits: 3,
  level: 'beginner',
  category: 'research-methods',
  featured: false
};

describe('CourseCard', () => {
  it('renders the course title', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText('Introduction to Psychedelic Research')).toBeInTheDocument();
  });

  it('renders the instructor name', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument();
  });

  it('shows the price when price is greater than 0', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText('$49.99')).toBeInTheDocument();
  });

  it('shows "Free" when price is 0', () => {
    const freeCourse = { ...mockCourse, price: 0 };
    render(<CourseCard course={freeCourse} />);
    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('renders rating value', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText('4.7')).toBeInTheDocument();
  });

  it('renders review count', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText('(128)')).toBeInTheDocument();
  });
});
