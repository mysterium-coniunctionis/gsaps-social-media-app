# Code Review: GSAPS Social Media App

**Review Date:** 2025-12-11
**Branch Reviewed:** main
**Reviewer:** Claude (AI-assisted)

## Overview

The GSAPS (Graduate Student Association for Psychedelic Studies) Social Media App is a well-structured React frontend with an Express/Prisma backend. The codebase demonstrates good architecture patterns but has several areas needing attention.

---

## Critical Issues

### 1. Security: XSS Vulnerability via `dangerouslySetInnerHTML`

**File:** `src/pages/workspaces/SymposiumRoom.js:282`

```javascript
<Box sx={{ typography: 'body2' }} dangerouslySetInnerHTML={renderedCanvas} />
```

The markdown content from `canvas` is rendered directly using `marked.parse()` without sanitization. User-controlled input can lead to XSS attacks.

**Recommendation:** Use a sanitizer like DOMPurify before rendering:
```javascript
import DOMPurify from 'dompurify';
const renderedCanvas = { __html: DOMPurify.sanitize(marked.parse(canvas || '')) };
```

### 2. Security: Missing Rate Limiting on Backend

**File:** `server/src/index.js`

The backend has no rate limiting on authentication endpoints (`/auth/login`, `/auth/register`), making it vulnerable to brute force attacks.

**Recommendation:** Add rate limiting middleware (e.g., `express-rate-limit`).

### 3. Security: JWT Token in localStorage

**Files:** `src/api/mockAuth.js`, `src/context/RealtimeContext.js:62`

Tokens are stored in localStorage which is vulnerable to XSS. The mock auth uses `gsaps_token` and `gsaps_refresh_token` keys.

**Recommendation:** Use httpOnly cookies for token storage in production.

---

## Medium Priority Issues

### 4. Missing Input Validation on Backend

**File:** `server/src/index.js`

- No input length validation on post content (`/posts` endpoint)
- No sanitization of user input before database storage
- Missing validation for email format, username constraints

### 5. Double React.memo Wrapping

**File:** `src/components/feed/PostCard.js:40,402`

```javascript
const PostCard = React.memo(({ ... }) => { ... });
// ...
export default React.memo(PostCard); // Double wrapped!
```

The component is already memoized at definition, then exported wrapped again.

### 6. Memory Leak: Object URLs Not Revoked

**File:** `src/components/feed/PostComposer.js:108`

```javascript
const newImages = files.map(file => URL.createObjectURL(file));
```

Created object URLs are never revoked with `URL.revokeObjectURL()`, causing memory leaks.

### 7. Unused/Incomplete Code

**File:** `src/pages/Login.js:35`

```javascript
const { login, loginWithProvider, loading } = useAuth();
```

`loginWithProvider` is destructured but not defined in AuthContext - will be `undefined` and cause runtime errors when OAuth buttons are clicked.

### 8. Hardcoded MFA Code

**File:** `src/api/mockAuth.js:316`

```javascript
return otpCode === '123456' || (user.recoveryCodes || []).includes(otpCode);
```

While labeled as mock, this hardcoded OTP could be problematic if accidentally deployed.

### 9. Missing Error Boundaries at Route Level

**File:** `src/App.js`

Only one ErrorBoundary wraps the entire app. Individual route-level error boundaries would prevent full app crashes.

### 10. Unused Import

**File:** `src/pages/career/CareerNavigator.js:43`

```javascript
useAuth(); // Called but return value not used
```

---

## Low Priority Issues

### 11. CORS Configuration Allows All Origins When Empty

**File:** `server/src/index.js:48`

```javascript
if (config.corsOrigins.length === 0 || config.corsOrigins.includes(origin)) {
  return callback(null, true);
}
```

When `CORS_ORIGINS` env variable is empty, all origins are allowed.

### 12. Nginx Missing Security Headers

**File:** `infra/docker/nginx.conf`

Missing important security headers:
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Content-Security-Policy`
- `Strict-Transport-Security`

### 13. Missing `rel="noopener"` Inconsistency

Some external links use `rel="noreferrer"` but not `rel="noopener noreferrer"` consistently.

### 14. TODO Comments Remaining

Multiple TODO comments indicate incomplete features:
- `src/api/auth.js:44-52` - Password reset not implemented
- `src/api/auth.js:60-67` - MFA enable/disable not implemented
- `src/components/feed/PostComposer.js:106-107` - Image upload to server
- `src/components/common/ErrorBoundary.js:27-28` - Error tracking service

### 15. GuidelinesGate Component Commented Out

**File:** `src/pages/Feed.js:219-226`

The moderation guidelines gate is completely commented out, bypassing the community guidelines acceptance flow.

### 16. Inconsistent Error Handling

- Some API calls don't handle errors gracefully
- `src/pages/courses/CoursePlayer.js:36` - Returns `null` when course not found (silent failure)

### 17. Missing TypeScript

The codebase uses JavaScript without TypeScript, reducing type safety and IDE support.

### 18. Potential Integer Overflow in User ID Generation

**File:** `src/api/mockAuth.js:383`

```javascript
id: users.length + 1,
```

If users are deleted and re-added, IDs could collide.

### 19. AccessibilityProvider Not in Provider Tree

**File:** `src/index.js`

`AccessibilityProvider` is imported in `App.js` but never wrapped around the app in `index.js`, meaning accessibility preferences may not be available app-wide.

### 20. Missing Environment Variable Documentation

**File:** `.env.example`

Backend requires `JWT_SECRET`, `DATABASE_URL`, `PORT`, `CORS_ORIGINS` but `.env.example` only documents frontend variables.

---

## Positive Observations

1. **Good architecture** - Clean separation between API, context, components, and pages
2. **Code splitting** - Proper lazy loading for non-critical pages
3. **Graceful shutdown** - Backend handles SIGTERM/SIGINT properly
4. **Security headers** - Backend uses Helmet for basic security
5. **Authentication flow** - Well-designed token refresh mechanism
6. **Accessibility consideration** - Skip links, ARIA attributes, accessibility context
7. **Error boundary** - Global error handling implemented
8. **Testing setup** - Jest, React Testing Library, and a11y tests configured
9. **Optimistic UI updates** - Good UX with `useOptimisticList` hook
10. **Content moderation** - PII detection and blocklist filtering implemented

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 3 |
| Medium | 7 |
| Low | 10 |

**Top 3 Priorities:**
1. Fix XSS vulnerability in SymposiumRoom markdown rendering
2. Add rate limiting to backend authentication endpoints
3. Review and implement proper token storage strategy for production
