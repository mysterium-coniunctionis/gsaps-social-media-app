# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GSAPS Social Media App is a React-based academic social platform for the Graduate Student Association for Psychedelic Studies. It combines social networking features (posts, messaging, groups, events) with unique academic features including a Research Library (papers with ratings/reviews/discussions) and a Learning Management System (courses with CE credits, quizzes, and certifications). The app is designed to integrate with WordPress/BuddyBoss via REST API but currently runs with comprehensive mock data.

**Current Status:** Phase 7 Complete (Gold Standard) - 95%+ feature parity with major platforms
**Tech Stack:** React 18, Material-UI 5, React Router 6, Context API for state management
**Demo Mode:** Fully functional with mock data for all features

## Development Commands

### Essential Commands

```bash
# Start development server (opens http://localhost:3000)
npm start

# Build production bundle
npm run build

# Run tests (Jest + React Testing Library)
npm test

# Run single test file
npm test -- path/to/test-file.test.js

# Run tests in watch mode
npm test -- --watch
```

### Testing Credentials

```
Username: demo_user
Password: demo123
```

## Architecture Overview

### State Management Architecture

The app uses React Context API for global state management with three primary contexts:

1. **AuthContext** (`src/context/AuthContext.js`)
   - Manages user authentication state and JWT tokens
   - Provides login/logout/register functions
   - Stores token in localStorage as 'gsaps_token'
   - Handles automatic token validation on app load
   - Usage: `const { currentUser, login, logout, loading } = useAuth()`

2. **ThemeContext** (`src/context/ThemeContext.js`)
   - Controls light/dark mode switching
   - Persists theme preference in localStorage
   - Provides Material-UI theme configuration with GSAPS brand colors
   - Usage: `const { mode, toggleTheme } = useTheme()`

3. **GamificationContext** (`src/context/GamificationContext.js`)
   - Manages XP (experience points), levels, ranks, and achievements
   - Tracks 50+ different XP-earning actions (posts, papers, courses, engagement)
   - Implements 50 progressive levels with 10 rank tiers (Novice → Mythic)
   - Handles daily streaks and achievement unlocks
   - Persists gamification state in localStorage
   - Usage: `const { userStats, addXP, checkAchievements } = useGamification()`

### Component Architecture

Components are organized by feature domain:

- **Pages** (`src/pages/`): Route-level components (Feed, Groups, Events, Messages, etc.)
- **Layout** (`src/components/layout/`): App-wide layout (Navbar, BottomNavigation)
- **Common** (`src/components/common/`): Reusable UI components (GlassCard, Toast, SkeletonLoader, MentionInput)
- **Feature** (`src/components/[feature]/`): Feature-specific components organized by domain (feed, library, reactions, notifications, courses, gamification, circles)

### API Integration Layer

- **API Client** (`src/api/api.js`): Axios instance with interceptors for auth tokens and error handling
- **Auth API** (`src/api/auth.js`): Authentication endpoints (login/register/logout/getCurrentUser)
- **Mock Auth** (`src/api/mockAuth.js`): Mock authentication for development without backend

Currently the app uses **mock data with setTimeout()** to simulate async API calls. When integrating with WordPress/BuddyBoss:
- Update baseURL in `src/api/api.js` to WordPress REST API endpoint
- Replace mock API functions with real API calls to WordPress/BuddyBoss endpoints

### Routing and Protected Routes

Routes are defined in `src/App.js` using React Router 6. The app implements a `ProtectedRoute` wrapper component that:
- Checks if user is authenticated via AuthContext
- Redirects to /login if not authenticated
- Shows loading spinner during auth check
- Protects routes like /feed, /profile/:username, /members, /groups, etc.

Public routes: Home (/), Login, Register, Events listing
Protected routes: Feed, Profile, Members, Groups, Messages, Research Library, Courses, Leaderboard

### Design System

**Glassmorphism Design**: The app uses a modern glassmorphism design system with frosted glass effects, implemented via the `GlassCard` component (`src/components/common/GlassCard.js`). Use this component for consistent card-based UI.

