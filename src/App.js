import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { useAuth } from './context/AuthContext';

// Components
import Navbar from './components/layout/Navbar';
import BottomNavigation from './components/layout/BottomNavigation';
import LoadingSpinner from './components/common/LoadingSpinner';
import XPNotification from './components/gamification/XPNotification';

// Pages
import Home from './pages/Home';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Members from './pages/Members';
import Groups from './pages/Groups';
import GroupDetail from './pages/GroupDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Messages from './pages/Messages';
import Conversation from './pages/Conversation';
import ResearchLibrary from './pages/library/ResearchLibrary';
import PaperDetail from './pages/library/PaperDetail';
import Courses from './pages/courses/Courses';
import CourseDetail from './pages/courses/CourseDetail';
import CoursePlayer from './pages/courses/CoursePlayer';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Notifications from './pages/Notifications';

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
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <XPNotification />

      <Box component="main" sx={{ flexGrow: 1, mt: 8, mb: { xs: 7, sm: 0 } }}>
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

                <Route path="/notifications" element={
                  <ProtectedRoute>
                    <Notifications />
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
      </Box>
      
      {currentUser && <BottomNavigation />}
    </Box>
  );
}

export default App;