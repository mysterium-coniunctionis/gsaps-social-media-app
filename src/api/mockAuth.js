import bcrypt from 'bcryptjs';

/**
 * Mock Authentication Service
 * Provides local authentication without requiring a backend
 */

const USER_STORAGE_KEY = 'gsaps_mock_users';
const TOKEN_STORAGE_KEY = 'gsaps_mock_tokens';
const REVOKED_TOKEN_STORAGE_KEY = 'gsaps_mock_revoked_tokens';
const SESSION_STORAGE_KEY = 'gsaps_mock_sessions';
const RESET_STORAGE_KEY = 'gsaps_mock_password_resets';
const VERIFY_STORAGE_KEY = 'gsaps_mock_verify_tokens';
const LOGIN_ATTEMPTS_KEY = 'gsaps_mock_login_attempts';

const ACCESS_TOKEN_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes
const REFRESH_TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const PASSWORD_RESET_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes
const EMAIL_VERIFY_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours
const RATE_LIMIT_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

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
    verified: true,
    mfaEnabled: false,
    recoveryCodes: []
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
    verified: true,
    mfaEnabled: true,
    recoveryCodes: ['ADMIN-RECOVERY-1']
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
    verified: true,
    mfaEnabled: false,
    recoveryCodes: []
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

const readJSON = (key) => {
  const stored = localStorage.getItem(key);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.warn(`Failed to parse stored data for key ${key}. Resetting store.`, error);
    localStorage.removeItem(key);
    return [];
  }
};

const getStoredTokens = () => readJSON(TOKEN_STORAGE_KEY);
const getRevokedTokens = () => readJSON(REVOKED_TOKEN_STORAGE_KEY);
const getStoredSessions = () => readJSON(SESSION_STORAGE_KEY);
const getResetTokens = () => readJSON(RESET_STORAGE_KEY);
const getVerifyTokens = () => readJSON(VERIFY_STORAGE_KEY);
const getLoginAttempts = () => readJSON(LOGIN_ATTEMPTS_KEY);

const saveTokens = (tokens) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
};

const saveRevokedTokens = (tokens) => {
  localStorage.setItem(REVOKED_TOKEN_STORAGE_KEY, JSON.stringify(tokens));
};

const saveSessions = (sessions) => {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions));
};

const saveResetTokens = (tokens) => {
  localStorage.setItem(RESET_STORAGE_KEY, JSON.stringify(tokens));
};

const saveVerifyTokens = (tokens) => {
  localStorage.setItem(VERIFY_STORAGE_KEY, JSON.stringify(tokens));
};

const saveLoginAttempts = (attempts) => {
  localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(attempts));
};

const pruneExpiredTokens = (tokens) => {
  const now = Date.now();
  return tokens.filter((entry) => entry.exp > now);
};

const pruneSessions = (sessions) => {
  const now = Date.now();
  return sessions.filter((session) => session.exp > now);
};

const sanitiseUser = (user) => {
  const { password, mfaSecret, ...rest } = user;
  return {
    ...rest,
    joined: rest.joined ? new Date(rest.joined) : null
  };
};

const recordLoginAttempt = (identifier) => {
  const attempts = getLoginAttempts();
  const windowStart = Date.now() - RATE_LIMIT_WINDOW_MS;
  const updated = attempts
    .filter((entry) => entry.identifier === identifier && entry.timestamp > windowStart)
    .map((entry) => ({ ...entry, timestamp: entry.timestamp }));

  updated.push({ identifier, timestamp: Date.now() });
  saveLoginAttempts(updated);

  if (updated.length > RATE_LIMIT_ATTEMPTS) {
    const error = new Error('Too many login attempts. Please try again later.');
    error.rateLimited = true;
    throw error;
  }
};

const clearLoginAttempts = (identifier) => {
  const attempts = getLoginAttempts().filter((entry) => entry.identifier !== identifier);
  saveLoginAttempts(attempts);
};

const upsertSession = ({ sessionId, userId, deviceInfo, refreshToken }) => {
  const sessions = pruneSessions(getStoredSessions());
  const now = Date.now();
  const existingIndex = sessions.findIndex((s) => s.id === sessionId);
  const session = {
    id: sessionId,
    userId,
    deviceInfo: deviceInfo || 'Web Browser',
    location: 'Local Environment',
    ip: '127.0.0.1',
    createdAt: existingIndex > -1 ? sessions[existingIndex].createdAt : now,
    lastUsed: now,
    exp: now + REFRESH_TOKEN_EXPIRY_MS,
    refreshToken
  };

  if (existingIndex > -1) {
    sessions.splice(existingIndex, 1, session);
  } else {
    sessions.push(session);
  }

  saveSessions(sessions);
};

