import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { useAuth } from './context/AuthContext';

// Components
import Navbar from './components/layout/Navbar';
import BottomNavigation from './components/layout/BottomNavigation';
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Members from './pages/Members';
import Groups from './pages/Groups';
import GroupDetail from './pages/GroupDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Messages from './pages/Messages';
import Conversation from './pages/Conversation';
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
      
      <Box component="main" sx={{ flexGrow: 1, py: 2, mt: 8, mb: { xs: 7, sm: 0 } }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/login" element={
              currentUser ? <Navigate to="/" /> : <Login />
            } />
            
            <Route path="/register" element={
              currentUser ? <Navigate to="/" /> : <Register />
            } />
            
            <Route path="/profile/:username" element={
              <ProtectedRoute>
                <Profile />
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