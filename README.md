# 🧠 GSAPS Social Media Web App

<div align="center">

**A Next-Generation Academic Social Platform for the Graduate Student Association for Psychedelic Studies**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/mysterium-coniunctionis/gsaps-social-media-app)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.16.7-007FFF?logo=mui)](https://mui.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Features](#-features) • [Demo](#-quick-demo) • [Tech Stack](#-technology-stack) • [Getting Started](#-getting-started) • [Roadmap](#-roadmap)

</div>

---

## 🎯 Vision

**GSAPS Social Media App** is revolutionizing academic collaboration in psychedelic research by combining **cutting-edge social features** with a **member-driven research repository**. We're building a platform that goes beyond typical social networks to create a thriving knowledge-sharing ecosystem for researchers, students, and practitioners.

### What Makes Us Different?

🔬 **Research Library** - First-class academic paper repository with ratings, reviews, and discussions
💬 **Rich Engagement** - Facebook-style reactions, @mentions, threaded discussions
🎓 **Academic Focus** - Built specifically for psychedelic research community
📱 **Modern UX** - Glassmorphism design, 25+ animations, fully responsive
🔓 **Open Source** - Community-driven development with full transparency

---

## 📊 Project Status

### Current Release: **Phase 3 Complete** ✅
**Build Size:** 217.24 kB (gzipped) | **Completion:** ~75% of target feature parity

<table>
<tr>
<td width="50%">

### ✅ Completed (3 Phases)

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
  - Upload with metadata
  - Paper detail pages
  - Rating & review system
  - Threaded discussions
  - Citation export (BibTeX, APA, MLA)

</td>
<td width="50%">

### 🚧 In Progress

- **Phase 4: Real-time Features**
  - WebSocket integration
  - Live notifications
  - Online status indicators
  - Real-time chat

### 📅 Planned (Phase 5-7)

- **Phase 5: Gamification**
  - User reputation system
  - Badges & achievements
  - Leaderboards

- **Phase 6: PWA**
  - Offline support
  - Push notifications
  - App install prompt

- **Phase 7: API Integration**
  - WordPress/BuddyBoss backend
  - Real data synchronization
  - Production deployment

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

## 🎬 Quick Demo

### Running Locally (MacBook Pro)

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

```
Username: demo_user
Password: demo123
```

### 📖 Comprehensive Demo Guide

For a full feature walkthrough, see **[DEMO_INSTRUCTIONS.md](DEMO_INSTRUCTIONS.md)**

---

## 🛠 Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI framework with hooks and functional components |
| **Material-UI** | 5.16.7 | Comprehensive component library with theming |
| **React Router** | 6.26.0 | Client-side routing with protected routes |
| **Axios** | 1.7.4 | HTTP client with interceptors |
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
npm run build      # Create production build
npm run eject      # Eject from Create React App (one-way)
```

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
│   │   └── ThemeContext.js          # Dark/light mode
│   │
│   ├── pages/                       # Route pages
│   │   ├── Home.js                  # Landing page
│   │   ├── Feed.js                  # Activity feed
│   │   ├── Login.js & Register.js   # Authentication
│   │   ├── Profile.js               # User profile
│   │   ├── Members.js               # Member directory
│   │   ├── Groups.js & GroupDetail.js
│   │   ├── Events.js & EventDetail.js
│   │   ├── Messages.js & Conversation.js
│   │   └── library/
│   │       ├── ResearchLibrary.js   # Library main page
│   │       └── PaperDetail.js       # Individual paper page
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

### 🚧 Phase 4: Real-time Features (In Progress)
- [ ] WebSocket integration
- [ ] Live notifications
- [ ] Real-time chat
- [ ] Online status indicators

### 📅 Phase 5: Gamification (Planned)
- [ ] User reputation system
- [ ] Badges and achievements
- [ ] Contribution leaderboards
- [ ] Expert endorsements

### 📅 Phase 6: PWA Implementation (Planned)
- [ ] Service worker setup
- [ ] Offline support
- [ ] Push notifications
- [ ] App install prompt
- [ ] Cache strategies

### 📅 Phase 7: API Integration (Planned)
- [ ] WordPress REST API integration
- [ ] BuddyBoss endpoint connection
- [ ] Real data synchronization
- [ ] Production deployment
- [ ] Performance optimization

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
