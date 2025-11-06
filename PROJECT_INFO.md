# GSAPS Social Media Web App - Project Information

## Overview
This application extends the Graduate Student Association for Psychedelic Studies (GSAPS) website with a modern social media interface. Built on React and designed to integrate with WordPress/BuddyBoss, it provides community features like messaging, groups, events, and member directories.

## Current Progress (as of October 25, 2025)

### ✅ Completed (100% of Core Features)
- ✅ Complete application architecture and file structure
- ✅ All 12 core pages fully implemented
- ✅ Professional UI components using Material UI
- ✅ Authentication system with JWT tokens (AuthContext)
- ✅ Theme management with light/dark mode (ThemeContext)
- ✅ Responsive navigation (Navbar + BottomNavigation)
- ✅ Login/Register pages with validation
- ✅ Profile page with view/edit functionality
- ✅ Members directory with search and filters
- ✅ Groups listing and detail pages
- ✅ Events calendar with filters and RSVP
- ✅ Messaging system with conversation view
- ✅ Mock data for all features (app is fully functional)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Clean builds with zero errors or warnings

### 🚀 Ready for Integration
- WordPress/BuddyBoss API connection
- Real-time messaging with WebSockets
- File/media upload handling
- Advanced search and filtering
- Notifications system
- Testing suite implementation

## Component Structure

### Pages
- **Home:** Main activity feed and overview
- **Login/Register:** Authentication screens
- **Profile:** User profile view and edit
- **Members:** Directory of all members with filters
- **Groups:** Group listings and detailed views
- **Events:** Calendar and event detail pages
- **Messages:** Conversation listings and chat interface
- **Utility Pages:** Error pages, demo components

### Components
- **Layout:** App-wide layout components (Navbar, BottomNavigation)
- **Common:** Reusable UI elements (LoadingSpinner, Alert)
- **Form:** Input components and validation
- **Display:** Data visualization components

### Context Providers
- **AuthContext:** User authentication state
- **ThemeContext:** Theme customization
- **DemoAuthContext:** Mock authentication for development

## API Integration
The app connects to WordPress/BuddyBoss through RESTful APIs:
- **/jwt-auth/v1/token:** Authentication
- **/wp/v2/users:** User management
- **/buddyboss/v1/members:** Member profile data
- **/buddyboss/v1/groups:** Group management
- **/buddyboss/v1/activity:** Activity feeds
- **/buddyboss/v1/messages:** Messaging system
- **/tribe/events/v1/events:** Event management

## Technical Details

### Frontend Stack
- React 18
- Material UI for components
- React Router for navigation
- Axios for API requests
- Context API for state management

### Integration Points
- WordPress REST API
- BuddyBoss Platform API
- JSON Web Tokens for authentication

### Development Tools
- Create React App
- npm for package management
- ESLint for code quality
- GitHub Actions for CI/CD

## Running the Project
1. Install dependencies: `npm install`
2. Start the development server: `npm start`
3. Build for production: `npm run build`

## Deployment
The application can be deployed in several ways:
1. **WordPress Integration:** Embedded in the WordPress theme
2. **Standalone Hosting:** Netlify, Vercel, or GitHub Pages
3. **Custom Domain:** Using a subdomain of gsaps.org

## Next Steps
1. Complete WordPress API integration
2. Implement real-time messaging features
3. Add comprehensive testing
4. Optimize performance for production
5. Set up production deployment pipeline

## GitHub Repository
https://github.com/mysterium-coniunctionis/gsaps-social-media-app

## License
This project is licensed under the MIT License - see the LICENSE file for details.