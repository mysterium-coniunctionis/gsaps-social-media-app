import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'test-secret';

// Recreate auth middleware for testing
const authMiddleware = async (req, res, next) => {
  let token = req.cookies.accessToken;

  if (!token) {
    const auth = req.headers.authorization;
    if (auth) {
      const [scheme, bearerToken] = auth.split(' ');
      if (scheme === 'Bearer' && bearerToken) {
        token = bearerToken;
      }
    }
  }

  if (!token) {
    return res.status(401).json({
      message: 'Missing authentication credentials',
      error: 'UNAUTHORIZED'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const message = error.name === 'TokenExpiredError'
      ? 'Token has expired'
      : 'Invalid token';
    res.status(401).json({ message, error: error.name });
  }
};

// ============================================
// MOCK HELPERS
// ============================================

const createMockReq = (overrides = {}) => ({
  cookies: {},
  headers: {},
  ...overrides
});

const createMockRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

const createMockNext = () => jest.fn();

const mockUser = { id: 1, email: 'test@example.com', role: 'member' };

const generateValidToken = (payload = mockUser, expiresIn = '15m') =>
  jwt.sign(payload, JWT_SECRET, { expiresIn });

const generateExpiredToken = (payload = mockUser) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '0s' });

// ============================================
// TESTS
// ============================================

describe('authMiddleware', () => {
  it('should return 401 when no token is provided', async () => {
    const req = createMockReq();
    const res = createMockRes();
    const next = createMockNext();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Missing authentication credentials',
      error: 'UNAUTHORIZED'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should extract token from cookies and set req.user', async () => {
    const token = generateValidToken();
    const req = createMockReq({ cookies: { accessToken: token } });
    const res = createMockRes();
    const next = createMockNext();

    await authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
    expect(req.user.id).toBe(mockUser.id);
    expect(req.user.email).toBe(mockUser.email);
    expect(req.user.role).toBe(mockUser.role);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should extract token from Authorization Bearer header', async () => {
    const token = generateValidToken();
    const req = createMockReq({
      headers: { authorization: `Bearer ${token}` }
    });
    const res = createMockRes();
    const next = createMockNext();

    await authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
    expect(req.user.id).toBe(mockUser.id);
    expect(req.user.email).toBe(mockUser.email);
  });

  it('should prefer cookie token over Authorization header', async () => {
    const cookieUser = { id: 10, email: 'cookie@example.com', role: 'admin' };
    const headerUser = { id: 20, email: 'header@example.com', role: 'member' };
    const cookieToken = generateValidToken(cookieUser);
    const headerToken = generateValidToken(headerUser);

    const req = createMockReq({
      cookies: { accessToken: cookieToken },
      headers: { authorization: `Bearer ${headerToken}` }
    });
    const res = createMockRes();
    const next = createMockNext();

    await authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user.id).toBe(cookieUser.id);
  });

  it('should return 401 with "Token has expired" for expired token', async () => {
    const token = generateExpiredToken();
    // Small delay to ensure token is expired
    await new Promise((resolve) => setTimeout(resolve, 1100));

    const req = createMockReq({ cookies: { accessToken: token } });
    const res = createMockRes();
    const next = createMockNext();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Token has expired',
      error: 'TokenExpiredError'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 with "Invalid token" for malformed token', async () => {
    const req = createMockReq({ cookies: { accessToken: 'not-a-valid-jwt' } });
    const res = createMockRes();
    const next = createMockNext();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid token',
      error: 'JsonWebTokenError'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 when Authorization header has wrong scheme', async () => {
    const token = generateValidToken();
    const req = createMockReq({
      headers: { authorization: `Basic ${token}` }
    });
    const res = createMockRes();
    const next = createMockNext();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Missing authentication credentials',
      error: 'UNAUTHORIZED'
    });
  });

  it('should return 401 when Authorization header has no token value', async () => {
    const req = createMockReq({
      headers: { authorization: 'Bearer ' }
    });
    const res = createMockRes();
    const next = createMockNext();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});
