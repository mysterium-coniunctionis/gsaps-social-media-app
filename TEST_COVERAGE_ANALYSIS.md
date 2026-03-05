# Test Coverage Analysis

## Current State

**Overall coverage: 7.4% statements | 2.9% branches | 4.1% functions | 7.7% lines**

The codebase has 166+ source files but only 10 test files containing 58 test cases (57 passing, 1 failing). The test infrastructure is solid (Jest, React Testing Library, jest-axe, Lighthouse CI) but is severely underutilized.

### What IS tested

| Area | Files | Tests | Coverage |
|------|-------|-------|----------|
| ThemeContext | `context/ThemeContext.test.js` | 2 | 100% statements |
| Date utilities | `utils/dateUtils.test.js` | 6 | 100% statements |
| Mention utilities | `utils/mentionUtils.test.js` | 4 | 100% statements |
| Mock conversations | `utils/mockConversations.test.js` | 6 | 100% statements |
| Crisis modal | `components/crisis/CrisisModal.test.js` | 15 | Partial |
| SearchTextField | `components/common/SearchTextField.test.js` | 4 | Partial |
| StatCard | `components/common/StatCard.test.js` | 2 | Partial |
| Symposium room | `__tests__/SymposiumRoom.test.js` | 2 | 63% statements |
| Symposium hook | `__tests__/useSymposiumChannel.test.js` | 2 | Partial |
| Accessibility | `__tests__/a11y.test.js` | 1 | Smoke test |

### What is NOT tested (0% coverage)

- **All 26 page components** (Feed, Login, Register, Settings, Courses, Library, etc.)
- **All 11 API service modules** (mockAuth, backend, networkService, etc.)
- **All 5 custom hooks** (useFeedAlgorithm, useAria, useKeyboardShortcuts, useOptimisticList, useExperiment)
- **All feed components** (PostCard, CommentSection, SmartFeed)
- **All gamification components** (XP, achievements, leaderboards)
- **All course components** (CoursePlayer, CourseDetail, Courses)
- **All library components** (PaperDetail, ResearchLibrary)
- **5 of 7 context providers** (AuthContext, GamificationContext, RealtimeContext, SubscriptionContext, AccessibilityContext)
- **All utility modules with business logic** (neuralFeed, matchingAlgorithm, moderation, recommendationService)
- **Entire backend** (Express server, Prisma models, REST endpoints)

---

## Priority Recommendations

### Priority 1: Pure Logic / Utility Modules (High value, low effort)

These files contain complex algorithms with no UI dependencies, making them the easiest to test and the most likely to contain subtle bugs.

**1. `src/utils/neuralFeed.js` (480 lines, 0% coverage)**

This is the core feed ranking algorithm. It has 10 exported functions including `calculateRecencyScore`, `calculateEngagementScore`, `calculateCompositeScore`, `rankFeedPosts`, and `updateUserProfile`. Each is a pure function with well-defined inputs and outputs.

What to test:
- `calculateRecencyScore` - Exponential decay correctness (a 24-hour-old post should score ~0.5)
- `calculateEngagementScore` - Weighted sum with log normalization
- `calculateTopicRelevance` - Jaccard similarity with edge cases (empty tags, missing profile)
- `detectViralContent` - Threshold logic, circuit breaker behavior
- `applyDiversityPenalty` - Penalty application when similarity exceeds 70%
- `calculateCompositeScore` - A/B variant weight adjustments
- `rankFeedPosts` - End-to-end ranking, viral circuit breaker limiting to 3 posts
- `updateUserProfile` - Affinity delta calculation for each engagement type
- `getABVariant` - Deterministic variant assignment

**2. `src/utils/matchingAlgorithm.js` (483 lines, 0% coverage)**

The mentor matching algorithm with 10+ scoring functions. Each sub-function has clear expected behavior.

What to test:
- `calculateExpertiseOverlap` - Jaccard similarity, case insensitivity, empty arrays
- `calculateExperienceGap` - Optimal ranges for mentor (3-7 years) vs peer (0-3 years)
- `calculateGoalsAlignment` - Complementary pairs (mentor/seeking-mentor = 1.0)
- `calculateMatchScore` - Composite scoring with custom weights
- `findTopMatches` - Filtering by type (mentor/mentee/peer/collaborator), minimum score, limit
- `getColdStartRecommendations` - Modified weights for new users, response rate boost

**3. `src/utils/moderation.js` (128 lines, 0% coverage)**

Content moderation is a safety-critical feature. `detectContentIssues` scans for blocklisted terms and PII (emails, phone numbers).

What to test:
- PII regex detection: phone numbers in various formats, email addresses
- Blocklist matching: case insensitivity, category classification
- Severity assignment: `critical` for PII, `high` for blocklist
- Recommended action: `quarantine` for critical, `review` for non-critical, `allow` for clean content
- Edge cases: empty content, content with special characters

**4. `src/utils/recommendationService.js` (258 lines, 0% coverage)**

Cross-domain recommendation engine with signal tracking, profile building, and diversified results.

What to test:
- `logInteraction` - Signal accumulation with proper weights
- `getRecommendations` - Scoring, sorting, category diversification
- `normalizeWeights` - Normalization math, zero-total edge case
- `recordExperimentImpression` / `recordExperimentConversion` - Counter incrementation
- Control vs personalized variant scoring

### Priority 2: Authentication (High risk, medium effort)

**5. `src/api/mockAuth.js` (651 lines, 0% coverage)**

