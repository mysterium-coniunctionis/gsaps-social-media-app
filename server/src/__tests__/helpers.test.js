import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = 'test-secret';

// Recreate helper functions for unit testing
const createAccessToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '15m' });

const createRefreshToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

const toPublicUser = (user) => ({
  id: user.id,
  email: user.email,
  username: user.username,
  name: user.name,
  role: user.role,
  avatar: user.avatarUrl,
  credentials: user.credentials,
  bio: user.bio,
  verified: user.verified,
  xp: user.xp || 0,
  level: user.level || 1,
  streak: user.streak || 0,
  createdAt: user.createdAt
});

const parseTags = (tags) => {
  if (Array.isArray(tags)) return JSON.stringify(tags);
  if (typeof tags === 'string') {
    try {
      JSON.parse(tags);
      return tags;
    } catch {
      return JSON.stringify([tags]);
    }
  }
  return '[]';
};

const parseJsonField = (field) => {
  if (!field) return [];
  try {
    return JSON.parse(field);
  } catch {
    return [];
  }
};

// ============================================
// TEST FIXTURES
// ============================================

const mockUser = {
  id: 1,
  email: 'test@example.com',
  username: 'testuser',
  name: 'Test User',
  role: 'member',
  avatarUrl: 'https://example.com/avatar.png',
  credentials: 'Software Engineer',
  bio: 'A test user',
  verified: true,
  xp: 150,
  level: 3,
  streak: 5,
  passwordHash: '$2a$10$hashedpassword',
  createdAt: '2025-01-01T00:00:00.000Z'
};

const mockUserMinimal = {
  id: 2,
  email: 'minimal@example.com',
  username: 'minimaluser',
  name: 'Minimal User',
  role: 'member',
  createdAt: '2025-06-01T00:00:00.000Z'
};

// ============================================
// TESTS: createAccessToken
// ============================================

describe('createAccessToken', () => {
  it('should generate a valid JWT with user payload', () => {
    const token = createAccessToken(mockUser);
    expect(typeof token).toBe('string');

    const decoded = jwt.verify(token, JWT_SECRET);
    expect(decoded.id).toBe(mockUser.id);
    expect(decoded.email).toBe(mockUser.email);
    expect(decoded.role).toBe(mockUser.role);
  });

  it('should not include sensitive fields like passwordHash', () => {
    const token = createAccessToken(mockUser);
    const decoded = jwt.decode(token);
    expect(decoded.passwordHash).toBeUndefined();
    expect(decoded.username).toBeUndefined();
  });

  it('should set expiry to 15 minutes', () => {
    const token = createAccessToken(mockUser);
    const decoded = jwt.decode(token);
    // exp - iat should be 900 seconds (15 minutes)
    expect(decoded.exp - decoded.iat).toBe(900);
  });
});

// ============================================
// TESTS: createRefreshToken
// ============================================

describe('createRefreshToken', () => {
  it('should generate a valid JWT with user payload', () => {
    const token = createRefreshToken(mockUser);
    const decoded = jwt.verify(token, JWT_SECRET);
    expect(decoded.id).toBe(mockUser.id);
    expect(decoded.email).toBe(mockUser.email);
    expect(decoded.role).toBe(mockUser.role);
  });

  it('should set expiry to 7 days', () => {
    const token = createRefreshToken(mockUser);
    const decoded = jwt.decode(token);
    // exp - iat should be 604800 seconds (7 days)
    expect(decoded.exp - decoded.iat).toBe(7 * 24 * 60 * 60);
  });

  it('should have a longer expiry than access token', () => {
    const accessToken = createAccessToken(mockUser);
    const refreshToken = createRefreshToken(mockUser);
    const accessDecoded = jwt.decode(accessToken);
    const refreshDecoded = jwt.decode(refreshToken);

    const accessDuration = accessDecoded.exp - accessDecoded.iat;
    const refreshDuration = refreshDecoded.exp - refreshDecoded.iat;
    expect(refreshDuration).toBeGreaterThan(accessDuration);
  });
});

// ============================================
// TESTS: toPublicUser
// ============================================

describe('toPublicUser', () => {
  it('should return only public fields', () => {
    const publicUser = toPublicUser(mockUser);
    expect(publicUser).toEqual({
      id: 1,
      email: 'test@example.com',
      username: 'testuser',
      name: 'Test User',
      role: 'member',
      avatar: 'https://example.com/avatar.png',
      credentials: 'Software Engineer',
      bio: 'A test user',
      verified: true,
      xp: 150,
      level: 3,
      streak: 5,
      createdAt: '2025-01-01T00:00:00.000Z'
    });
  });

  it('should strip private fields like passwordHash', () => {
    const publicUser = toPublicUser(mockUser);
    expect(publicUser.passwordHash).toBeUndefined();
  });

  it('should map avatarUrl to avatar', () => {
    const publicUser = toPublicUser(mockUser);
    expect(publicUser.avatar).toBe(mockUser.avatarUrl);
    expect(publicUser.avatarUrl).toBeUndefined();
  });

  it('should provide default values for xp, level, and streak', () => {
    const publicUser = toPublicUser(mockUserMinimal);
    expect(publicUser.xp).toBe(0);
    expect(publicUser.level).toBe(1);
    expect(publicUser.streak).toBe(0);
  });

  it('should handle undefined optional fields gracefully', () => {
    const publicUser = toPublicUser(mockUserMinimal);
    expect(publicUser.avatar).toBeUndefined();
    expect(publicUser.credentials).toBeUndefined();
    expect(publicUser.bio).toBeUndefined();
    expect(publicUser.verified).toBeUndefined();
  });
});

// ============================================
// TESTS: parseTags
// ============================================

describe('parseTags', () => {
  it('should stringify an array of tags', () => {
    const result = parseTags(['javascript', 'node']);
    expect(result).toBe('["javascript","node"]');
  });

  it('should return valid JSON strings as-is', () => {
    const input = '["react","vue"]';
    const result = parseTags(input);
    expect(result).toBe(input);
  });

  it('should wrap a plain string in an array', () => {
    const result = parseTags('javascript');
    expect(result).toBe('["javascript"]');
  });

  it('should return empty array JSON for null', () => {
    expect(parseTags(null)).toBe('[]');
  });

  it('should return empty array JSON for undefined', () => {
    expect(parseTags(undefined)).toBe('[]');
  });

  it('should handle an empty array', () => {
    expect(parseTags([])).toBe('[]');
  });

  it('should return empty array JSON for non-string non-array types', () => {
    expect(parseTags(42)).toBe('[]');
    expect(parseTags(true)).toBe('[]');
  });
});

// ============================================
// TESTS: parseJsonField
// ============================================

describe('parseJsonField', () => {
  it('should parse valid JSON strings', () => {
    const result = parseJsonField('["a","b","c"]');
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should parse JSON objects', () => {
    const result = parseJsonField('{"key":"value"}');
    expect(result).toEqual({ key: 'value' });
  });

  it('should return empty array for invalid JSON', () => {
    const result = parseJsonField('not valid json');
    expect(result).toEqual([]);
  });

  it('should return empty array for null', () => {
    expect(parseJsonField(null)).toEqual([]);
  });

  it('should return empty array for undefined', () => {
    expect(parseJsonField(undefined)).toEqual([]);
  });

  it('should return empty array for empty string', () => {
    expect(parseJsonField('')).toEqual([]);
  });
});