const revokeSessionById = (sessionId, userId) => {
  const sessions = pruneSessions(getStoredSessions()).filter(
    (session) => !(session.id === sessionId && session.userId === userId)
  );
  saveSessions(sessions);

  const tokens = pruneExpiredTokens(getStoredTokens()).filter((token) => token.sessionId !== sessionId);
  saveTokens(tokens);
};

const generateTokenPair = (userId, deviceInfo = 'Web Browser', existingSessionId) => {
  const sessionId = existingSessionId || generateRandomToken(12);
  const now = Date.now();
  const tokens = pruneExpiredTokens(getStoredTokens());
  const accessToken = generateRandomToken(16);
  const refreshToken = generateRandomToken(32);

  tokens.push(
    {
      token: accessToken,
      userId,
      type: 'access',
      sessionId,
      exp: now + ACCESS_TOKEN_EXPIRY_MS
    },
    {
      token: refreshToken,
      userId,
      type: 'refresh',
      sessionId,
      deviceInfo,
      exp: now + REFRESH_TOKEN_EXPIRY_MS
    }
  );

  saveTokens(tokens);
  upsertSession({ sessionId, userId, deviceInfo, refreshToken });

  return {
    accessToken,
    refreshToken,
    accessExp: now + ACCESS_TOKEN_EXPIRY_MS,
    refreshExp: now + REFRESH_TOKEN_EXPIRY_MS,
    sessionId
  };
};

const revokeRefreshToken = (refreshToken) => {
  const revoked = pruneExpiredTokens(getRevokedTokens());
  revoked.push({ token: refreshToken, exp: Date.now() + REFRESH_TOKEN_EXPIRY_MS });
  saveRevokedTokens(revoked);
};

const findTokenRecord = (token, type) => {
  const tokens = pruneExpiredTokens(getStoredTokens());
  const record = tokens.find((entry) => entry.token === token && (!type || entry.type === type)) || null;
  saveTokens(tokens);
  return record;
};

const removeToken = (token) => {
  const tokens = pruneExpiredTokens(getStoredTokens()).filter((entry) => entry.token !== token);
  saveTokens(tokens);
};

const ensureNotRevoked = (refreshToken) => {
  const revoked = pruneExpiredTokens(getRevokedTokens());
  const isRevoked = revoked.some((entry) => entry.token === refreshToken);
  saveRevokedTokens(revoked);

  if (isRevoked) {
    const error = new Error('Session revoked');
    error.revoked = true;
    throw error;
  }
};

const validateMfa = (user, otpCode) => {
  if (!user.mfaEnabled) return true;
  if (!otpCode) return false;

  return otpCode === '123456' || (user.recoveryCodes || []).includes(otpCode);
};

const createRecoveryCodes = () => Array.from({ length: 5 }, () => generateRandomToken(4).toUpperCase());

/**
 * Mock Login
 */
export const mockLogin = async (username, password, otpCode = '') => {
  await delay();

  recordLoginAttempt(username);

  const users = getStoredUsers();
  const user = users.find((u) => u.username === username || u.email === username);

  if (!user) {
    throw new Error('Invalid username or password');
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid username or password');
  }

  if (!validateMfa(user, otpCode)) {
    const error = new Error('MFA code required');
    error.requiresMfa = true;
    throw error;
  }

  clearLoginAttempts(username);

  const tokens = generateTokenPair(user.id, 'Web Browser');
  return {
    tokens,
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
    verified: false,
    mfaEnabled: false,
    recoveryCodes: []
  };

  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);

  const tokens = generateTokenPair(newUser.id, 'Web Browser');
  return {
    tokens,
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

  const tokenRecord = findTokenRecord(token, 'access');

  if (!tokenRecord) {
    throw new Error('Invalid or expired session token');
  }

  const users = getStoredUsers();
  const user = users.find((u) => u.id === tokenRecord.userId);

  if (!user) {
    throw new Error('User not found');
  }

  upsertSession({
    sessionId: tokenRecord.sessionId,
    userId: user.id,
    deviceInfo: 'Web Browser',
    refreshToken: null
  });

  return sanitiseUser(user);
};

export const mockRefreshTokens = async (refreshToken) => {
  await delay(200);

  if (!refreshToken) {
    throw new Error('Missing refresh token');
  }

  ensureNotRevoked(refreshToken);

  const record = findTokenRecord(refreshToken, 'refresh');

  if (!record) {
    const error = new Error('Invalid refresh token');
    error.revoked = true;
    throw error;
  }

  revokeRefreshToken(refreshToken);
  removeToken(refreshToken);

  return generateTokenPair(record.userId, record.deviceInfo, record.sessionId);
};

/**
 * Mock Logout
 */
