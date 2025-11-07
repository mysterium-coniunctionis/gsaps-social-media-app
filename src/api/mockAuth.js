import bcrypt from 'bcryptjs';

/**
 * Mock Authentication Service
 * Provides local authentication without requiring a backend
 */

const USER_STORAGE_KEY = 'gsaps_mock_users';
const TOKEN_STORAGE_KEY = 'gsaps_mock_tokens';
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

const DEFAULT_USERS = [
  {
    id: 1,
    username: 'demo_user',
    email: 'demo@gsaps.org',
    password: '$2b$10$ccocGdC6BGpc5DHT7Wc.b.MJNLti/.3ad7xcb.EeSKR3rrmHjJ08e',
    name: 'Demo User',
    role: 'member',
    avatar_url: 'https://i.pravatar.cc/150?img=1',
    credentials: 'Graduate Student',
    bio: 'Psychedelic researcher interested in therapeutic applications',
    joined: '2024-01-15T00:00:00.000Z',
    verified: true
  },
  {
    id: 2,
    username: 'admin',
    email: 'admin@gsaps.org',
    password: '$2b$10$fbaoQAixE0hS6uG1ariTWeV86Cyneq/N5VXUsNeUVHzsOyAKq.yuC',
    name: 'Admin User',
    role: 'administrator',
    avatar_url: 'https://i.pravatar.cc/150?img=2',
    credentials: 'PhD, Administrator',
    bio: 'GSAPS platform administrator',
    joined: '2023-01-01T00:00:00.000Z',
    verified: true
  },
  {
    id: 3,
    username: 'researcher_jane',
    email: 'jane@gsaps.org',
    password: '$2b$10$TMwMz8Pv30UHOYYTlT/9p.nGzgznGTff4Wtbtx45C7yIzW/LT.vDW',
    name: 'Dr. Jane Smith',
    role: 'member',
    avatar_url: 'https://i.pravatar.cc/150?img=5',
    credentials: 'PhD, Clinical Psychology',
    bio: 'Researching psilocybin-assisted therapy for depression',
    joined: '2023-06-20T00:00:00.000Z',
    verified: true
  }
];

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

const getCrypto = () => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    return window.crypto;
  }

  return null;
};

const generateRandomToken = (size = 32) => {
  const cryptoImpl = getCrypto();

  if (cryptoImpl) {
    const bytes = cryptoImpl.getRandomValues(new Uint8Array(size));
    return Array.from(bytes)
      .map((value) => value.toString(16).padStart(2, '0'))
      .join('');
  }

  return Array.from({ length: size * 2 })
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
};

const serialiseUsers = (users) =>
  users.map((user) => ({
    ...user,
    joined: user.joined instanceof Date ? user.joined.toISOString() : user.joined
  }));

const getStoredUsers = () => {
  const stored = localStorage.getItem(USER_STORAGE_KEY);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.warn('Failed to parse stored mock users. Reinitialising store.', error);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }

  const defaults = serialiseUsers(DEFAULT_USERS);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaults));
  return defaults;
};

const saveUsers = (users) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(serialiseUsers(users)));
};

const getStoredTokens = () => {
  const stored = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.warn('Failed to parse stored mock tokens. Clearing token store.', error);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    return [];
  }
};

const saveTokens = (tokens) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
};

const pruneExpiredTokens = (tokens) => {
  const now = Date.now();
  return tokens.filter((entry) => entry.exp > now);
};

const generateMockToken = (userId) => {
  const existingTokens = pruneExpiredTokens(getStoredTokens());
  const token = generateRandomToken();
  const updatedTokens = [
    ...existingTokens,
    {
      token,
      userId,
      exp: Date.now() + TOKEN_EXPIRY_MS
    }
  ];

  saveTokens(updatedTokens);
  return token;
};

const findTokenRecord = (token) => {
  const tokens = pruneExpiredTokens(getStoredTokens());
  const record = tokens.find((entry) => entry.token === token) || null;
  saveTokens(tokens);
  return record;
};

const removeToken = (token) => {
  const tokens = pruneExpiredTokens(getStoredTokens()).filter((entry) => entry.token !== token);
  saveTokens(tokens);
};

const sanitiseUser = (user) => {
  const { password, ...rest } = user;
  return {
    ...rest,
    joined: rest.joined ? new Date(rest.joined) : null
  };
};

/**
 * Mock Login
 */
export const mockLogin = async (username, password) => {
  await delay();

  const users = getStoredUsers();
  const user = users.find((u) => u.username === username || u.email === username);

  if (!user) {
    throw new Error('Invalid username or password');
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid username or password');
  }

  const token = generateMockToken(user.id);
  return {
    token,
    user: sanitiseUser(user)
  };
};

/**
 * Mock Registration
 */
export const mockRegister = async (userData) => {
  await delay();

  const users = getStoredUsers();

  if (!userData.username || !userData.email || !userData.password) {
    throw new Error('Username, email, and password are required');
  }

  if (users.find((u) => u.username === userData.username)) {
    throw new Error('Username already exists');
  }

  if (users.find((u) => u.email === userData.email)) {
    throw new Error('Email already exists');
  }

  if (userData.password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  const hashedPassword = bcrypt.hashSync(userData.password, 10);

  const newUser = {
    id: users.length + 1,
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
    name: userData.name || userData.username,
    role: 'member',
    avatar_url: `https://i.pravatar.cc/150?img=${users.length + 1}`,
    credentials: userData.credentials || 'Member',
    bio: userData.bio || '',
    joined: new Date().toISOString(),
    verified: false
  };

  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);

  const token = generateMockToken(newUser.id);
  return {
    token,
    user: sanitiseUser(newUser)
  };
};

/**
 * Mock Get Current User
 */
export const mockGetCurrentUser = async (token) => {
  await delay(300);

  if (!token) {
    throw new Error('No authentication token provided');
  }

  const tokenRecord = findTokenRecord(token);

  if (!tokenRecord) {
    throw new Error('Invalid or expired session token');
  }

  const users = getStoredUsers();
  const user = users.find((u) => u.id === tokenRecord.userId);

  if (!user) {
    throw new Error('User not found');
  }

  return sanitiseUser(user);
};

/**
 * Mock Logout
 */
export const mockLogout = async () => {
  await delay(200);
  const token = localStorage.getItem('gsaps_token');

  if (token) {
    removeToken(token);
  }

  return { success: true };
};

/**
 * Check if running in development mode
 */
export const isDevelopmentMode = () => {
  return process.env.NODE_ENV === 'development' || !process.env.REACT_APP_API_URL;
};
