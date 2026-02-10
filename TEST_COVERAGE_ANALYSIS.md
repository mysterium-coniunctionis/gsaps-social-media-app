# Test Coverage Analysis

> Updated: February 2026

## Current State

**Overall coverage: 18.67% statements | 11.9% branches | 13.04% functions | 18.91% lines**

The codebase has 167+ source files with 26 test suites containing 386 passing tests. Since the previous analysis (7.4% statements, 10 test files, 58 tests), coverage has improved significantly through new tests for utilities, API services, contexts, and components. However, large gaps remain in page components, core UI components, critical context providers, and the backend.

### Test Infrastructure

- **Framework**: Jest (via react-scripts 5.0.1)
- **UI Testing**: @testing-library/react 13.4.0, @testing-library/user-event 13.5.0
- **Accessibility**: jest-axe 9.0.0, Lighthouse CI
- **Setup**: `src/setupTests.js` (imports jest-dom, mocks `marked`)
- **Scripts**: `npm test` (watch mode), `npm run test:a11y` (a11y smoke tests)

### What IS Tested (26 test suites, 386 tests)

| Category | File | Tests | Notes |
|----------|------|-------|-------|
| **Utilities** | `utils/neuralFeed.test.js` | ~50+ | Feed ranking algorithm, scoring, A/B variants |
| | `utils/matchingAlgorithm.test.js` | ~40+ | Mentor matching, expertise overlap, scoring |
| | `utils/circleMatching.test.js` | ~30+ | Circle matching and compatibility |
| | `utils/moderation.test.js` | ~25+ | Content moderation, PII detection, blocklists |
| | `utils/recommendationService.test.js` | ~20+ | Recommendation engine, signal tracking |
| | `utils/mentionUtils.test.js` | 4 | Mention parsing and formatting |
| | `utils/dateUtils.test.js` | 6 | Date formatting utilities |
| | `utils/mockConversations.test.js` | 6 | Mock data generation |
| **API Services** | `api/api.test.js` | ~15+ | Base API client, interceptors |
| | `api/backend.test.js` | ~40+ | Backend service wrapper functions |
| | `api/globalSearchService.test.js` | ~20+ | Global search filtering and ranking |
| **Contexts** | `context/ThemeContext.test.js` | 2 | Theme toggle |
| | `context/AccessibilityContext.test.js` | ~15+ | Accessibility preferences, localStorage |
| | `context/GamificationContext.test.js` | ~15+ | XP, levels, achievements |
| | `context/SubscriptionContext.test.js` | ~20+ | Subscription tiers, organization data |
| **Components** | `components/common/ErrorBoundary.test.js` | ~10+ | Error boundary rendering and recovery |
| | `components/common/SearchTextField.test.js` | 4 | Search input component |
| | `components/common/StatCard.test.js` | 2 | Statistics display card |
| | `components/common/Toast.test.js` | ~15+ | Toast notifications |
| | `components/courses/Quiz.test.js` | ~25+ | Quiz component interactions |
| | `components/crisis/CrisisModal.test.js` | ~15+ | Crisis intervention modal |
| **Hooks** | `hooks/useExperiment.test.js` | ~5 | A/B experiment hook |
| | `hooks/useKeyboardShortcuts.test.js` | ~10+ | Keyboard shortcut handling |
| **Integration** | `__tests__/SymposiumRoom.test.js` | 2 | Symposium room rendering |
| | `__tests__/useSymposiumChannel.test.js` | 2 | Symposium channel hook |
| | `__tests__/a11y.test.js` | 1 | Accessibility smoke test |

### What is NOT Tested (0% coverage)

#### Pages (0 of 26 pages tested)
- `Login.js` (253 lines) - Authentication form, MFA support
- `Register.js` (300 lines) - Registration with password strength validation
- `Feed.js` (262 lines) - Main feed with React Query mutations, keyboard shortcuts
- `Home.js` (540 lines) - Landing page with feature showcase
- `Settings.js` (612 lines) - Multi-tab settings with MFA, sessions, privacy
- `UserProfile.js` (468 lines) - Profile display with gamification ranks
- `Courses.js`, `CourseDetail.js`, `CoursePlayer.js` - LMS pages
- `ResearchLibrary.js`, `Collections.js`, `CollectionDetail.js` - Library pages
- `VoiceRooms.js`, `VoiceRoom.js` - Voice chat pages
- `VirtualSpaces.js`, `VirtualSpace.js` - 3D virtual spaces
- `IntegrationCircles.js`, `CircleDetail.js`, `CreateCircle.js` - Circle management
- `MentorNetwork.js`, `CareerNavigator.js`, `PrepAcademy.js` - Career pages
- `CETranscript.js`, `Events.js`, `Groups.js`, `Members.js` - Other pages