export const mockLogout = async () => {
  await delay(200);
  const token = localStorage.getItem('gsaps_token');
  const refreshToken = localStorage.getItem('gsaps_refresh_token');

  if (token) {
    removeToken(token);
  }

  if (refreshToken) {
    revokeRefreshToken(refreshToken);
    removeToken(refreshToken);
  }

  return { success: true };
};

export const mockRevokeSession = async (sessionId, userId) => {
  revokeSessionById(sessionId, userId);
  return { success: true };
};

export const mockGetSessions = async (userId) => {
  await delay(150);
  return pruneSessions(getStoredSessions()).filter((session) => session.userId === userId);
};

export const mockRequestPasswordReset = async (email) => {
  await delay(300);
  const users = getStoredUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error('No account found with that email');
  }

  const token = generateRandomToken(16);
  const resets = getResetTokens().filter((entry) => entry.userId !== user.id);
  resets.push({ token, userId: user.id, exp: Date.now() + PASSWORD_RESET_EXPIRY_MS });
  saveResetTokens(resets);

  return { token, expiresAt: Date.now() + PASSWORD_RESET_EXPIRY_MS };
};

export const mockResetPassword = async (token, newPassword) => {
  await delay(300);
  const resets = getResetTokens();
  const record = resets.find((entry) => entry.token === token && entry.exp > Date.now());

  if (!record) {
    throw new Error('Invalid or expired reset token');
  }

  if (newPassword.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  const users = getStoredUsers();
  const updated = users.map((user) =>
    user.id === record.userId
      ? {
          ...user,
          password: bcrypt.hashSync(newPassword, 10)
        }
      : user
  );

  saveUsers(updated);
  saveResetTokens(resets.filter((entry) => entry.token !== token));
  return { success: true };
};

export const mockRequestEmailVerification = async (userId) => {
  await delay(200);
  const users = getStoredUsers();
  const user = users.find((u) => u.id === userId);

  if (!user) {
    throw new Error('User not found');
  }

  const token = generateRandomToken(12);
  const verifyTokens = getVerifyTokens().filter((entry) => entry.userId !== userId);
  verifyTokens.push({ token, userId, exp: Date.now() + EMAIL_VERIFY_EXPIRY_MS });
  saveVerifyTokens(verifyTokens);
  return { token, expiresAt: Date.now() + EMAIL_VERIFY_EXPIRY_MS };
};

export const mockVerifyEmailToken = async (token) => {
  await delay(200);
  const verifyTokens = getVerifyTokens();
  const record = verifyTokens.find((entry) => entry.token === token && entry.exp > Date.now());

  if (!record) {
    throw new Error('Invalid or expired verification link');
  }

  const users = getStoredUsers().map((user) =>
    user.id === record.userId
      ? {
          ...user,
          verified: true
        }
      : user
  );

  saveUsers(users);
  saveVerifyTokens(verifyTokens.filter((entry) => entry.token !== token));
  return { success: true };
};

export const mockEnableMfa = async (userId) => {
  await delay(200);
  const users = getStoredUsers();
  const recoveryCodes = createRecoveryCodes();
  const updated = users.map((user) =>
    user.id === userId
      ? {
          ...user,
          mfaEnabled: true,
          mfaSecret: generateRandomToken(8),
          recoveryCodes
        }
      : user
  );

  saveUsers(updated);
  return { recoveryCodes };
};

export const mockDisableMfa = async (userId) => {
  await delay(200);
  const users = getStoredUsers().map((user) =>
    user.id === userId
      ? {
          ...user,
          mfaEnabled: false,
          mfaSecret: null,
          recoveryCodes: []
        }
      : user
  );

  saveUsers(users);
  return { success: true };
};

export const mockOauthLogin = async (provider) => {
  await delay(200);
  const users = getStoredUsers();
  const username = `${provider}_user`;
  let user = users.find((u) => u.username === username);

  if (!user) {
    user = {
      id: users.length + 1,
      username,
      email: `${username}@example.com`,
      password: bcrypt.hashSync(generateRandomToken(6), 10),
      name: `${provider.toUpperCase()} Member`,
      role: 'member',
      avatar_url: 'https://i.pravatar.cc/150?img=10',
      credentials: 'Federated Login',
      bio: `${provider} connected account`,
      joined: new Date().toISOString(),
      verified: true,
      mfaEnabled: false,
      recoveryCodes: []
    };

    saveUsers([...users, user]);
  }

  const tokens = generateTokenPair(user.id, `${provider} OAuth`);
  return { user: sanitiseUser(user), tokens };
};

/**
 * Check if running in development mode
 */
export const isDevelopmentMode = () => {
  return process.env.NODE_ENV === 'development' || !process.env.REACT_APP_API_URL;
};