**Animations**: 25+ custom keyframe animations defined in `src/theme/animations.js` including fadeIn, slideIn, scaleIn, bounce, pulse, shake, etc. Import and apply via Material-UI's `sx` prop animation property.

**Theme Colors**: GSAPS brand colors are defined in ThemeContext:
- Primary: Purple/violet tones
- Secondary: Teal/cyan tones
- Background: Dark mode optimized with proper contrast
- Glassmorphic overlays with backdrop-filter blur

**Responsive Design**: Mobile-first with breakpoints for xs/sm/md/lg/xl. Desktop shows Navbar, mobile shows BottomNavigation.

## Key Features and Their Locations

### Research Library (Killer Feature)
- **Pages**: `src/pages/library/ResearchLibrary.js`, `src/pages/library/PaperDetail.js`
- **Components**: `src/components/library/PaperCard.js`, `PaperUploadDialog.js`, `PaperReviews.js`, `PaperDiscussion.js`, `CitationExport.js`, `RelatedPapers.js`
- **Data**: `src/data/researchPapersData.js`
- **Features**: Paper upload, 5-star ratings, reviews, threaded discussions, citation export (BibTeX/APA/MLA), related papers, search/filter

### Learning Management System (LMS)
- **Pages**: `src/pages/courses/Courses.js`, `src/pages/courses/CourseDetail.js`, `src/pages/courses/CoursePlayer.js`
- **Components**: `src/components/courses/CourseCard.js`, `CreateCourseDialog.js`
- **Data**: `src/data/coursesData.js` (4 comprehensive demo courses)
- **Features**: Course creation, enrollment, lessons/modules, video content, quizzes, CE credits (7 categories), progress tracking, certificates

### Gamification System
- **Context**: `src/context/GamificationContext.js` (core logic for XP, levels, achievements)
- **Components**: `src/components/gamification/UserStatsCard.js`, `XPNotification.js`
- **Pages**: `src/pages/Leaderboard.js`, `src/pages/UserProfile.js` (displays stats/achievements)
- **Features**: 50 levels, 10 ranks, 50+ XP actions, 20+ achievements, daily streaks, leaderboards with period filters

### Social Features
- **Activity Feed**: `src/pages/Feed.js`, `src/components/feed/PostCard.js`, `PostComposer.js`, `CommentSection.js`
- **Reactions**: `src/components/reactions/` (8-emoji reaction system: 👍❤️😂😮😢😡🎉🤔)
- **@Mentions**: `src/components/common/MentionInput.js` (autocomplete mention input)
- **Notifications**: `src/components/notifications/NotificationCenter.js`, `NotificationItem.js`
- **Messaging**: `src/pages/Messages.js`, `Conversation.js`
- **Groups**: `src/pages/Groups.js`, `GroupDetail.js`
- **Events**: `src/pages/Events.js`, `EventDetail.js`

### Integration Circles (Sprint 1 - In Development)
- **Pages**: `src/pages/IntegrationCircles.js` (planned), `CircleDetail.js` (planned)
- **Components**: `src/components/circles/CircleCard.js`
- **Data**: `src/data/circlesData.js`, `circleResources.js`
- **Plan**: See `SPRINT_1_IMPLEMENTATION_PLAN.md` for detailed implementation roadmap

## Important Development Patterns

### Mock Data Pattern
All features currently use mock data with simulated async operations:
```javascript
// Simulate API call with setTimeout
setTimeout(() => {
  setData(mockData);
  setLoading(false);
}, 500);
```

When adding new features, follow this pattern for consistency. Place mock data in `src/data/` directory.

### XP and Gamification Integration
When implementing new user actions, award XP using the GamificationContext:
```javascript
const { addXP } = useGamification();

// When user completes an action
addXP(XP_ACTIONS.CREATE_POST, 'Created a post');
```

Available XP actions are defined in `src/context/GamificationContext.js` under `XP_ACTIONS`.

### Protected Routes
New protected pages should be wrapped in ProtectedRoute component:
```javascript
<Route path="/new-feature" element={
  <ProtectedRoute>
    <NewFeature />
  </ProtectedRoute>
} />
```

