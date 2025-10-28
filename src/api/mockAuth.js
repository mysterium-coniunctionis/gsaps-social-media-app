/**
 * Mock Authentication Service
 * Provides local authentication without requiring a backend
 */

// Mock users database (stored in memory)
const MOCK_USERS = [
  {
    id: 1,
    username: 'demo_user',
    email: 'demo@gsaps.org',
    password: 'demo123', // In production, this would be hashed
    name: 'Demo User',
    role: 'member',
    avatar_url: 'https://i.pravatar.cc/150?img=1',
    credentials: 'Graduate Student',
    bio: 'Psychedelic researcher interested in therapeutic applications',
    joined: new Date('2024-01-15'),
    verified: true
  },
  {
    id: 2,
    username: 'admin',
    email: 'admin@gsaps.org',
    password: 'admin_secure_123',
    name: 'Admin User',
    role: 'administrator',
    avatar_url: 'https://i.pravatar.cc/150?img=2',
    credentials: 'PhD, Administrator',
    bio: 'GSAPS platform administrator',
    joined: new Date('2023-01-01'),
    verified: true
  },
  {
    id: 3,
    username: 'researcher_jane',
    email: 'jane@gsaps.org',
    password: 'research123',
    name: 'Dr. Jane Smith',
    role: 'member',
    avatar_url: 'https://i.pravatar.cc/150?img=5',
    credentials: 'PhD, Clinical Psychology',
    bio: 'Researching psilocybin-assisted therapy for depression',
    joined: new Date('2023-06-20'),
    verified: true
  }
];

// Get all users from localStorage or initialize with defaults
const getStoredUsers = () => {
  const stored = localStorage.getItem('gsaps_mock_users');
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with default users
  localStorage.setItem('gsaps_mock_users', JSON.stringify(MOCK_USERS));
  return MOCK_USERS;
};

// Save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem('gsaps_mock_users', JSON.stringify(users));
};

// Generate a mock JWT token
const generateMockToken = (userId) => {
  const payload = {
    user_id: userId,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    iat: Date.now()
  };
  // In a real app, this would be a proper JWT. For mock, we just base64 encode
  return btoa(JSON.stringify(payload));
};

// Decode mock token
const decodeMockToken = (token) => {
  try {
    const payload = JSON.parse(atob(token));
    // Check if token is expired
    if (payload.exp < Date.now()) {
      throw new Error('Token expired');
    }
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock Login
 */
export const mockLogin = async (username, password) => {
  await delay(); // Simulate network delay

  const users = getStoredUsers();
  const user = users.find(
    u => (u.username === username || u.email === username) && u.password === password
  );

  if (!user) {
    throw new Error('Invalid username or password');
  }

  // Generate token
  const token = generateMockToken(user.id);

  // Return user data (without password) and token
  const { password: _, ...userData } = user;

  return {
    token,
    user: userData
  };
};

/**
 * Mock Registration
 */
export const mockRegister = async (userData) => {
  await delay(); // Simulate network delay

  const users = getStoredUsers();

  // Validate required fields
  if (!userData.username || !userData.email || !userData.password) {
    throw new Error('Username, email, and password are required');
  }

  // Check if username already exists
  if (users.find(u => u.username === userData.username)) {
    throw new Error('Username already exists');
  }

  // Check if email already exists
  if (users.find(u => u.email === userData.email)) {
    throw new Error('Email already exists');
  }

  // Validate password strength
  if (userData.password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    username: userData.username,
    email: userData.email,
    password: userData.password,
    name: userData.name || userData.username,
    role: 'member',
    avatar_url: `https://i.pravatar.cc/150?img=${users.length + 1}`,
    credentials: userData.credentials || 'Member',
    bio: userData.bio || '',
    joined: new Date(),
    verified: false
  };

  // Add to users array
  users.push(newUser);
  saveUsers(users);

  // Generate token
  const token = generateMockToken(newUser.id);

  // Return user data (without password) and token
  const { password: _, ...userDataResponse } = newUser;

  return {
    token,
    user: userDataResponse
  };
};

/**
 * Mock Get Current User
 */
export const mockGetCurrentUser = async (token) => {
  await delay(300); // Simulate network delay

  if (!token) {
    throw new Error('No authentication token provided');
  }

  // Decode token
  const payload = decodeMockToken(token);

  // Get user from storage
  const users = getStoredUsers();
  const user = users.find(u => u.id === payload.user_id);

  if (!user) {
    throw new Error('User not found');
  }

  // Return user data (without password)
  const { password: _, ...userData } = user;
  return userData;
};

/**
 * Mock Logout
 */
export const mockLogout = async () => {
  await delay(200); // Simulate network delay
  return { success: true };
};

/**
 * Check if running in development mode
 */
export const isDevelopmentMode = () => {
  return process.env.NODE_ENV === 'development' || !process.env.REACT_APP_API_URL;
};