#### Context Providers (3 critical untested)
- `AuthContext.js` (75 lines) - Authentication state via React Query
- `AriaContext.js` (176 lines) - AI co-pilot state, speech recognition
- `RealtimeContext.js` (243 lines) - Socket.IO WebSocket connection management

#### API Services (5 untested)
- `auth.js` (71 lines) - Auth API wrapper (login, register, MFA, sessions)
- `networkService.js` (461 lines) - Network match recommendations, filtering
- `voiceRoomService.js` (459 lines) - Voice room CRUD, in-memory state
- `virtualSpaceService.js` (464 lines) - Virtual space management, presence
- `ariaService.js` (335 lines) - AI co-pilot API integration

#### Custom Hooks (2 untested)
- `useAria.js` (356 lines) - AI co-pilot hook with voice recognition, keyboard shortcuts
- `useFeedAlgorithm.js` (364 lines) - Feed ranking, pagination, engagement tracking

#### Components (71 untested out of 77)
Notable untested components include:
- **Feed**: `PostCard.js` (401 lines), `PostComposer.js` (431 lines), `SmartFeed.js` (606 lines), `FeedExplainer.js` (408 lines)
- **Layout**: `Navbar.js` (261 lines), `BottomNavigation.js` (204 lines)
- **AI**: `AriaCoPilot.js` (626 lines), `AICourseAssistant.js` (329 lines), `SmartRecommendations.js` (386 lines)
- **Circles**: `CircleMatchingWizard.js` (593 lines), `CreateCircleDialog.js` (768 lines)
- **Library**: `PaperCard.js` (561 lines), `PaperDiscussion.js` (493 lines), `PaperReviews.js` (211 lines)
- **Voice**: `RoomChat.js` (433 lines), `SpeakerStage.js` (365 lines), `LiveTranscript.js` (335 lines)
- **XR**: `Space3D.js` (436 lines), `SpatialUI.js` (565 lines), `Avatar3D.js` (301 lines), `VirtualScreen.js` (423 lines)
- **Network**: `MatchCard.js` (353 lines), `ConnectionRequest.js` (408 lines), `CompatibilityRadar.js` (302 lines)

#### Backend (0% - separate infrastructure needed)
- `server/src/index.js` (3464 lines) - Express REST API with 11+ endpoint groups
- No test runner or test files exist for the backend

---

## Coverage Gap Analysis by Risk

### High Risk / High Impact (Test these first)

| Area | Risk Factor | Impact if Broken | Lines Untested |
|------|-------------|------------------|----------------|
| AuthContext | Users locked out | Every user affected | 75 |
| RealtimeContext | Silent data loss | Real-time features fail | 243 |
| auth.js API | Auth bypass/lockout | Security vulnerability | 71 |
| Login/Register pages | Can't onboard users | Complete blocker | 553 |
| Feed.js page | Core UX broken | Primary feature unusable | 262 |
| PostComposer.js | Content moderation bypass | Safety risk | 431 |
| Settings.js | MFA/session management bugs | Security risk | 612 |

### Medium Risk / High Impact

| Area | Risk Factor | Impact if Broken | Lines Untested |
|------|-------------|------------------|----------------|
| useFeedAlgorithm hook | Feed ranking broken | Poor UX, engagement drop | 364 |
| PostCard.js | Post display broken | Core feed unusable | 401 |
| Navbar/BottomNav | Navigation broken | Can't reach features | 465 |
| networkService.js | Match recommendations fail | Network feature down | 461 |
| voiceRoomService.js | Voice rooms fail | Voice feature down | 459 |
| virtualSpaceService.js | Virtual spaces fail | XR feature down | 464 |

### Lower Risk / Medium Impact

| Area | Risk Factor | Impact if Broken | Lines Untested |
|------|-------------|------------------|----------------|
| AriaContext | AI co-pilot unavailable | Degraded experience | 176 |
| useAria hook | Voice/keyboard shortcuts fail | Feature degraded | 356 |
| ariaService.js | AI features fail | AI features down | 335 |
| SmartFeed/FeedExplainer | Smart feed features broken | Fallback to basic feed | 1014 |
| XR components | 3D spaces broken | XR feature down | 1725 |
| Course pages | LMS broken | Can't take courses | ~800 |

