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

function App() {
  const { currentUser } = useAuth();
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <XPNotification />

      <Box component="main" sx={{ flexGrow: 1, py: 2, mt: 8, mb: { xs: 7, sm: 0 } }}>
        <Container maxWidth="lg">
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

            <Route path="/courses/:courseId/learn" element={
              <ProtectedRoute>
                <CoursePlayer />
              </ProtectedRoute>
            } />

            <Route path="/leaderboard" element={<Leaderboard />} />

            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />

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
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Box>
      
      {currentUser && <BottomNavigation />}
    </Box>
  );
}

export default App;