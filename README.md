# 🧠 GSAPS Social Media Web App

<div align="center">

**Academic Social Platform for the Graduate Student Association for Psychedelic Studies**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/mysterium-coniunctionis/gsaps-social-media-app)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.13.1-007FFF?logo=mui)](https://mui.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Features](#-features) • [Demo](#-getting-started) • [Tech Stack](#-technology-stack) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 🎯 About

> **Current Status:** Full-stack application with Express.js backend, SQLite database, and comprehensive React frontend. Production-ready for deployment with mock data fallback mode.

GSAPS Social Media App is an academic collaboration platform designed specifically for the psychedelic research community. It combines social networking features with a research library and learning management system to support researchers, students, and practitioners in their work.

### Key Differentiators

- **Research Library** - 100+ peer-reviewed papers with ratings, reviews, and threaded discussions
- **Learning Management** - Course platform with CE credits tracking, quizzes, and certificates
- **Gamification** - XP system with 50 levels, 10 ranks, achievements, and leaderboards
- **2026 Innovation Features** - Voice Rooms, Virtual Spaces, Live Symposia, Circle Matching, AI Copilot
- **Modern Design** - Glassmorphism UI with 25+ animations, keyboard shortcuts, and accessibility features
- **Full-Stack Architecture** - Express.js backend with Prisma ORM and SQLite database
- **Open Source** - Community-driven development under MIT license

---

## 📊 Current Implementation

**Build:** ~339 kB gzipped | **Tests:** 58/58 passing | **Tech:** React 18.2, Material-UI 5.13, Express.js, Prisma

### Implemented Features

**Social Features:**

- Activity feed with post composer (text, images, tags)
- 8-emoji reaction system (👍❤️😂😮😢😡🎉🤔)
- @mention autocomplete and user tagging
- Threaded comments with reactions
- Notification center with badge counts
- Private messaging between members
- Groups and events with RSVP

**Research Library:**

- 100+ peer-reviewed psychedelic research papers
- Upload papers with full metadata (DOI, PMID, authors, affiliations)
- 5-star rating and review system
- Threaded discussions on papers
- Citation export (BibTeX, APA, MLA)
- Related papers recommendations
- Personal library collections

**Learning Management System:**

- 4 production-ready courses with 93 working video lessons
- Quiz system with scoring and explanations (70% passing requirement)
- CE credits tracking (APA, CME, CNE categories)
- Course enrollment and progress tracking
- Certificate generation upon completion
- XP rewards for course activities

**Gamification:**

- 50 progressive levels and 10 ranks (Novice → Mythic)
- XP system with 37 earning actions across all activities
- 19 achievements with unlock conditions
- Leaderboards with period filters (All Time, Week, Month)
- Daily streak tracking
- User profiles with stats and achievements

**Live Symposia:**

- Live agenda with speaker queue, attendee roster, and presence pills
- Stage + chat layout with emoji reactions and poll voting
- Shared markdown protocol canvas with live preview
- AI Notetaker card that summarizes notes, action items, and citation suggestions

**2026 Innovation Features:**

- **Voice Rooms** - Real-time voice collaboration spaces
- **Virtual Spaces** - 3D immersive environments powered by Three.js
- **Circle Matching Wizard** - AI-powered peer support circle recommendations
- **Command Palette** - Global keyboard navigation (Ctrl+K)
- **Crisis Support Button** - One-click access to mental health resources
- **Aria AI Copilot** - Research assistance chatbot with floating UI
- **Career Navigator** - Professional development planning tools
- **Mentor Network** - Peer mentoring platform

### Architecture

- **Full-Stack:** Express.js backend with Prisma ORM and SQLite database
- **Frontend:** React 18 with code splitting and lazy loading
- **Authentication:** JWT tokens with httpOnly cookies, bcrypt password hashing
- **State Management:** React Context API (Auth, Theme, Gamification, Realtime, Aria) + TanStack React Query
- **Realtime:** Socket.IO-powered `RealtimeProvider` for chat, presence, and symposium channels
- **3D/XR:** Three.js with @react-three/fiber for Virtual Spaces
- **Styling:** Material-UI with custom theme and 25+ animations
- **Build Tool:** Create React App with Lighthouse CI for accessibility

---

## 🚀 Getting Started

### Prerequisites

- Node.js 14 or higher
- npm 6 or higher
- Modern web browser

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/mysterium-coniunctionis/gsaps-social-media-app.git
cd gsaps-social-media-app

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The app will open at **http://localhost:3000**

### Test Account

Use these credentials to explore the demo:

```
Username: demo_user
Password: demo123
```

### Join a live symposium

- Navigate to **Home → Live Symposia** or open `/symposia/symp-001` after signing in.
- The experience runs in mock-data mode when no realtime backend is configured; updates (chat, agenda, polls, presence) render immediately for demos.
- AI Notetaker uses local helpers in `src/api/aiService.js` so summaries and action items work offline.

Or register a new account directly in the UI. All data is stored in localStorage and can be reset by clearing browser storage.

### Available Commands

```bash
npm start          # Start development server (localhost:3000)
npm run build      # Create production build (build/ folder)
npm test           # Run test suite
npm run lint       # Lint code with ESLint
npm run format     # Check code style with Prettier
```

### What You Can Try

**Social Features:**

- Create posts with images and tags
- React to posts and comments (8 emoji types)
- Use @mentions to tag other users
- Explore groups and RSVP to events
- Send private messages

**Research Library:**

- Browse academic papers
- Upload papers with metadata
- Rate and review papers
- Start threaded discussions
- Export citations in multiple formats

**Learning Platform:**

- Enroll in 4 comprehensive courses
- Watch 93 video lessons
- Take quizzes and earn certificates
- Track CE credits

**Gamification:**

- Earn XP through various activities
- Unlock achievements
- Level up and increase rank
- Compete on leaderboards

For a detailed walkthrough, see [DEMO_INSTRUCTIONS.md](docs/core/getting-started/DEMO_INSTRUCTIONS.md)

---

## 🛠 Technology Stack

### Frontend Technologies

- **React 18.2.0** - UI framework with hooks and functional components
- **Material-UI 5.13.1** - Component library with theming and styling
- **React Router 6.11.2** - Client-side routing with protected routes
- **TanStack React Query 5.90** - Server state management and caching
- **Socket.IO Client 4.8** - Real-time communication
- **Three.js 0.158 / @react-three/fiber** - 3D graphics for Virtual Spaces
- **Axios 1.4.0** - HTTP client with interceptors
- **date-fns 2.30.0** - Date formatting and manipulation
- **bcryptjs 3.0.3** - Password hashing

### Backend Technologies

- **Express.js 4.19** - REST API server
- **Prisma 5.15** - ORM for database operations
- **SQLite** - Lightweight database (Replit-compatible)
- **JSON Web Tokens** - Authentication with httpOnly cookies
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Architecture & Patterns

- **Component Architecture:** 76+ functional components with React hooks
- **State Management:** Context API (Auth, Theme, Gamification, Realtime, Aria) + React Query
- **API Layer:** Axios client with mock fallback for offline development
- **Styling:** CSS-in-JS with Material-UI `sx` prop and glassmorphism theme
- **Animations:** 25+ keyframe animations for smooth transitions
- **Code Organization:** Feature-based folder structure with lazy loading

### Development Tools

- Create React App for build tooling
- ESLint with zero-warning enforcement
- Prettier for code formatting
- Jest + React Testing Library for testing
- Lighthouse CI for accessibility audits
- jest-axe for a11y testing

---

## 📁 Project Structure

```
gsaps-social-media-app/
├── src/                          # React frontend
│   ├── api/                      # API integration layer
│   │   ├── api.js               # Axios instance with interceptors
│   │   ├── backend.js           # Main CRUD operations
│   │   ├── aiService.js         # AI Notetaker, recommendations
│   │   └── symposiumClient.js   # Live event client
│   ├── components/              # 76+ React components
│   │   ├── common/              # GlassCard, CommandPalette, ErrorBoundary
│   │   ├── feed/                # PostCard, PostComposer, CommentSection
│   │   ├── library/             # PaperCard, ResearchWorkspace
│   │   ├── courses/             # CourseCard, LessonPlayer, QuizComponent
│   │   ├── gamification/        # XPNotification, Leaderboard
│   │   ├── voice/               # VoiceRoomUI, AudioVisualization
│   │   ├── xr/                  # 3D space renderer
│   │   ├── circles/             # CircleCard, CircleMatching
│   │   ├── crisis/              # CrisisButton, MentalHealthResources
│   │   ├── ai/                  # AriaCoPilot, AriaFloatingButton
│   │   └── layout/              # Navbar, BottomNavigation
│   ├── context/                 # State management providers
│   │   ├── AuthContext.js       # User authentication
│   │   ├── ThemeContext.js      # Light/dark mode
│   │   ├── GamificationContext.js # XP, levels, achievements
│   │   ├── RealtimeContext.js   # Socket.IO for real-time
│   │   └── AriaContext.js       # AI Copilot state
│   ├── data/                    # Mock data (14 files)
│   ├── pages/                   # 27+ route components
│   ├── hooks/                   # Custom React hooks
│   ├── theme/                   # Material-UI theme and animations
│   └── utils/                   # Helper functions
├── server/                       # Express.js backend
│   ├── src/
│   │   ├── index.js             # Express server with REST routes
│   │   └── seed.js              # Database seeding (1300+ lines)
│   └── prisma/                  # Database schema
│       └── schema.prisma        # 15+ data models
├── docs/                        # Comprehensive documentation
│   ├── core/                    # Getting started, guides, status
│   ├── features/                # Feature documentation
│   ├── planning-strategy/       # Roadmaps and plans
│   └── reports/                 # QA, performance reports
├── public/                      # Static assets
└── package.json                 # Dependencies and scripts
```

---

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

- **Getting Started:** [Quick Start Guide](docs/core/getting-started/QUICKSTART_MACBOOK.md), [Demo Instructions](docs/core/getting-started/DEMO_INSTRUCTIONS.md)
- **Development:** Architecture guides and component documentation
- **Features:** Detailed docs for LMS and Research Library
- **Planning:** Roadmaps including [GenAI Features](docs/planning-strategy/GENAI_FEATURES_ROADMAP.md)
- **Reports:** QA evidence, performance improvements, phase completions

See [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) for complete navigation.

---

## 🗺 Future Development

### Recently Completed (January 2026)

- Express.js backend with SQLite database (decoupled from WordPress)
- Voice Rooms and Virtual Spaces (3D environments)
- Circle Matching Wizard for peer support communities
- Crisis Support integration with mental health resources
- Command Palette (Ctrl+K) for power users
- Aria AI Copilot for research assistance
- Career Navigator and Mentor Network features
- Skeleton loading states and UX polish

### Planned Enhancements

**Production Deployment:**

- PostgreSQL migration for production scale
- CDN setup for static assets
- API rate limiting and caching
- Monitoring and alerting

**GenAI Features (In Progress):**

- Connect to OpenAI/Anthropic APIs for real AI responses
- Smart research paper recommendations
- AI-powered content moderation
- Personalized learning pathways

See [GENAI_FEATURES_ROADMAP.md](docs/planning-strategy/GENAI_FEATURES_ROADMAP.md) for detailed proposals.

**Mobile & PWA:**

- Progressive Web App with offline support
- Push notifications
- React Native app consideration

**Advanced Features:**

- Video conferencing for Live Symposia
- Blockchain-verified certificates
- Advanced analytics dashboard
- Integration with Zotero/Mendeley

---

## 🔧 Deployment

### Build for Production

```bash
npm run build
```

Creates an optimized build in the `build/` folder ready for static hosting.

### Deployment Options

- **GitHub Pages:** Push build folder to gh-pages branch
- **Netlify/Vercel:** Connect repository for automatic deployments
- **Static Hosting:** Serve build folder with any web server
- **Cloud Platforms:** AWS S3, Azure, Google Cloud Storage

### Environment Variables

Optional `.env` file for WordPress/BuddyBoss integration:

```
REACT_APP_API_URL=https://your-wordpress-site.com/wp-json
REACT_APP_MEDIA_URL=https://cdn.example.com
```

Without these variables, the app runs in mock mode with localStorage.

---

## 🤝 Contributing

Contributions are welcome! Here's how to help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Guidelines

- Follow existing code style and patterns
- Write clear commit messages
- Add comments for complex logic
- Update documentation as needed
- Test thoroughly before submitting

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/mysterium-coniunctionis/gsaps-social-media-app/issues)
- **Discussions:** [GitHub Discussions](https://github.com/mysterium-coniunctionis/gsaps-social-media-app/discussions)
- **Website:** [gsaps.org](https://gsaps.org)

---

<div align="center">

**Built with ❤️ for the psychedelic research community**

[⬆ Back to Top](#-gsaps-social-media-web-app)

</div>

## Backend API (Express + SQLite)

The repository includes a full Express.js backend in `server/` that exposes authenticated REST endpoints for users, posts, messages, courses, gamification, and research assets backed by SQLite via Prisma. The SQLite database is ideal for development and Replit deployment, with easy migration to PostgreSQL for production.

### Bootstrapping the API

```bash
# From project root - installs both frontend and backend deps
npm install

# Set up the database
npm run db:setup    # Creates DB, runs migrations, seeds data

# Start both frontend and backend concurrently
npm run dev

# Or start individually:
npm run dev:frontend  # React on port 3000
npm run dev:backend   # Express on port 4000
```

### Database Commands

```bash
npm run db:seed     # Re-seed database with demo data
npm run db:reset    # Drop and recreate database
```

### API Endpoints

The backend provides REST endpoints for all features:
- `POST /auth/register`, `/auth/login`, `/auth/logout` - Authentication
- `GET/POST /posts`, `/posts/:id/reactions`, `/posts/:id/comments` - Social feed
- `GET/POST /courses`, `/courses/:id/progress` - Learning management
- `GET/POST /assets`, `/assets/:id/reviews` - Research library
- `GET /gamification`, `/leaderboard` - Gamification system
- `GET/POST /messages` - Private messaging

The React app reads `REACT_APP_API_URL` (defaults to `http://localhost:4000`) to reach the backend. Authentication uses httpOnly cookies for security.