---

## Priority Recommendations

### Priority 1: Authentication & Authorization (CRITICAL)

**Target: AuthContext + auth.js API + Login/Register pages**

These files form the authentication backbone. A bug here locks out every user.

**`src/context/AuthContext.js`** (75 lines)
- Test login mutation updates `currentUser` query cache
- Test register mutation updates `currentUser` query cache
- Test logout clears user state and sets `sessionActive: false`
- Test unauthorized handler triggers logout and sets `authError`
- Mock: `@tanstack/react-query`, API functions

**`src/api/auth.js`** (71 lines)
- Test each exported function with mocked API/backend calls
- Test token clearing on logout (even when API call fails)
- Test MFA enable/disable flows
- Test session management (getSessions, revokeSession)

**`src/pages/Login.js`** (253 lines)
- Test form rendering and input handling
- Test password visibility toggle
- Test MFA/OTP code entry flow
- Test error display on failed login
- Test navigation to register page
- Test redirect after successful login

**`src/pages/Register.js`** (300 lines)
- Test password strength indicator (calculatePasswordStrength)
- Test all validation rules (email format, password length, matching)
- Test form submission with valid data
- Test error display for duplicate username/email

**Estimated tests: ~50-60 | Coverage gain: ~3-4%**

### Priority 2: Core Feed Experience (HIGH)

**Target: Feed page + PostCard + PostComposer + useFeedAlgorithm**

The social feed is the primary user-facing feature.

**`src/pages/Feed.js`** (262 lines)
- Test React Query integration (post fetching, mutations)
- Test keyboard shortcuts (new post, navigation, like)
- Test post creation via PostComposer
- Test post deletion with confirmation
- Test reaction handling
- Mock: useAuth, useGamification, useKeyboardShortcuts, API calls

**`src/components/feed/PostCard.js`** (401 lines, React.memo)
- Test rendering of author, content, timestamp, reactions
- Test menu interactions (edit, delete, report) for own vs other posts
- Test reaction button callbacks
- Test comment section toggle
- Test bookmark toggle
- Test memo optimization (verify no re-render on same props)

**`src/components/feed/PostComposer.js`** (431 lines)
- Test content input and character limit (5000 chars)
- Test image upload with preview (max 4 images)
- Test content moderation warnings (PII detection, toxicity)
- Test tag/mention management
- Test form reset after successful submission
- Test dialog open/close behavior

**`src/hooks/useFeedAlgorithm.js`** (364 lines)
- Test initial state with empty posts
- Test post ranking when rawPosts change
- Test pagination (loadMore, hasMore)
- Test engagement tracking (trackView, trackViewEnd with 500ms threshold)
- Test markNotInterested removes post immediately
- Test profile persistence to/from localStorage

**Estimated tests: ~80-100 | Coverage gain: ~5-7%**

### Priority 3: Real-time & WebSocket Infrastructure (HIGH)

**`src/context/RealtimeContext.js`** (243 lines)
- Test socket connection with token authentication
- Test room state management (typing, presence)
- Test optimistic update reconciliation
- Test disconnect/reconnect behavior
- Test event listener registration and cleanup
- Mock: `socket.io-client`, `useAuth`

**Estimated tests: ~25-30 | Coverage gain: ~1-2%**

### Priority 4: Settings & Security Features (HIGH)

**`src/pages/Settings.js`** (612 lines)
- Test tab navigation between sections (profile, account, privacy, security)
- Test profile form editing
- Test MFA enable/disable flows
- Test session management and revocation
- Test email verification request
- Test form validation per section

**Estimated tests: ~30-40 | Coverage gain: ~2-3%**

### Priority 5: API Services (MEDIUM-HIGH)

**`src/api/networkService.js`** (461 lines)
- Test match recommendations with various filters
- Test connection request management
- Test profile enrichment and data transformation

**`src/api/voiceRoomService.js`** (459 lines)
- Test room CRUD operations
- Test filtering (category, status, search)
- Test sorting (live rooms first, then by date/count)
- Test in-memory state management

**`src/api/virtualSpaceService.js`** (464 lines)
- Test space queries and event filtering
- Test join/leave with occupancy tracking
- Test avatar position management
- Test duplicate user prevention

