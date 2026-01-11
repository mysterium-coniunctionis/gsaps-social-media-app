# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **📁 Documentation Organization**: This file is located at `docs/core/development-guides/CLAUDE.md`. All documentation has been organized into themed folders under `docs/`. See [DOCUMENTATION_INDEX.md](../../../DOCUMENTATION_INDEX.md) for the complete structure.

## Project Overview

GSAPS Social Media App is a full-stack academic social platform for the Graduate Student Association for Psychedelic Studies. It combines social networking features (posts, messaging, groups, events) with unique academic features including a Research Library (100+ peer-reviewed papers), Learning Management System (courses with CE credits), and 2026 innovation features (Voice Rooms, Virtual Spaces, Circle Matching, AI Copilot).

**Current Status:** Phase 8+ Complete - Full-stack application with Express.js backend
**Frontend Stack:** React 18.2.0, Material-UI 5.13.1, TanStack React Query 5.90, Three.js 0.158
**Backend Stack:** Express.js 4.19, Prisma 5.15, SQLite (PostgreSQL-ready)
**Real-time:** Socket.IO Client 4.8 for chat, presence, and symposium features
**Demo Mode:** Fully functional with mock data fallback when backend unavailable
**Tests:** 58/58 passing with accessibility coverage

## Development Commands

### Essential Commands

```bash
# Start both frontend and backend concurrently
npm run dev

# Start frontend only (localhost:3000)
npm start

# Start backend only (localhost:4000)
npm run dev:backend

# Build production bundle
npm run build

# Run tests (Jest + React Testing Library)
npm test

# Run single test file
npm test -- path/to/test-file.test.js

# Lint code (zero-warning enforcement)
npm run lint

# Database commands
npm run db:setup    # Create DB, run migrations, seed data
npm run db:seed     # Re-seed database
npm run db:reset    # Drop and recreate database
```

### Testing Credentials

```
Username: demo_user
Password: demo123
```

## Architecture Overview

### State Management Architecture

The app uses React Context API combined with TanStack React Query for global state management:

**Primary Contexts:**

1. **AuthContext** (`src/context/AuthContext.js`)
   - Manages user authentication state and JWT tokens
   - Provides login/logout/register functions
   - Uses httpOnly cookies for secure token storage
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
   - Usage: `const { userStats, addXP, checkAchievements } = useGamification()`

4. **RealtimeContext** (`src/context/RealtimeContext.js`)
   - Socket.IO integration for real-time features
   - Manages channel subscriptions for chat, presence, and symposium
   - Provides fallback to localStorage for offline mode
   - Usage: `const { socket, subscribe, emit } = useRealtime()`

5. **AriaContext** (`src/context/AriaContext.js`)
   - Manages Aria AI Copilot state
   - Handles conversation history and AI responses
   - Usage: `const { messages, sendMessage, isOpen } = useAria()`

**Server State (TanStack React Query):**
- Used for caching and synchronizing server data
- Automatic refetching and cache invalidation
- Query keys: `['currentUser']`, `['posts']`, `['gamification']`, etc.

### Component Architecture

Components are organized by feature domain:

- **Pages** (`src/pages/`): Route-level components (Feed, Groups, Events, Messages, etc.)
- **Layout** (`src/components/layout/`): App-wide layout (Navbar, BottomNavigation)
- **Common** (`src/components/common/`): Reusable UI components (GlassCard, Toast, SkeletonLoader, MentionInput)
- **Feature** (`src/components/[feature]/`): Feature-specific components organized by domain (feed, library, reactions, notifications, courses, gamification, circles)

### API Integration Layer

**Frontend API Layer (`src/api/`):**
- **api.js**: Axios instance with interceptors for auth tokens and error handling
- **backend.js**: Main CRUD operations for posts, users, courses, etc.
- **auth.js**: Authentication endpoints (login/register/logout/getCurrentUser)
- **aiService.js**: AI Notetaker and recommendation services
- **symposiumClient.js**: Live symposium event handling
- **voiceRoomService.js**: Voice room management
- **virtualSpaceService.js**: 3D virtual space operations

**Backend API (`server/src/index.js`):**
The Express.js backend provides REST endpoints:
- `POST /auth/register`, `/auth/login`, `/auth/logout` - Authentication
- `GET/POST /posts`, `/posts/:id/reactions`, `/posts/:id/comments` - Social feed
- `GET/POST /courses`, `/courses/:id/progress` - Learning management
- `GET/POST /assets`, `/assets/:id/reviews` - Research library
- `GET /gamification`, `/leaderboard` - Gamification system
- `GET/POST /messages` - Private messaging

The frontend includes **mock data fallback** for offline development. Set `REACT_APP_API_URL=http://localhost:4000` to use the real backend.

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

### 2026 Innovation Features (NEW)

