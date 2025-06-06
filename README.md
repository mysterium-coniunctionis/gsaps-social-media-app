# GSAPS Social Media Web App

A custom social media web application for the Graduate Student Association for Psychedelic Studies (GSAPS) that integrates with their WordPress/BuddyBoss website.

## 📣 Project Status Update - February 2025

We've successfully built a robust social media web application that integrates with WordPress/BuddyBoss. The application has been structured following React best practices with a comprehensive component architecture and clean separation of concerns.

### Completed Components

1. **Pages (17 total):**
   - Core pages: Home, Login, Register, Profile
   - Social features: Groups, GroupDetail, Members
   - Communication: Messages, Conversation
   - Events: Events, EventDetail
   - Utility: NotFound
   - Additional: ComponentsDemo, DisplayComponentsDemo, DemoLogin, ResearchPublications, LandingPage

2. **Component Architecture:**
   - Common components: LoadingSpinner, Alert, ResponsiveImage
   - Layout components: Navbar, BottomNavigation, PageHeader, MainLayout
   - Form components
   - Display components

3. **Context Providers:**
   - AuthContext - User authentication and management
   - ThemeContext - Theming and appearance customization
   - DemoAuthContext - For development purposes

4. **API Integration:**
   - API client configuration
   - Authentication endpoints
   - Data modules: members, groups, events, messages

### Next Steps

1. **API Integration Completion:**
   - Finalize the connection to WordPress/BuddyBoss API
   - Implement proper error handling for API responses

2. **Authentication Flow:**
   - Complete JWT authentication with WordPress
   - Add token refresh functionality

3. **Real-time Features:**
   - Implement real-time messaging
   - Add notifications system

## Overview

This application extends the functionality of the existing GSAPS website (https://gsaps.org) by providing a modern, responsive interface for social interactions among members. It leverages the WordPress REST API and BuddyBoss functionalities to create a seamless experience.

## Features

- **User Authentication:** Secure login and registration with WordPress credentials
- **Activity Feed:** Real-time updates of community activities
- **Messaging System:** Private conversations between members
- **Member Directory:** Discover and connect with other members
- **Groups:** Join and participate in topic-based communities
- **Events:** Discover, attend, and create events
- **Profiles:** Customizable member profiles with research interests and publications
- **Responsive Design:** Works on mobile, tablet, and desktop devices

## Technology Stack

- **Frontend:** React.js with Material UI
- **State Management:** React Context API
- **Authentication:** JWT tokens with WordPress
- **API Integration:** Axios for RESTful API calls
- **Routing:** React Router for navigational components

## Getting Started

### Prerequisites

- Node.js (v14 or higher) and npm installed
- Access to WordPress REST API credentials
- BuddyBoss platform installed on WordPress site

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mysterium-coniunctionis/gsaps-social-media-app.git
   cd gsaps-social-media-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your API configuration:
   ```
   REACT_APP_API_URL=https://gsaps.org/wp-json
   REACT_APP_JWT_AUTH_PATH=/jwt-auth/v1/token
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
gsaps-social-media-app/
├── public/               # Static files
├── src/                  # Source code
│   ├── api/              # API integration services
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Shared components
│   │   ├── layout/       # Layout components
│   │   ├── form/         # Form components
│   │   └── display/      # Display components
│   ├── context/          # React Context for state management
│   ├── pages/            # Main page components
│   ├── theme/            # Theme configuration
│   └── App.js            # App component with routing
├── .env                  # Environment variables
└── package.json          # Dependencies and scripts
```

## API Integration

This app integrates with the following WordPress/BuddyBoss API endpoints:

- Authentication: `/jwt-auth/v1/token`
- Users: `/wp/v2/users`
- BuddyBoss Members: `/buddyboss/v1/members`
- BuddyBoss Groups: `/buddyboss/v1/groups`
- BuddyBoss Activity: `/buddyboss/v1/activity`
- BuddyBoss Messages: `/buddyboss/v1/messages`
- The Events Calendar: `/tribe/events/v1/events`

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deployment Options

1. **WordPress Integration:**
   - The build can be integrated directly into your WordPress theme
   - Use a subdirectory or subdomain for the React app

2. **Standalone Hosting:**
   - Deploy to Netlify, Vercel, or GitHub Pages
   - Configure proper CORS settings on your WordPress site

3. **GitHub Actions:**
   - Automatic deployment workflow included in `.github/workflows/deploy.yml`
   - Configure secrets in your GitHub repository settings

## WordPress Requirements

- WordPress 5.7+
- BuddyBoss Platform 2.0+
- JWT Authentication plugin
- CORS enabled for your hosting domain

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- BuddyBoss for their WordPress social networking platform
- The Material UI team for their excellent React component library
- GSAPS community for feedback and testing