**Estimated tests: ~60-80 | Coverage gain: ~5-6%**

### Priority 6: Navigation Components (MEDIUM)

**`src/components/layout/Navbar.js`** (261 lines)
- Test navigation item rendering and routing
- Test responsive behavior (desktop vs mobile menus)
- Test user menu (logout, profile)
- Test role-based navigation items (admin/moderator)
- Test theme toggle

**`src/components/layout/BottomNavigation.js`** (204 lines)
- Test tab selection triggers correct routes
- Test route-to-tab synchronization
- Test "More" menu navigation

**Estimated tests: ~25-30 | Coverage gain: ~2%**

### Priority 7: AI Co-pilot (MEDIUM)

**`src/context/AriaContext.js`** (176 lines)
- Test open/close/toggle callbacks
- Test message history management
- Test context switching (paper, course, post, feed)
- Test localStorage persistence and error recovery
- Test SpeechRecognition capability detection

**`src/hooks/useAria.js`** (356 lines)
- Test keyboard shortcuts (Ctrl+K toggle, Escape close)
- Test URL-based context detection
- Test voice recognition initialization
- Test message sending with context
- Test analysis result caching

**Estimated tests: ~35-45 | Coverage gain: ~2-3%**

### Priority 8: Backend API (REQUIRES NEW INFRASTRUCTURE)

The backend (`server/src/index.js`, 3464 lines) has zero tests and no test infrastructure. This is the largest untested area by line count.

**Setup needed:**
- Add `jest` and `supertest` to `server/package.json` devDependencies
- Create `server/jest.config.js` with appropriate configuration
- Set up test database (SQLite in-memory or separate test DB)
- Mock Prisma client for unit tests

**Priority endpoints to test:**
1. `POST /api/auth/login` and `POST /api/auth/register` - Authentication
2. `GET/POST /api/posts` - Feed CRUD
3. `POST /api/posts/:id/react` - Reactions
4. `GET/POST /api/comments` - Comments
5. Authorization middleware - Token validation, role checking
6. Error handling middleware - Consistent error responses

**Estimated tests: ~100+ | This is a standalone project**

---

## Existing Issues to Address

1. **No coverage thresholds**: Coverage can silently regress. Add thresholds to `package.json`.
2. **No CI test pipeline**: Only `ci:a11y` runs in CI. Add unit test step.
3. **Deprecated `ReactDOMTestUtils.act`**: Several tests use the deprecated API; should migrate to `React.act`.
4. **Backend has zero test infrastructure**: No test runner, no test files, no test database.

### Suggested Configuration

Add to `package.json`:

```json
"jest": {
  "coverageThreshold": {
    "global": {
      "branches": 15,
      "functions": 15,
      "lines": 20,
      "statements": 20
    }
  }
}
```

Start with thresholds slightly above current levels and ratchet up as tests are added.

---

## Roadmap to 40% Coverage

| Phase | Focus Area | Est. Tests | Cumulative Coverage |
|-------|-----------|------------|---------------------|
| Current | Utilities, some API/contexts/components | 386 | ~19% |
| Phase 1 | Auth (context, API, pages) | +55 | ~23% |
| Phase 2 | Core Feed (page, PostCard, PostComposer, hook) | +90 | ~30% |
| Phase 3 | Realtime + Settings | +60 | ~34% |
| Phase 4 | API services (network, voice, virtual) | +70 | ~40% |

This roadmap focuses on the highest-risk, highest-impact areas first and achieves 40% coverage in 4 phases with approximately 275 additional tests.

---

## Summary

The codebase has made good progress from the initial 7.4% to 18.67% statement coverage, with all utility modules and several API services, contexts, and components now tested. The most critical remaining gaps are:

1. **Authentication layer** (AuthContext, auth.js, Login/Register) - highest risk
2. **Core feed experience** (Feed page, PostCard, PostComposer, useFeedAlgorithm) - highest user impact
3. **Real-time infrastructure** (RealtimeContext) - silent failure risk
4. **Settings/security** (Settings page with MFA, sessions) - security risk
5. **Backend API** (3464 lines, zero tests, no infrastructure) - largest gap by volume

Addressing Priorities 1-4 would bring coverage to approximately 34%, covering the most safety-critical and user-facing code paths. The backend (Priority 8) requires separate infrastructure investment but represents the single largest untested surface area.