### Component Styling
Use Material-UI's `sx` prop for styling (CSS-in-JS). For glassmorphic cards, use the `GlassCard` component:
```javascript
import GlassCard from '../components/common/GlassCard';

<GlassCard>
  {/* Your content */}
</GlassCard>
```

### Adding Animations
Import animations from theme and apply via sx prop:
```javascript
import { fadeInUp } from '../theme/animations';

<Box sx={{ animation: `${fadeInUp} 0.6s ease-out` }}>
  {/* Animated content */}
</Box>
```

## Testing Approach

The app uses Jest and React Testing Library. When writing tests:
- Mock AuthContext for components requiring authentication
- Mock localStorage for features using persistent storage
- Use `screen.getByRole()` and semantic queries for better accessibility
- Test user interactions with `userEvent` from @testing-library/user-event

## Environment Configuration

Environment variables are configured via `.env` file (see `.env.example`):
```
REACT_APP_API_URL=https://gsaps.org/wp-json
REACT_APP_JWT_AUTH_PATH=/jwt-auth/v1/token
```

For local WordPress development, set `REACT_APP_API_URL=http://localhost/wp-json`

## Common Development Tasks

### Adding a New Page
1. Create page component in `src/pages/[feature]/`
2. Add route in `src/App.js`
3. Add navigation link in `src/components/layout/Navbar.js` and/or `BottomNavigation.js`
4. Wrap in ProtectedRoute if authentication required
5. Add mock data in `src/data/` if needed

### Adding a New Feature Component
1. Create component in `src/components/[feature]/`
2. Follow existing patterns: use GlassCard for cards, Material-UI components, responsive design
3. Import animations from `src/theme/animations.js` for motion
4. Integrate with GamificationContext if feature should award XP
5. Add mock data with setTimeout pattern for async simulation

### Modifying Gamification
- XP values: Modify `XP_ACTIONS` in `src/context/GamificationContext.js`
- Level thresholds: Modify `LEVEL_THRESHOLDS` array
- Achievements: Modify `ACHIEVEMENTS` array
- Ranks: Modify `RANKS` array

## WordPress/BuddyBoss API Integration (Future)

The app is designed to connect to WordPress/BuddyBoss REST API endpoints:
- `/jwt-auth/v1/token` - Authentication
- `/wp/v2/users` - User management
- `/buddyboss/v1/members` - Member profiles
- `/buddyboss/v1/groups` - Groups
- `/buddyboss/v1/activity` - Activity feed
- `/buddyboss/v1/messages` - Messaging
- `/tribe/events/v1/events` - Events

When implementing real API integration:
1. Update `src/api/api.js` baseURL
2. Replace mock functions in `src/api/` with real API calls
3. Update data models to match WordPress/BuddyBoss response formats
4. Remove setTimeout mock patterns
5. Add proper error handling for network failures

## Roadmap and Documentation

- **README.md**: Comprehensive project overview, features, roadmap
- **DEMO_INSTRUCTIONS.md**: Full feature walkthrough for demos
- **PROJECT_STATUS.md**: Current status, completed phases, next priorities
- **SPRINT_1_IMPLEMENTATION_PLAN.md**: Detailed plan for Integration Circles feature
- **GENAI_FEATURES_ROADMAP.md**: Phase 8 AI features (18 planned features)
- **UI_COMPONENTS_GUIDE.md**: Component documentation and usage
- **IMPLEMENTATION_GUIDE.md**: Implementation details for all features

## Build and Deployment

Production build creates optimized bundle in `/build` directory:
```bash
npm run build
```

Build output includes:
- Minified JavaScript bundles
- Optimized assets and images
- Static HTML template
- Ready for deployment to static hosting (Netlify, Vercel, GitHub Pages)

Current production bundle size: ~295 kB (gzipped)

## Special Notes

- The app uses **demo_user/demo123** for authentication in development
- All user data persists in localStorage (gamification stats, theme preference, auth token)
- Mobile navigation uses BottomNavigation, desktop uses Navbar
- Research Library is the "killer feature" that differentiates from generic social platforms
- Gamification system is fully integrated across all features
- Integration Circles is the next priority feature (see Sprint 1 plan)
