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

> **Current Status:** Front-end prototype with mock data and local authentication for UX demonstration and testing.

GSAPS Social Media App is an academic collaboration platform designed specifically for the psychedelic research community. It combines social networking features with a research library and learning management system to support researchers, students, and practitioners in their work.

### Key Differentiators

- **Research Library** - Academic paper repository with ratings, reviews, and threaded discussions
- **Learning Management** - Course platform with CE credits tracking and assessment system
- **Gamification** - XP system, achievements, and leaderboards to encourage engagement
- **Modern Design** - Glassmorphism UI with responsive layout and accessibility features
- **Open Source** - Community-driven development under MIT license

---

## 📊 Current Implementation

**Build:** 339.63 kB gzipped | **Tech:** React 18.2, Material-UI 5.13, React Router 6.11

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

- Paper browsing and advanced search
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

### Architecture

- **Front-end Only:** All features run with mock data in localStorage
- **Authentication:** Secure local auth service with bcrypt password hashing
- **State Management:** React Context API (Auth, Theme, Gamification)
- **Styling:** Material-UI with custom theme and 25+ animations
- **Build Tool:** Create React App with standard configuration

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

### Core Technologies

- **React 18.2.0** - UI framework with hooks and functional components
- **Material-UI 5.13.1** - Component library with theming and styling
- **React Router 6.11.2** - Client-side routing with protected routes
- **Axios 1.4.0** - HTTP client with interceptors
- **date-fns 2.30.0** - Date formatting and manipulation
- **bcryptjs 3.0.3** - Password hashing for local authentication

### Architecture & Patterns

- **Component Architecture:** Functional components with React hooks
- **State Management:** Context API for auth, theme, and gamification state
- **Styling:** CSS-in-JS with Material-UI `sx` prop and custom theme
- **Animations:** Material-UI keyframes for smooth transitions
- **Code Organization:** Feature-based folder structure
- **Mock Services:** localStorage-backed services that simulate async APIs

### Development Tools

- Create React App for build tooling
- ESLint for code quality
- Prettier for code formatting
- Git for version control

---

## 📁 Project Structure

```
gsaps-social-media-app/
├── src/
│   ├── api/              # API integration layer (mock & real endpoints)
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Shared components (GlassCard, Toast, etc.)
│   │   ├── feed/         # Post cards, composer, comments
│   │   ├── reactions/    # Reaction system components
│   │   ├── library/      # Research library components
│   │   ├── courses/      # LMS components
│   │   ├── gamification/ # XP, achievements, leaderboards
│   │   └── layout/       # Navigation and layout
│   ├── context/          # React Context providers
│   │   ├── AuthContext.js
│   │   ├── ThemeContext.js
│   │   └── GamificationContext.js
│   ├── data/             # Mock data for demo
│   ├── pages/            # Route components
│   │   ├── courses/      # Course listing, detail, player
│   │   └── library/      # Research library, paper detail
│   ├── theme/            # Material-UI theme and animations
│   └── utils/            # Helper functions
├── docs/                 # Comprehensive documentation
│   ├── core/             # Getting started, guides, status
│   ├── features/         # Feature documentation
│   ├── planning-strategy/# Roadmaps and plans
│   └── reports/          # QA, performance, phase reports
├── public/               # Static assets
└── package.json          # Dependencies and scripts
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

### Planned Features

**API Integration (Priority):**

- WordPress REST API connection
- BuddyBoss endpoint integration
- Real data synchronization
- Authentication migration

**GenAI Features (Proposal Phase):**

- AI course assistant and Q&A bot
- Smart research recommendations
- Content moderation
- Automated summaries
- Networking suggestions

See [GENAI_FEATURES_ROADMAP.md](docs/planning-strategy/GENAI_FEATURES_ROADMAP.md) for detailed proposals.

**Real-time Features:**

- WebSocket integration
- Live notifications
- Real-time chat
- Online presence

**PWA Implementation:**

- Service worker
- Offline support
- Push notifications
- Install prompt

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
