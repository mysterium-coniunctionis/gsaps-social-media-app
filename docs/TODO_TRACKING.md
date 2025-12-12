# Technical Debt & TODO Tracking

**Created**: December 12, 2025
**Last Updated**: December 12, 2025
**Total TODOs**: 36

This document tracks all TODO items in the codebase, organized by category and priority.

---

## Summary by Category

| Category | Count | Priority |
|----------|-------|----------|
| Authentication API | 8 | High |
| API Integration | 12 | High |
| UI/UX Features | 6 | Medium |
| Analytics & Tracking | 4 | Low |
| A/B Testing | 2 | Low |
| Error Handling | 1 | Medium |
| File Operations | 3 | Medium |

---

## 1. Authentication API (8 items) - HIGH PRIORITY

These require backend implementation before frontend can be completed.

| File | Line | TODO | Status |
|------|------|------|--------|
| `src/api/auth.js` | 45 | Implement password reset request | Pending |
| `src/api/auth.js` | 51 | Implement password reset with token | Pending |
| `src/api/auth.js` | 61 | Implement MFA enable | Pending |
| `src/api/auth.js` | 66 | Implement MFA disable | Pending |
| `src/api/auth.js` | 71 | Implement get active sessions | Pending |
| `src/api/auth.js` | 76 | Implement revoke session | Pending |
| `src/api/auth.js` | 81 | Implement email verification request | Pending |
| `src/api/auth.js` | 86 | Implement email verification with token | Pending |

**Dependencies**: Backend API endpoints needed

---

## 2. API Integration (12 items) - HIGH PRIORITY

Replace mock data with real API calls.

| File | Line | TODO | Status |
|------|------|------|--------|
| `src/pages/UserProfile.js` | 56 | Replace with real API call | Pending |
| `src/pages/Members.js` | 38 | Fetch members from API | Pending |
| `src/pages/Groups.js` | 49 | Fetch groups from API | Pending |
| `src/pages/GroupDetail.js` | 41 | Fetch group details from API | Pending |
| `src/pages/Settings.js` | 95 | Implement API call to save profile | Pending |
| `src/pages/Settings.js` | 101 | Implement API call to save account settings | Pending |
| `src/pages/Settings.js` | 107 | Implement API call to save privacy settings | Pending |
| `src/pages/Leaderboard.js` | 48 | Replace with real API call | Pending |
| `src/pages/library/PaperDetail.js` | 69 | Replace with real API call | Pending |
| `src/components/library/PaperReviews.js` | 36 | Replace with real API call | Pending |
| `src/components/library/PaperUploadDialog.js` | 148 | Replace with real API call | Pending |
| `src/components/library/RelatedPapers.js` | 36 | Replace with real API call | Pending |
| `src/components/library/PaperDiscussion.js` | 37 | Replace with real API call | Pending |
| `src/components/feed/CommentSection.js` | 32 | Fetch comments from API | Pending |
| `src/components/courses/CreateCourseDialog.js` | 90 | Replace with real API call | Pending |

**Dependencies**: Backend API endpoints and data models

---

## 3. UI/UX Features (6 items) - MEDIUM PRIORITY

Missing UI functionality.

| File | Line | TODO | Status |
|------|------|------|--------|
| `src/pages/Feed.js` | 219 | Implement GuidelinesGate component | Pending |
| `src/pages/GroupDetail.js` | 84 | Implement join/leave functionality | Pending |
| `src/pages/Groups.js` | 515 | Implement join/leave functionality | Pending |
| `src/pages/Messages.js` | 171 | Connect to online status | Pending |
| `src/components/feed/PostCard.js` | 74 | Show share dialog | Pending |
| `src/components/notifications/NotificationCenter.js` | 162 | Navigate to full notifications page | Pending |

**Dependencies**: Some require backend support, others are frontend-only

---

## 4. Analytics & Tracking (4 items) - LOW PRIORITY

Analytics integration points.

| File | Line | TODO | Status |
|------|------|------|--------|
| `src/pages/library/PaperDetail.js` | 129 | Track view in analytics | Pending |
| `src/pages/library/PaperDetail.js` | 136 | Track download | Pending |
| `src/components/ai/SmartRecommendations.js` | 276 | Implement actual save logic | Pending |
| `src/components/common/ErrorBoundary.js` | 27 | Send to error tracking service | Pending |

**Dependencies**: Analytics service integration (e.g., Mixpanel, Amplitude)

---

## 5. A/B Testing (2 items) - LOW PRIORITY

Experiment framework integration.

| File | Line | TODO | Status |
|------|------|------|--------|
| `src/pages/library/ResearchLibrary.js` | 37 | Implement useExperiment hook for A/B testing | Pending |
| `src/pages/courses/Courses.js` | 40 | Implement useExperiment hook for A/B testing | Pending |

**Dependencies**: A/B testing service or custom experiment framework

---

## 6. File Operations (3 items) - MEDIUM PRIORITY

File upload and download functionality.

| File | Line | TODO | Status |
|------|------|------|--------|
| `src/components/library/PaperCard.js` | 45 | Implement download | Pending |
| `src/components/feed/PostComposer.js` | 106 | Upload images to server | Pending |

**Dependencies**: File storage service (S3, CloudFlare R2, etc.)

---

## Recommended Implementation Order

### Phase 1: Core API Infrastructure
1. Authentication APIs (password reset, MFA, sessions)
2. Settings save functionality
3. Group/member fetch and join/leave

### Phase 2: Content APIs
1. Library APIs (papers, reviews, discussions)
2. Feed APIs (comments, posts)
3. Leaderboard and user profile APIs

### Phase 3: Enhanced Features
1. File upload/download
2. Share dialog
3. Online status
4. Notifications page

### Phase 4: Analytics & Optimization
1. Error tracking service integration
2. Analytics events
3. A/B testing framework

---

## Notes

- All API integrations are currently using mock data
- Backend API documentation should be created alongside implementation
- Consider implementing a unified API client/service layer
- Add loading states and error handling for each API integration

---

## Change Log

| Date | Changes |
|------|---------|
| 2025-12-12 | Initial document created with 36 TODOs cataloged |
