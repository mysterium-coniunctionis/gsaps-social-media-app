# 🧠 GSAPS Social Media Web App

<div align="center">

**A Next-Generation Academic Social Platform for the Graduate Student Association for Psychedelic Studies**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/mysterium-coniunctionis/gsaps-social-media-app)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.13.1-007FFF?logo=mui)](https://mui.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Features](#-features) • [Demo](#-quick-demo) • [Tech Stack](#-technology-stack) • [Getting Started](#-getting-started) • [Roadmap](#-roadmap)

</div>

---

## 🎯 Vision

> **Important:** This project currently operates as a front-end prototype. All data is served from curated mock fixtures and a hardened local authentication service so teams can demo the UX while the BuddyBoss/WordPress integration is still in flight.

**GSAPS Social Media App** is revolutionizing academic collaboration in psychedelic research by combining **cutting-edge social features** with a **member-driven research repository**. We're building a platform that goes beyond typical social networks to create a thriving knowledge-sharing ecosystem for researchers, students, and practitioners.

### What Makes Us Different?

🔬 **Research Library** - First-class academic paper repository with ratings, reviews, and discussions
💬 **Rich Engagement** - Facebook-style reactions, @mentions, threaded discussions
🎓 **Academic Focus** - Built specifically for psychedelic research community
📱 **Modern UX** - Glassmorphism design, 25+ animations, fully responsive
🔓 **Open Source** - Community-driven development with full transparency

---

## 📊 Project Status

### Current Release: **Prototype Alignment Update**
**Build Size:** 323.76 kB (gzipped) | **Status:** Front-end prototype with secure mock services and production integration stubs

> 📚 **Documentation**: See [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) for a complete guide to all project documentation.

<table>
<tr>
<td width="50%">

### ✅ Completed (7 Phases)

- **Phase 1: Activity Feed System**
  - Feed with post composer
  - Rich text posts with image upload
  - Comment system with threading
  - Notification center with badges
  - Modern UI component library

- **Phase 2: Advanced Engagement**
  - 8-emoji reaction system (👍❤️😂😮😢😡🎉🤔)
  - @mention autocomplete
  - Tag system for posts

- **Phase 3: Research Library**
  - Browse & search papers
  - Upload with metadata (DOI, PMID, authors)
  - Paper detail pages
  - Rating & review system (5-star)
  - Threaded discussions
  - Citation export (BibTeX, APA, MLA)

- **Phase 4: Learning Management System (LMS)**
  - Course platform (TutorLMS-style)
  - Course creation & enrollment
  - CE Credits tracking (APA, CME, CNE, etc.)
  - 4 demo courses with full metadata
  - Quiz and assessment system

- **Phase 5: Gamification System** 🎮
  - 50 progressive levels
  - 10 ranks (Novice → Mythic)
  - 50+ XP actions
  - 20+ achievements
  - Daily streak tracking
  - Progress persistence

- **Phase 6: Leaderboards & Competition** 🏆
  - Top 3 podium display
  - Full rankings table
  - Period filters (All Time, Week, Month)
  - Stats tracking (posts, papers, courses)
  - Medal system (🥇🥈🥉)

- **Phase 7: User Profiles with Stats** 👤
  - Beautiful profile headers
  - Rank badges and progress bars
  - Achievement showcases
  - Activity stats (posts, papers, courses, XP)
  - Streak indicators 🔥

</td>
<td width="50%">

### 🚀 Next Phase

- **Phase 8: GenAI-Powered Features** (18 features planned)
  - AI Course Assistant & Q&A Bot
  - Smart Research Paper Recommendations
  - AI Content Moderation & Safety
  - Automated Meeting Notes & Summaries
  - Smart Networking Suggestions
  - Adaptive Learning Pathways
  - AI Research Assistant
  - And 11 more innovative features!

  📋 See [GENAI_FEATURES_ROADMAP.md](GENAI_FEATURES_ROADMAP.md)

### 📅 Future Phases

- **Phase 9: Real-time Features**
  - WebSocket integration
  - Live notifications
  - Real-time chat
  - Online presence

- **Phase 10: PWA Implementation**
  - Offline support
  - Push notifications
  - App install prompt

- **Phase 11: Production Deployment**
  - WordPress/BuddyBoss API integration
  - Real data synchronization
  - Performance optimization

</td>
</tr>
</table>

---

## ✨ Features

### 🎨 User Interface

- **Glassmorphism Design** - Modern frosted glass effects with backdrop filters
- **25+ Custom Animations** - Smooth transitions and micro-interactions using Material-UI keyframes
- **Dark/Light Mode** - Persistent theme switching with GSAPS brand colors
- **Fully Responsive** - Mobile-first design with breakpoints for all devices
- **Accessible** - WCAG 2.1 compliant with keyboard navigation

### 📱 Social Features

- **Activity Feed** - Rich post composer with image upload, tags, and mentions
- **Emoji Reactions** - 8 reaction types (Like, Love, Haha, Wow, Sad, Angry, Celebrate, Think)
- **@Mentions** - Discord/Slack-style user tagging with autocomplete dropdown
- **Comments** - Nested comment threads with reactions
- **Notifications** - Real-time notification center with animated badge counts
- **Messaging** - Private conversations between members
- **Groups** - Topic-based communities with member management
- **Events** - Calendar view with RSVP functionality

### 📚 Research Library (Unique!)

Our **game-changing feature** that differentiates GSAPS from generic social platforms:

- **Paper Repository** - Member-uploaded academic papers with full metadata
- **Advanced Search** - Filter by topic, year, author, DOI, keywords
- **Paper Details** - Complete metadata with authors, affiliations, journal info, DOI/PMID links
- **Ratings & Reviews** - 5-star rating system with distribution visualization
- **Academic Discussions** - Threaded discussions specific to each paper
- **Citation Export** - Generate citations in BibTeX, APA, and MLA formats with one click
- **Related Papers** - Smart recommendations based on topics and keywords
- **Personal Library** - Save papers to your collection
- **Statistics** - Track views, downloads, citations, and engagement

### 👥 Member Features

- **Member Directory** - Discover researchers with advanced search and filters
- **Profile Pages** - Customizable profiles with research interests and credentials
- **User Authentication** - Secure login/register with JWT tokens

---

## 🎬 Live Demo & Testing

### ✅ Fully Functional Demo

The app runs entirely on secure mock services so every feature can be exercised without a backend. Swap in the production BuddyBoss/WordPress APIs once they are ready by providing real credentials.

```bash
# 1. Clone the repository
git clone https://github.com/mysterium-coniunctionis/gsaps-social-media-app.git
cd gsaps-social-media-app

# 2. Install dependencies (one-time setup)
npm install

# 3. Start the development server
npm start
```

The app will open automatically at **http://localhost:3000**

### 🧪 Test Credentials

The secure mock authentication service seeds a small set of hashed demo accounts in `localStorage`. You can log in with the following sandbox user or register a new one directly in the UI.

```
Username: demo_user
Password: demo123
```

> The password is hashed in storage and tokens are short-lived random strings. Clear your browser storage to reset the mock database.

### 🎯 What Works Right Now

**All features are live and working:**

✅ **4 Complete Courses** - Production-ready for CE credits:
  - Introduction to Psychedelic-Assisted Therapy (24 lessons, Free)
  - MDMA-Assisted Therapy for PTSD (36 lessons, $299)
  - Neuroscience of Psychedelics (32 lessons, $349)  
  - Harm Reduction & Safety Protocols (22 lessons, $199)

✅ **93 Working Videos** - Real YouTube embeds, all functional

✅ **Interactive Quizzes** - Take quizzes, get scored (70% to pass), see results with explanations

✅ **Certificates** - Professional certificates generated upon course completion with CE credits

✅ **Gamification** - Earn XP for lessons (+20), quizzes (+30), perfect scores (+50), course completion (+150)

✅ **Progress Tracking** - All progress saved in localStorage, resume anytime

✅ **Research Library** - Browse, search, upload papers with ratings and reviews

✅ **Leaderboards** - Compete with other members, view rankings

✅ **User Profiles** - View stats, achievements, activity

✅ **Activity Feed** - Post updates, react, comment, @mention

✅ **Groups & Events** - Join groups, RSVP to events

✅ **Messages** - Private messaging between members

**Course Experience Features:**
- 📹 Video lessons with YouTube player
- 📝 Quizzes with multiple choice questions
- 🏆 Certificates with print/download
- ⭐ XP rewards and gamification
- 💾 Progress persistence
- 📊 Score tracking
- 🎯 70% passing requirement
- 🔄 Retake functionality

### 📖 Comprehensive Demo Guide

For a detailed feature walkthrough, see **[DEMO_INSTRUCTIONS.md](DEMO_INSTRUCTIONS.md)**

### 📸 Live Screenshots

![Course Curriculum Working](https://github.com/user-attachments/assets/eade0424-24be-44d7-97ef-3921462c6253)
*Course detail page showing full curriculum with lessons and video content*

---

## 🛠 Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI framework with hooks and functional components |
| **Material-UI** | 5.13.1 | Comprehensive component library with theming |
| **React Router** | 6.11.2 | Client-side routing with protected routes |
| **Axios** | 1.4.0 | HTTP client with interceptors |
| **date-fns** | 2.30.0 | Date formatting and manipulation |

### Architecture & Patterns

- **Component Architecture**: Functional components with hooks
- **State Management**: Context API (AuthContext, ThemeContext, ToastContext)
- **Styling**: CSS-in-JS with Material-UI's `sx` prop
- **Animations**: Material-UI keyframes for 25+ custom animations
- **Code Organization**: Feature-based folder structure
- **Mock Data Pattern**: `setTimeout()` to simulate async API calls

### Development Tools

- **Create React App** - Build tooling and development server
- **ESLint** - Code quality and consistency
- **React Scripts** - Build and test scripts
- **Git** - Version control with conventional commits

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Git** for version control
- (Optional) WordPress/BuddyBoss backend for API integration

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mysterium-coniunctionis/gsaps-social-media-app.git
cd gsaps-social-media-app

# 2. Install dependencies
npm install

# 3. (Optional) Configure environment variables
cp .env.example .env
# Edit .env with your API endpoints

# 4. Start development server
npm start
```

### Available Scripts

```bash
npm start          # Start development server (localhost:3000)
npm test           # Run test suite
npm run lint       # Lint the project with ESLint (no warnings allowed)
npm run format     # Check code style with Prettier
npm run build      # Create production build
npm run eject      # Eject from Create React App (one-way)
```

> Prettier will currently flag legacy files that have not yet been reformatted. Use `npm run format` to spot issues in any modules you touch while we incrementally adopt consistent styling.

### Environment configuration

Create a `.env` file (see `.env.example`) to point the frontend at a BuddyBoss/WordPress backend when it becomes available. Without these variables the app stays in mock mode.

Key variables:

- `REACT_APP_API_URL` – Base URL for the production API
- `REACT_APP_MEDIA_URL` – Optional CDN or media host

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder:
- Minified and bundled JavaScript
- Optimized assets and images
- Production React build
- Ready for deployment

---

## 📁 Project Structure

```
gsaps-social-media-app/
├── public/                          # Static files
│   ├── index.html                   # HTML template
│   └── favicon.ico                  # App icon
│
├── src/
│   ├── api/                         # API integration layer
│   │   ├── client.js                # Axios client with interceptors
│   │   ├── auth.js                  # Authentication endpoints
│   │   └── [other API modules]      # Users, groups, events, etc.
│   │
│   ├── components/                  # Reusable components
│   │   ├── common/                  # Shared UI components
│   │   │   ├── GlassCard.js         # Glassmorphism card
│   │   │   ├── SkeletonLoader.js    # Loading skeletons
│   │   │   ├── Toast.js             # Toast notifications
│   │   │   └── MentionInput.js      # @mention text input
│   │   │
│   │   ├── feed/                    # Feed-related components
│   │   │   ├── PostCard.js          # Individual post display
│   │   │   ├── PostComposer.js      # Create new posts
│   │   │   └── CommentSection.js    # Comments with threading
│   │   │
│   │   ├── reactions/               # Reaction system
│   │   │   ├── ReactionButton.js    # Reaction trigger
│   │   │   ├── ReactionPicker.js    # Emoji picker popover
│   │   │   └── ReactionsSummary.js  # Aggregate reactions
│   │   │
│   │   ├── library/                 # Research library components
│   │   │   ├── PaperCard.js         # Paper display card
│   │   │   ├── PaperUploadDialog.js # Upload form
│   │   │   ├── PaperReviews.js      # Rating & review system
│   │   │   ├── PaperDiscussion.js   # Threaded discussions
│   │   │   ├── CitationExport.js    # Citation generator
│   │   │   └── RelatedPapers.js     # Related papers widget
│   │   │
│   │   ├── notifications/           # Notification system
│   │   │   ├── NotificationCenter.js
│   │   │   └── NotificationItem.js
│   │   │
│   │   └── layout/                  # Layout components
│   │       ├── Navbar.js            # Top navigation
│   │       └── BottomNavigation.js  # Mobile bottom nav
│   │
│   ├── context/                     # React Context providers
│   │   ├── AuthContext.js           # User authentication state
│   │   ├── ThemeContext.js          # Dark/light mode
│   │   └── GamificationContext.js   # XP, levels, achievements
│   │
│   ├── data/                        # Demo data
│   │   ├── coursesData.js           # Demo courses
│   │   ├── eventsData.js            # Demo events
│   │   ├── feed/                    # Activity feed fixtures
│   │   │   └── mockPosts.js         # Structured mock posts and reactions
│   │   └── researchPapersData.js    # Demo papers
│   │
│   ├── pages/                       # Route pages
│   │   ├── Home.js                  # Landing page
│   │   ├── Feed.js                  # Activity feed
│   │   ├── Login.js & Register.js   # Authentication
│   │   ├── Profile.js               # User profile
│   │   ├── UserProfile.js           # User profile with stats
│   │   ├── Leaderboard.js           # Competition leaderboard
│   │   ├── Members.js               # Member directory
│   │   ├── Groups.js & GroupDetail.js
│   │   ├── Events.js & EventDetail.js
│   │   ├── Messages.js & Conversation.js
│   │   ├── library/
│   │   │   ├── ResearchLibrary.js   # Library main page
│   │   │   └── PaperDetail.js       # Individual paper page
│   │   └── courses/
│   │       ├── Courses.js           # Course listing
│   │       └── CourseDetail.js      # Course detail page
│   │
│   ├── theme/                       # Theme configuration
│   │   ├── index.js                 # MUI theme definition
│   │   └── animations.js            # 25+ keyframe animations
│   │
│   ├── App.js                       # Main app with routing
│   └── index.js                     # React entry point
│
├── DEMO_INSTRUCTIONS.md             # Comprehensive demo guide
├── UI_COMPONENTS_GUIDE.md           # Component documentation
├── PHASE_1_COMPLETION_REPORT.md     # Phase 1 technical report
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

---

## 🗺 Roadmap

### ✅ Phase 1: Activity Feed System (Complete)
- [x] Feed page with post composer
- [x] Post cards with reactions and comments
- [x] Notification center
- [x] Modern UI component library
- [x] 25+ custom animations

### ✅ Phase 2: Advanced Engagement (Complete)
- [x] 8-emoji reaction system
- [x] @mention autocomplete
- [x] Tag system for posts

### ✅ Phase 3: Research Library (Complete)
- [x] Paper repository with search/filter
- [x] Upload papers with metadata
- [x] Paper detail pages
- [x] Rating & review system
- [x] Threaded discussions
- [x] Citation export (BibTeX, APA, MLA)

### ✅ Phase 4: Learning Management System (Complete)
- [x] Course platform (TutorLMS-style)
- [x] Course creation and enrollment
- [x] CE Credits tracking (7 categories)
- [x] 4 comprehensive demo courses
- [x] Quiz and assessment system

### ✅ Phase 5: Gamification System (Complete)
- [x] 50 progressive levels
- [x] 10 ranks (Novice → Mythic)
- [x] 50+ XP-earning actions
- [x] 20+ unlockable achievements
- [x] Daily streak tracking

### ✅ Phase 6: Leaderboards & Competition (Complete)
- [x] Top 3 podium with medals
- [x] Full rankings table
- [x] Period filters (All Time, Week, Month)
- [x] Contribution stats display
- [x] User highlighting

### ✅ Phase 7: User Profiles with Stats (Complete)
- [x] Beautiful profile headers with rank badges
- [x] Level progress bars
- [x] Achievement showcase grid
- [x] Detailed statistics cards
- [x] Activity tab and stats tab

### 🚀 Phase 8: GenAI-Powered Features (PLANNED - Not Yet Started)
**18 AI Features Planned** - See [GENAI_FEATURES_ROADMAP.md](GENAI_FEATURES_ROADMAP.md)

⚠️ **Status**: Planning complete, implementation requires WordPress API integration + AI infrastructure

- [ ] AI Course Assistant with Q&A Bot
- [ ] Smart Research Paper Recommendations
- [ ] AI Content Moderation & Safety
- [ ] Automated Meeting Notes & Summaries
- [ ] Smart Networking Suggestions
- [ ] Adaptive Learning Pathways
- [ ] AI Research Assistant
- [ ] 11+ more innovative features

### 📅 Phase 9: Real-time Features (PLANNED - Not Yet Started)
- [ ] WebSocket integration
- [ ] Live notifications
- [ ] Real-time chat
- [ ] Online presence indicators

### 📅 Phase 10: PWA Implementation (PLANNED - Not Yet Started)
- [ ] Service worker setup
- [ ] Offline support
- [ ] Push notifications
- [ ] App install prompt

### 📅 Phase 11: Production Deployment (IMMEDIATE PRIORITY)
**Current Status**: Ready for WordPress/BuddyBoss API integration

- [ ] WordPress REST API integration
- [ ] BuddyBoss endpoint connection
- [ ] Real data synchronization
- [ ] Performance optimization

---

## 🔧 Deployment & Troubleshooting

### Quick Deployment

**Option 1: Static Hosting (Recommended for Demo)**

```bash
# Build production bundle
npm run build

# Serve with any static server
npx serve -s build

# Or deploy to:
# - GitHub Pages
# - Netlify  
# - Vercel
# - AWS S3 + CloudFront
```

**Option 2: Development Server**

```bash
npm start  # Runs on http://localhost:3000
```

### Common Issues & Solutions

**Issue: "Dependencies not installed"**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: "Port 3000 already in use"**
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill

# Or use a different port
PORT=3001 npm start
```

**Issue: "Blank page or build errors"**
```bash
# Clear cache and rebuild
rm -rf node_modules build
npm install
npm run build
```

**Issue: "Images not loading"**
- External images (Unsplash, Pravatar) may be blocked by ad blockers
- Course videos use real YouTube URLs and work properly
- Disable ad blockers for best experience

### Viewing the Live Demo

If you're seeing an outdated version:
1. **Clear browser cache** (Cmd/Ctrl + Shift + R)
2. **Build fresh** from latest code: `npm install && npm run build`
3. **Check you're on the right branch**: `git branch --show-current`
4. **Verify latest commit**: `git log --oneline -1`

### Production Deployment Checklist

- [x] App builds successfully (`npm run build`)
- [x] All routes work properly
- [x] All 4 courses load with content
- [x] Research library functional
- [x] Gamification tracking XP
- [x] No console errors
- [ ] WordPress/BuddyBoss API connected (optional for demo)
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Performance optimized

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style and patterns
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **BuddyBoss** - WordPress social networking platform
- **Material-UI Team** - Excellent React component library
- **GSAPS Community** - Feedback, testing, and support
- **Open Source Contributors** - All who contribute to this project

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/mysterium-coniunctionis/gsaps-social-media-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mysterium-coniunctionis/gsaps-social-media-app/discussions)
- **Website**: [gsaps.org](https://gsaps.org)

---

## 📊 Statistics

![GitHub stars](https://img.shields.io/github/stars/mysterium-coniunctionis/gsaps-social-media-app?style=social)
![GitHub forks](https://img.shields.io/github/forks/mysterium-coniunctionis/gsaps-social-media-app?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/mysterium-coniunctionis/gsaps-social-media-app?style=social)

---

<div align="center">

**Built with ❤️ for the psychedelic research community**

[⬆ Back to Top](#-gsaps-social-media-web-app)

</div>
