# Security Documentation

## Authentication Security Improvements

### httpOnly Cookie Implementation

**Date Implemented**: December 13, 2025
**Status**: ✅ Production-ready

### Overview

GSAPS has migrated from localStorage-based JWT storage to **httpOnly cookies** for enhanced security. This change significantly reduces the risk of XSS (Cross-Site Scripting) attacks.

### What Changed

#### Before (Insecure)
- JWT tokens stored in `localStorage`
- Tokens accessible to JavaScript code
- Vulnerable to XSS attacks
- Tokens sent via `Authorization: Bearer` header

#### After (Secure)
- JWT tokens stored in httpOnly cookies
- Tokens **not** accessible to JavaScript code
- Protected from XSS attacks
- Cookies sent automatically by the browser
- Backward compatibility maintained during transition

### Technical Implementation

#### Backend Changes (`server/src/index.js`)

1. **New Cookie-Based Auth**:
   - Access tokens: 15 minutes lifetime (httpOnly)
   - Refresh tokens: 7 days lifetime (httpOnly)
   - `secure` flag in production (HTTPS only)
   - `sameSite` protection against CSRF

2. **New Endpoints**:
   - `POST /auth/refresh` - Refresh access token using refresh token
   - `POST /auth/logout` - Clear auth cookies

3. **Updated Middleware**:
   - Checks cookies first (secure method)
   - Falls back to Authorization header (backward compatibility)

#### Frontend Changes

1. **`src/api/api.js`**:
   - Deprecated localStorage token functions
   - Cookies sent automatically via `withCredentials: true`
   - Authorization header kept for backward compatibility

2. **`src/api/backend.js`**:
   - Login/register still store tokens for backward compatibility
   - Added documentation about migration

3. **`src/api/auth.js`**:
   - Logout now calls backend to clear cookies
   - Refresh token flow updated

### Security Benefits

1. **XSS Protection**: httpOnly cookies cannot be accessed by JavaScript, even if an XSS vulnerability exists
2. **CSRF Protection**: sameSite cookie attribute prevents cross-site request forgery
3. **Shorter Token Lifetime**: Access tokens expire in 15 minutes (vs 2 days before)
4. **Automatic Refresh**: Refresh tokens allow seamless re-authentication

### Migration Path

#### Phase 1: Hybrid Mode (Current)
- ✅ Backend sets httpOnly cookies
- ✅ Backend still returns token in response (deprecated)
- ✅ Frontend still stores token in localStorage (deprecated)
- ✅ Backend accepts both cookies and Authorization header
- ✅ Full backward compatibility

#### Phase 2: Cookie-Only Mode (Future)
- Remove token from response body
- Remove localStorage storage
- Remove Authorization header fallback
- Cookies-only authentication

### Testing

To test the new authentication:

```bash
# Login and check cookies
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}' \
  -c cookies.txt -v

# Make authenticated request with cookies
curl http://localhost:4000/auth/me \
  -b cookies.txt \
  -v

# Refresh token
curl -X POST http://localhost:4000/auth/refresh \
  -b cookies.txt \
  -c cookies.txt \
  -v

# Logout
curl -X POST http://localhost:4000/auth/logout \
  -b cookies.txt \
  -v
```

### Configuration

#### Environment Variables

No new environment variables required. Existing configuration:

- `JWT_SECRET`: Secret key for signing JWTs
- `NODE_ENV`: Set to `production` for secure cookies (HTTPS only)
- `CORS_ORIGINS`: Allowed origins for CORS

#### Cookie Configuration

```javascript
{
  httpOnly: true,                                    // Prevents JavaScript access
  secure: process.env.NODE_ENV === 'production',   // HTTPS only in production
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  maxAge: 15 * 60 * 1000                           // 15 minutes for access token
}
```

### Browser Compatibility

httpOnly cookies are supported in all modern browsers:
- ✅ Chrome 1+
- ✅ Firefox 3+
- ✅ Safari 3+
- ✅ Edge (all versions)
- ✅ Mobile browsers

### Known Issues & Limitations

1. **Local Development**:
   - Cookies work on `localhost`
   - For different domains, ensure CORS is configured properly

2. **Third-Party Cookies**:
   - If frontend and backend are on different domains in production, ensure proper CORS headers
   - Consider using a reverse proxy to serve both from same domain

3. **Logout Across Tabs**:
   - Cookie-based auth doesn't automatically sync logout across tabs
   - Consider implementing a BroadcastChannel or localStorage event listener for multi-tab sync

### Security Audit Checklist

- [x] httpOnly flag set on all auth cookies
- [x] secure flag enabled in production
- [x] sameSite attribute configured
- [x] Short-lived access tokens (15 min)
- [x] Long-lived refresh tokens (7 days)
- [x] Token refresh endpoint implemented
- [x] Logout clears all auth cookies
- [x] CORS properly configured
- [x] No sensitive data in JWT payload

### Future Enhancements

1. **Token Rotation**: Rotate refresh tokens on each use
2. **Device Fingerprinting**: Bind tokens to device/browser
3. **Session Management**: Allow users to view/revoke active sessions
4. **Rate Limiting**: Implement rate limiting on auth endpoints
5. **MFA Support**: Add multi-factor authentication

### References

- [OWASP JWT Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- [MDN: HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [Auth0: Token Storage Best Practices](https://auth0.com/docs/secure/security-guidance/data-security/token-storage)

---

**Document Version**: 1.0
**Last Updated**: December 13, 2025
**Maintained By**: Engineering Team
