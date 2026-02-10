// VirtualSpace.js - Individual 3D space experience
// Immersive environment with avatars, spatial audio, and interactions

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Alert,
  CircularProgress,
  Typography,
  Snackbar
} from '@mui/material';
import Space3D from '../components/xr/Space3D';
import { AvatarGroup } from '../components/xr/Avatar3D';
import { ScreenGallery } from '../components/xr/VirtualScreen';
import {
  ControlHUD,
  UserListPanel,
  MinimapPanel,
  SettingsPanel,
  WelcomeOverlay
} from '../components/xr/SpatialUI';
import {
  getSpaceById,
  joinSpace,
  leaveSpace,
  updateSpeakingState,
  teleportToPoint,
  initializeVoiceChat
} from '../api/virtualSpaceService';
import { useAuth } from '../context/AuthContext';

const VirtualSpace = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentUser } = useAuth();

  // State
  const [spaceData, setSpaceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState([0, 0, 15]);

  // UI State
  const [showUserList, setShowUserList] = useState(false);
  const [showMinimap, setShowMinimap] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // Settings
  const [settings, setSettings] = useState({
    micEnabled: false,
    spatialAudio: true,
    quality: 'medium',
    showAvatarCustomization: false
  });

  // Mode
  const viewMode = searchParams.get('mode') || 'desktop';
  const isVRMode = viewMode === 'vr';

  // Refs
  const userSessionRef = useRef(null);

  // Load space data and join
  useEffect(() => {
    if (!currentUser) {
      setError('Please sign in to enter virtual spaces');
      setLoading(false);
      return;
    }

    loadAndJoinSpace();

    return () => {
      // Cleanup - leave space
      if (userSessionRef.current) {
        leaveSpace(spaceId, currentUser.id);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spaceId, currentUser]);

  const loadAndJoinSpace = async () => {
    setLoading(true);
    try {
      // Get space data
      const spaceResult = await getSpaceById(spaceId);
      if (!spaceResult.success) {
        setError(spaceResult.error || 'Space not found');
        setLoading(false);
        return;
      }

      setSpaceData(spaceResult.data);

      // Join space
      const joinResult = await joinSpace(spaceId, currentUser.id, {
        name: currentUser.displayName || currentUser.email,
        avatar: {
          style: 'default',
          color: '#2196F3'
        }
      });

      if (!joinResult.success) {
        setError(joinResult.error || 'Failed to join space');
        setLoading(false);
        return;
      }

      userSessionRef.current = joinResult.data.userSession;
      setActiveUsers(joinResult.data.activeUsers);
      setCurrentPosition(spaceResult.data.spawnPoint || [0, 0, 15]);

      // Initialize voice chat
      if (settings.micEnabled) {
        await initializeVoiceChat(spaceId, currentUser.id);
      }

      setLoading(false);
      showNotification(`Entered ${spaceResult.data.name}`);
    } catch (err) {
      console.error('Error loading space:', err);
      setError('Failed to load virtual space');
      setLoading(false);
    }
  };

  // Handle teleport
  const handleTeleport = async (pointName) => {
    if (!currentUser) return;

    const result = await teleportToPoint(spaceId, currentUser.id, pointName);
    if (result.success) {
      setCurrentPosition(result.data.position);
      showNotification(`Teleported to ${pointName}`);
      setShowMinimap(false);
    }
  };

  // Toggle microphone
  const handleToggleMic = async () => {
    const newMicState = !settings.micEnabled;
    setSettings(prev => ({ ...prev, micEnabled: newMicState }));

    if (currentUser) {
      await updateSpeakingState(spaceId, currentUser.id, false);

      if (newMicState) {
        await initializeVoiceChat(spaceId, currentUser.id);
        showNotification('Microphone enabled');
      } else {
        showNotification('Microphone disabled');
      }
    }
  };

  // Handle setting changes
  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));

    if (key === 'quality') {
      showNotification(`Graphics quality set to ${value}`);
    }
  };

  // Leave space
  const handleLeaveSpace = async () => {
    if (currentUser) {
      await leaveSpace(spaceId, currentUser.id);
    }
    navigate('/virtual-spaces');
  };

  // Show notification
  const showNotification = (message) => {
    setSnackbar({ open: true, message });
  };

  // Get screens for this space
  const getSpaceScreens = () => {
    if (!spaceData) return [];

    const screens = [];

    // Add screens from space objects
    spaceData.objects?.forEach((obj, index) => {
      if (obj.type === 'screen') {
        screens.push({
          id: `screen-${index}`,
          position: obj.position,
          rotation: obj.rotation || [0, 0, 0],
          scale: obj.scale,
          contentType: 'placeholder',
          content: {
            message: spaceData.type === 'symposium' ? 'Presentation Screen' : 'Shared Screen'
          },
          showFrame: true,
          isActive: false
        });
      }

      if (obj.type === 'poster' && obj.content) {
        screens.push({
          id: `poster-${index}`,
          position: obj.position,
          rotation: obj.rotation || [0, 0, 0],
          scale: obj.scale,
          contentType: 'poster',
          content: {
            title: 'Research Poster',
            authors: 'Graduate Student Research',
            abstract: 'This is a research poster in the virtual gallery. Click to view details.',
            methods: 'Study methodology and approach...',
            results: 'Key findings and data...',
            conclusions: 'Conclusions and future directions...'
          },
          showFrame: true,
          isActive: false
        });
      }
    });

    return screens;
  };

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: '#0a0a1a'
        }}
      >
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" sx={{ color: 'white' }}>
          Loading virtual space...
        </Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: '#0a0a1a',
          p: 4
        }}
      >
        <Alert severity="error" sx={{ mb: 2, maxWidth: 500 }}>
          {error}
        </Alert>
        <Typography
          variant="body1"
          sx={{ color: 'white', mb: 2, textAlign: 'center' }}
        >
          Unable to load the virtual space. Please try again or return to the spaces gallery.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '4px',
              background: '#2196F3',
              color: 'white'
            }}
          >
            Retry
          </button>
          <button
            onClick={() => navigate('/virtual-spaces')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              border: '1px solid #2196F3',
              borderRadius: '4px',
              background: 'transparent',
              color: 'white'
            }}
          >
            Back to Spaces
          </button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden', bgcolor: '#0a0a1a' }}>
      {/* 3D Space */}
      <Space3D
        spaceData={spaceData}
        cameraPosition={currentPosition}
        enableControls={true}
        performanceProfile={settings.quality}
      >
        {/* Avatars */}
        <AvatarGroup
          avatars={activeUsers}
          currentUserId={currentUser?.id}
        />

        {/* Screens */}
        <ScreenGallery screens={getSpaceScreens()} />

        {/* Spatial UI Elements */}
        <WelcomeOverlay
          spaceName={spaceData?.name}
          visible={showWelcome}
          onDismiss={() => setShowWelcome(false)}
        />

        <UserListPanel
          position={[-8, 3, 0]}
          users={activeUsers}
          currentUserId={currentUser?.id}
          visible={showUserList}
          onClose={() => setShowUserList(false)}
        />

        <MinimapPanel
          position={[8, 3, 0]}
          spaceData={spaceData}
          currentPosition={currentPosition}
          avatars={activeUsers}
          navigationPoints={spaceData?.navigationPoints || []}
          onTeleport={handleTeleport}
          visible={showMinimap}
          onClose={() => setShowMinimap(false)}
        />

        <SettingsPanel
          position={[0, 3, 8]}
          settings={settings}
          onSettingChange={handleSettingChange}
          visible={showSettings}
          onClose={() => setShowSettings(false)}
        />

        {/* Control HUD */}
        <ControlHUD
          onToggleUserList={() => setShowUserList(!showUserList)}
          onToggleMinimap={() => setShowMinimap(!showMinimap)}
          onToggleSettings={() => setShowSettings(!showSettings)}
          onLeaveSpace={handleLeaveSpace}
          micEnabled={settings.micEnabled}
          onToggleMic={handleToggleMic}
        />
      </Space3D>

      {/* VR Mode Indicator */}
      {isVRMode && (
        <Box
          sx={{
            position: 'fixed',
            top: 20,
            right: 20,
            bgcolor: 'rgba(33, 150, 243, 0.9)',
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: 1,
            zIndex: 1001,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            VR Mode Active
          </Typography>
        </Box>
      )}

      {/* Snackbar notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '' })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
};

export default VirtualSpace;