These features were added in December 2025 - January 2026:

**Voice Rooms** (`src/components/voice/`, `src/pages/VoiceRooms.js`)
- Real-time voice collaboration spaces
- Audio visualization components
- Room management UI

**Virtual Spaces** (`src/components/xr/`, `src/pages/VirtualSpaces.js`)
- 3D immersive environments using Three.js / @react-three/fiber
- Interactive space navigation
- SpaceRenderer component for 3D scenes

**Circle Matching** (`src/components/circles/`)
- ✅ CircleMatchingWizard - guided matching flow
- ✅ CircleCard - circle browsing component
- ✅ CreateCircleDialog - circle creation
- Mock data: `src/data/circlesData.js`, `circleResources.js`

**Command Palette** (`src/components/common/CommandPalette.js`)
- Global keyboard navigation (Ctrl+K)
- Quick access to all features

**Crisis Support** (`src/components/crisis/`)
- CrisisButton - global access button
- Mental health resources directory
- Grounding exercises component

**Aria AI Copilot** (`src/components/ai/`, `src/context/AriaContext.js`)
- AriaFloatingButton - floating UI trigger
- AriaCoPilot - chat interface
- Mock AI responses (ready for real API integration)

**Career & Mentoring** (`src/pages/CareerNavigator.js`, `src/pages/MentorNetwork.js`)
- Professional development planning
- Mentor-mentee matching

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

## Backend Integration

The app now has a complete Express.js backend. To use it:

```bash
# Start both frontend and backend
npm run dev

# Or run separately
npm run dev:frontend  # React on port 3000
npm run dev:backend   # Express on port 4000
```

**Database Setup:**
```bash
npm run db:setup  # First-time setup
npm run db:seed   # Re-seed with demo data
npm run db:reset  # Drop and recreate database
```

The backend uses SQLite by default (Replit-compatible). For production, configure PostgreSQL in `server/.env`.

**API Communication:**
The frontend reads `REACT_APP_API_URL` (defaults to `http://localhost:4000`). Authentication uses httpOnly cookies for security.

## Roadmap and Documentation

Documentation is organized in themed folders under `docs/`:

**Core Documentation:**
- **[README.md](../../../README.md)**: Comprehensive project overview, features, roadmap
- **[DOCUMENTATION_INDEX.md](../../../DOCUMENTATION_INDEX.md)**: Complete documentation navigation hub
- **[DEMO_INSTRUCTIONS.md](../getting-started/DEMO_INSTRUCTIONS.md)**: Full feature walkthrough for demos
- **[QUICKSTART_MACBOOK.md](../getting-started/QUICKSTART_MACBOOK.md)**: Quick start guide for local development

**Development Guides (this directory):**
- **[IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)**: Implementation details for all completed features
- **[UI_COMPONENTS_GUIDE.md](UI_COMPONENTS_GUIDE.md)**: Component documentation and usage

**Project Status:**
- **[PROJECT_STATUS.md](../project-status/PROJECT_STATUS.md)**: Current status, completed phases, priorities, next steps
- **[GOLD_STANDARD_STATUS.md](../project-status/GOLD_STANDARD_STATUS.md)**: Detailed achievements report and feature breakdown

**Feature Documentation:**
- **[LMS_SYSTEM_DOCUMENTATION.md](../../features/lms/LMS_SYSTEM_DOCUMENTATION.md)**: Learning Management System documentation
- **[RESEARCH_LIBRARY_SUMMARY.md](../../features/research-library/RESEARCH_LIBRARY_SUMMARY.md)**: Research Library features

**Planning & Roadmap:**
- **[SPRINT_1_IMPLEMENTATION_PLAN.md](../../planning-strategy/SPRINT_1_IMPLEMENTATION_PLAN.md)**: Integration Circles implementation plan (PLANNED - NOT YET IMPLEMENTED)
- **[GENAI_FEATURES_ROADMAP.md](../../planning-strategy/GENAI_FEATURES_ROADMAP.md)**: Phase 8 AI features roadmap (18 planned features for future)
- **[INNOVATION_ROADMAP.md](../../planning-strategy/INNOVATION_ROADMAP.md)**: Long-term innovation roadmap

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

Current production bundle size: ~326 kB (gzipped)

## Special Notes

- The app uses **demo_user/demo123** for authentication in development
- All user data persists in localStorage with optional backend persistence
- Mobile navigation uses BottomNavigation, desktop uses Navbar
- Research Library has 100+ peer-reviewed psychedelic research papers
- Gamification system is fully integrated across all features (feed, library, courses)
- 2026 features (Voice Rooms, Virtual Spaces, Circle Matching) are implemented with mock data
- Three.js is pinned to 0.158.0 for @react-three/drei compatibility
- AI features (Aria Copilot, AI Notetaker) use mock responses - ready for real API integration