This is the authentication system used in demo/development mode. It handles login, registration, token management, password resets, MFA, and session management. Auth bugs can lock users out or create security issues even in mock mode.

What to test:
- `mockLogin` - Successful login, wrong password, wrong username, MFA required
- `mockRegister` - Successful registration, duplicate username, duplicate email, short password
- `mockRefreshTokens` - Token rotation, revoked token rejection
- `mockLogout` - Token cleanup
- Rate limiting - 5 attempts within 10 minutes triggers lockout
- Token expiry - Access tokens expire in 15 minutes, refresh in 7 days
- `mockRequestPasswordReset` / `mockResetPassword` - Flow completion, expired tokens
- `mockEnableMfa` / `mockDisableMfa` - State toggling, recovery code generation
- `mockOauthLogin` - User creation on first OAuth, returning existing user on repeat

**6. `src/context/AuthContext.js` (76 lines, 0% coverage)**

The auth context provider wraps React Query mutations for login/register/logout. Testing it verifies that auth state propagates correctly through the app.

What to test:
- Login mutation updates `currentUser` in the query cache
- Register mutation updates `currentUser` in the query cache
- Logout clears user state and sets `sessionActive` to false
- Unauthorized handler triggers logout and sets `authError`

### Priority 3: Context Providers & Custom Hooks (Medium value, medium effort)

**7. `src/context/GamificationContext.js` (97 lines, 75% statement coverage from transitive imports, but 0 dedicated tests)**

The gamification context manages XP, levels, and achievements. It has exported constants (`XP_ACTIONS`, `RANKS`) and a `calculateLevel` function.

What to test:
- `calculateLevel` - Level thresholds (0 XP = level 1, 100 XP = level 2, 1300+ XP = level 6)
- `awardXP` - Skips when no user, uses `XP_ACTIONS` lookup, accepts custom amounts
- `userStats` derivation from query data

**8. `src/hooks/useFeedAlgorithm.js` (325 lines, 0% coverage)**

Complex hook managing feed state, pagination, engagement tracking, and profile persistence.

What to test:
- Initial state with empty posts
- Ranking trigger when rawPosts change
- Pagination (`loadMore`) - Page incrementation, `hasMore` tracking
- `trackView` / `trackViewEnd` - Timer management, minimum 500ms threshold
- `trackEngagement` - Queue accumulation, historical data update
- `markNotInterested` - Immediate removal from displayed posts
- Profile persistence to/from localStorage

**9. `src/context/RealtimeContext.js` (241 lines, 0% coverage)**

Socket.IO realtime context. Testing would require mocking `socket.io-client` but is important for verifying reconnection logic and event handling.

**10. `src/hooks/useKeyboardShortcuts.js` (176 lines, ~5% coverage)**

Command palette and keyboard shortcut handler. Pure DOM event logic that can be tested with `@testing-library/react-hooks`.

### Priority 4: Critical UI Components (Medium value, higher effort)

**11. Feed components** - `PostCard.js` (10.9 KB), `CommentSection.js` (11.3 KB), `SmartFeed.js` (17.9 KB)

The core social feed is the heart of the app. At minimum, test:
- PostCard renders author, content, reactions, and action buttons
- CommentSection renders threaded comments and handles reply submission
- SmartFeed integrates with useFeedAlgorithm and renders feed items

**12. Auth pages** - `Login.js`, `Register.js`, `PasswordReset.js`

User-facing auth flows where bugs are most visible:
- Form validation (required fields, password length)
- Error display on failed login
- Successful login redirects
- Registration with all fields

**13. Course components** - `Courses.js`, `CourseDetail.js`, `CoursePlayer.js`

The LMS is a major feature. Test:
- Course listing renders all courses
- Course detail shows lessons and enrollment button
- CoursePlayer tracks lesson progress

### Priority 5: Backend (Separate test infrastructure needed)

**14. `server/src/index.js` - Express REST API**

The backend has 11 endpoint groups but zero tests. This would require setting up a separate test runner (e.g., supertest).

What to test:
- Auth endpoints (POST /api/auth/login, /api/auth/register)
- CRUD operations for posts, comments, papers
- Authorization middleware
- Error handling responses

---

## Existing Test Issues

1. **1 failing test**: The `a11y.test.js` accessibility smoke test is failing, likely due to rendering issues with the full App component. This should be fixed before adding more tests.

2. **No coverage thresholds configured**: There are no minimum coverage thresholds in `package.json` or Jest config. Adding thresholds would prevent coverage from regressing.

3. **No CI test pipeline**: Tests don't appear to run in CI (only `ci:a11y` for Lighthouse). Adding a CI step for unit tests would catch regressions.

---

## Suggested Configuration Changes

Add coverage thresholds to `package.json`:

```json
"jest": {
  "coverageThreshold": {
    "global": {
      "branches": 20,
      "functions": 20,
      "lines": 25,
      "statements": 25
    }
  }
}
```

Start with achievable thresholds and increase them as tests are added.

---

## Summary

The highest-impact areas to test first are the **pure utility modules** (`neuralFeed.js`, `matchingAlgorithm.js`, `moderation.js`, `recommendationService.js`) because they contain complex business logic, have zero dependencies on React rendering, and can be tested with simple input/output assertions. Following that, the **authentication layer** (`mockAuth.js`, `AuthContext.js`) is the highest-risk untested area since auth bugs affect every user. Context providers and hooks come next, followed by the critical UI components.

A realistic near-term goal would be reaching **30-40% statement coverage** by testing priorities 1-3, which would cover the most algorithmically complex and highest-risk code in the project.
