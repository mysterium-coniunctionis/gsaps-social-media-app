import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { useAuth } from './context/AuthContext';
import { useAccessibility } from './context/AccessibilityContext';

// Components
import Navbar from './components/layout/Navbar';
import BottomNavigation from './components/layout/BottomNavigation';
import LoadingSpinner from './components/common/LoadingSpinner';
import XPNotification from './components/gamification/XPNotification';
import ErrorBoundary from './components/common/ErrorBoundary';
import CrisisButton from './components/crisis/CrisisButton';

// Eagerly loaded pages (critical for initial load)
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Lazily loaded pages (code splitting for performance)
const Feed = lazy(() => import('./pages/Feed'));
const PasswordReset = lazy(() => import('./pages/PasswordReset'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Members = lazy(() => import('./pages/Members'));
const Groups = lazy(() => import('./pages/Groups'));
const GroupDetail = lazy(() => import('./pages/GroupDetail'));
const Events = lazy(() => import('./pages/Events'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const Messages = lazy(() => import('./pages/Messages'));
const Conversation = lazy(() => import('./pages/Conversation'));
const ResearchLibrary = lazy(() => import('./pages/library/ResearchLibrary'));
const PaperDetail = lazy(() => import('./pages/library/PaperDetail'));
const ResearchWorkspace = lazy(() => import('./pages/workspaces/ResearchWorkspace'));
const SymposiumRoom = lazy(() => import('./pages/workspaces/SymposiumRoom'));
const Courses = lazy(() => import('./pages/courses/Courses'));
const CourseDetail = lazy(() => import('./pages/courses/CourseDetail'));
const CoursePlayer = lazy(() => import('./pages/courses/CoursePlayer'));
const SubscriptionBilling = lazy(() => import('./pages/billing/SubscriptionBilling'));
const OrgReporting = lazy(() => import('./pages/admin/OrgReporting'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Settings = lazy(() => import('./pages/Settings'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const IntegrationCircles = lazy(() => import('./pages/IntegrationCircles'));
const CircleDetail = lazy(() => import('./pages/CircleDetail'));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

const RoleProtectedRoute = ({ children, roles }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { currentUser } = useAuth();
  const { preferences } = useAccessibility();

  return (
    <ErrorBoundary>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Navbar />
        <XPNotification />

      <Box
        component="main"
        id="main-content"
        role="main"
        aria-live="polite"
        data-reduced-motion={preferences.reduceMotion}
        sx={{ flexGrow: 1, mt: 8, mb: { xs: 7, sm: 0 } }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
          {/* Full-width routes (Messages, Conversation, CoursePlayer) */}
          <Route path="/messages" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } />

          <Route path="/messages/:conversationId" element={
            <ProtectedRoute>
              <Conversation />
            </ProtectedRoute>
          } />

          <Route path="/courses/:courseId/learn" element={
            <ProtectedRoute>
              <CoursePlayer />
            </ProtectedRoute>
          } />

          {/* Container-wrapped routes (standard pages) */}
          <Route path="*" element={
            <Container maxWidth="lg" sx={{ py: 2 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/feed" element={
                  <ProtectedRoute>
                    <Feed />
                  </ProtectedRoute>
                } />

                <Route path="/login" element={
                  currentUser ? <Navigate to="/" /> : <Login />
                } />

                <Route path="/register" element={
                  currentUser ? <Navigate to="/" /> : <Register />
                } />

                <Route path="/reset" element={<PasswordReset />} />
                <Route path="/verify" element={<VerifyEmail />} />

                <Route path="/profile/:username" element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } />

                <Route path="/members" element={
                  <ProtectedRoute>
                    <Members />
                  </ProtectedRoute>
                } />

                <Route path="/groups" element={
                  <ProtectedRoute>
                    <Groups />
                  </ProtectedRoute>
                } />

                <Route path="/groups/:groupId" element={
                  <ProtectedRoute>
                    <GroupDetail />
                  </ProtectedRoute>
                } />

                <Route path="/events" element={<Events />} />

                <Route path="/events/:eventId" element={<EventDetail />} />

                <Route path="/library" element={<ResearchLibrary />} />

                <Route path="/library/:paperId" element={<PaperDetail />} />

                <Route
                  path="/workspaces"
                  element={
                    <ProtectedRoute>
                      <ResearchWorkspace />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/symposia/:roomId"
                  element={
                    <ProtectedRoute>
                      <SymposiumRoom />
                    </ProtectedRoute>
                  }
                />

                <Route path="/courses" element={<Courses />} />

                <Route path="/courses/:courseId" element={<CourseDetail />} />

                <Route path="/billing" element={
                  <ProtectedRoute>
                    <SubscriptionBilling />
                  </ProtectedRoute>
                } />

                <Route path="/admin/reporting" element={
                  <ProtectedRoute>
                    <OrgReporting />
                  </ProtectedRoute>
                } />

                <Route path="/leaderboard" element={<Leaderboard />} />

                <Route path="/circles" element={<IntegrationCircles />} />

                <Route path="/circles/:circleId" element={
                  <ProtectedRoute>
                    <CircleDetail />
                  </ProtectedRoute>
                } />

                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />

                <Route path="/admin/moderation" element={
                  <RoleProtectedRoute roles={['administrator', 'moderator']}>
                    <AdminDashboard />
                  </RoleProtectedRoute>
                } />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
          } />
          </Routes>
        </Suspense>
      </Box>

      {currentUser && <BottomNavigation />}
      <CrisisButton />
      </Box>
    </ErrorBoundary>
  );
}

export default App;
