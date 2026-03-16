/**
 * Reusable mock data factories for tests.
 * Each factory returns a plain object with sensible defaults;
 * every field can be overridden via the `overrides` parameter.
 */

let idCounter = 1;
const nextId = () => `test-id-${idCounter++}`;

export const resetIdCounter = () => {
  idCounter = 1;
};

export const createUser = (overrides = {}) => ({
  id: nextId(),
  email: 'tester@example.com',
  username: 'tester',
  name: 'Test User',
  role: 'user',
  avatar: null,
  credentials: '',
  bio: 'A test user',
  verified: false,
  xp: 0,
  level: 1,
  streak: 0,
  createdAt: '2025-01-01T00:00:00.000Z',
  ...overrides
});

export const createPost = (overrides = {}) => ({
  id: nextId(),
  content: 'Hello world',
  authorId: 'user-1',
  author: createUser({ id: 'user-1', username: 'author' }),
  tags: '[]',
  images: '[]',
  reactions: [],
  comments: 0,
  shares: 0,
  bookmarked: false,
  createdAt: '2025-06-01T12:00:00.000Z',
  ...overrides
});

export const createCourse = (overrides = {}) => ({
  id: nextId(),
  title: 'Introduction to Testing',
  description: 'Learn testing fundamentals',
  instructorId: 'instructor-1',
  instructor: createUser({ id: 'instructor-1', name: 'Dr. Instructor', role: 'instructor' }),
  thumbnail: null,
  price: 0,
  rating: 4.5,
  reviewCount: 10,
  studentsEnrolled: 50,
  duration: '8 hours',
  lessonsCount: 12,
  ceCredits: 2,
  level: 'Beginner',
  category: 'Education',
  featured: false,
  createdAt: '2025-03-01T00:00:00.000Z',
  ...overrides
});

export const createPaper = (overrides = {}) => ({
  id: nextId(),
  title: 'A Study on Testing Practices',
  authors: 'Smith J, Doe A',
  journal: 'Journal of Software Testing',
  year: 2024,
  doi: '10.1234/test.2024.001',
  abstract: 'This paper explores modern testing practices.',
  topics: ['testing', 'software engineering'],
  type: 'research',
  openAccess: true,
  rating: 4.2,
  views: 150,
  downloads: 30,
  citations: 5,
  discussions: 2,
  uploaderId: 'uploader-1',
  uploader: createUser({ id: 'uploader-1' }),
  createdAt: '2024-01-15T00:00:00.000Z',
  ...overrides
});

export const createNotification = (overrides = {}) => ({
  id: nextId(),
  type: 'like',
  message: 'Someone liked your post',
  read: false,
  userId: 'user-1',
  sourceUserId: 'user-2',
  sourceUser: createUser({ id: 'user-2', name: 'Jane Doe' }),
  relatedId: 'post-1',
  createdAt: new Date().toISOString(),
  ...overrides
});

export const createComment = (overrides = {}) => ({
  id: nextId(),
  content: 'Great post!',
  authorId: 'user-2',
  author: createUser({ id: 'user-2', name: 'Commenter' }),
  postId: 'post-1',
  parentId: null,
  likes: 0,
  createdAt: new Date().toISOString(),
  ...overrides
});
