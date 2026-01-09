// SpatialUI.js - 3D interface elements for virtual spaces
// Floating menus, tooltips, minimap, user lists, and settings panels

import React, { useState, useRef } from 'react';
import { Html, Billboard, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Button,
  Divider,
  Paper
} from '@mui/material';
import {
  Close as CloseIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  Settings as SettingsIcon,
  Map as MapIcon,
  People as PeopleIcon,
  ExitToApp as ExitIcon
} from '@mui/icons-material';

/**
 * Floating Menu Panel
 */
export const FloatingMenu = ({
  position = [0, 3, 0],
  title = 'Menu',
  children,
  onClose,
  visible = true,
  width = 300
}) => {
  if (!visible) return null;

  return (
    <Billboard position={position} follow={true}>
      <Html
        transform
        distanceFactor={5}
        style={{
          width: `${width}px`,
          pointerEvents: 'auto'
        }}
      >
        <Paper
          elevation={8}
          sx={{
            background: 'rgba(26, 26, 46, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            border: '1px solid rgba(33, 150, 243, 0.3)',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1.5,
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              {title}
            </Typography>
            {onClose && (
              <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          <Box sx={{ p: 2 }}>
            {children}
          </Box>
        </Paper>
      </Html>
    </Billboard>
  );
};

/**
 * User List Panel
 */
export const UserListPanel = ({
  position = [-5, 3, 0],
  users = [],
  currentUserId,
  visible = true,
  onClose
}) => {
  if (!visible) return null;

  const getPresenceColor = (state) => {
    const colors = {
      available: '#4CAF50',
      busy: '#F44336',
      away: '#FFC107',
      presenting: '#2196F3'
    };
    return colors[state] || colors.available;
  };

  return (
    <FloatingMenu
      position={position}
      title={`Users (${users.length})`}
      onClose={onClose}
      visible={visible}
      width={320}
    >
      <List sx={{ maxHeight: 400, overflow: 'auto', p: 0 }}>
        {users.map((user) => (
          <ListItem
            key={user.userId}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              bgcolor: user.userId === currentUserId ? 'rgba(33, 150, 243, 0.2)' : 'transparent'
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: user.avatar?.color || '#2196F3',
                  border: `2px solid ${getPresenceColor(user.presenceState)}`
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography sx={{ color: 'white', fontWeight: user.userId === currentUserId ? 'bold' : 'normal' }}>
                  {user.name} {user.userId === currentUserId && '(You)'}
                </Typography>
              }
              secondary={
                <Chip
                  label={user.presenceState}
                  size="small"
                  sx={{
                    bgcolor: getPresenceColor(user.presenceState),
                    color: 'white',
                    height: 20,
                    fontSize: '0.7rem',
                    mt: 0.5
                  }}
                />
              }
            />
            {user.isSpeaking && (
              <MicIcon sx={{ color: '#4CAF50', ml: 1, animation: 'pulse 1s infinite' }} />
            )}
          </ListItem>
        ))}
      </List>
    </FloatingMenu>
  );
};

/**
 * Minimap Navigation
 */
export const MinimapPanel = ({
  position = [5, 3, 0],
  spaceData,
  currentPosition = [0, 0, 0],
  avatars = [],
  navigationPoints = [],
  onTeleport,
  visible = true,
  onClose
}) => {
  if (!visible) return null;

  const mapSize = 200;
  const scale = 5; // Scale factor for coordinates

  return (
    <FloatingMenu
      position={position}
      title="Navigation"
      onClose={onClose}
      visible={visible}
      width={280}
    >
      <Box
        sx={{
          width: mapSize,
          height: mapSize,
          bgcolor: '#0a0a1a',
          border: '2px solid rgba(33, 150, 243, 0.5)',
          borderRadius: 1,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Grid background */}
        <svg width={mapSize} height={mapSize} style={{ position: 'absolute' }}>
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(33, 150, 243, 0.2)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width={mapSize} height={mapSize} fill="url(#grid)" />
        </svg>

        {/* Navigation points */}
        {navigationPoints.map((point, index) => (
          <Box
            key={index}
            onClick={() => onTeleport && onTeleport(point.name)}
            sx={{
              position: 'absolute',
              left: mapSize / 2 + point.position[0] * scale,
              top: mapSize / 2 - point.position[2] * scale,
              width: 8,
              height: 8,
              bgcolor: '#FFC107',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              '&:hover': {
                width: 12,
                height: 12,
                boxShadow: '0 0 10px #FFC107'
              }
            }}
            title={point.name}
          />
        ))}

        {/* Other avatars */}
        {avatars.map((avatar) => (
          <Box
            key={avatar.userId}
            sx={{
              position: 'absolute',
              left: mapSize / 2 + (avatar.position[0] || 0) * scale,
              top: mapSize / 2 - (avatar.position[2] || 0) * scale,
              width: 6,
              height: 6,
              bgcolor: avatar.avatar?.color || '#2196F3',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              border: '1px solid white'
            }}
          />
        ))}

        {/* Current position */}
        <Box
          sx={{
            position: 'absolute',
            left: mapSize / 2 + currentPosition[0] * scale,
            top: mapSize / 2 - currentPosition[2] * scale,
            width: 10,
            height: 10,
            bgcolor: '#4CAF50',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            border: '2px solid white',
            boxShadow: '0 0 10px #4CAF50'
          }}
        />
      </Box>

      {/* Teleport buttons */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1, display: 'block' }}>
          Quick Teleport:
        </Typography>
        {navigationPoints.slice(0, 4).map((point, index) => (
          <Button
            key={index}
            size="small"
            variant="outlined"
            onClick={() => onTeleport && onTeleport(point.name)}
            sx={{
              color: 'white',
              borderColor: 'rgba(33, 150, 243, 0.5)',
              mr: 0.5,
              mb: 0.5,
              fontSize: '0.7rem'
            }}
          >
            {point.name}
          </Button>
        ))}
      </Box>
    </FloatingMenu>
  );
};

/**
 * Settings Panel
 */
export const SettingsPanel = ({
  position = [0, 3, 5],
  settings = {},
  onSettingChange,
  visible = true,
  onClose
}) => {
  if (!visible) return null;

  return (
    <FloatingMenu
      position={position}
      title="Settings"
      onClose={onClose}
      visible={visible}
      width={300}
    >
      <Box>
        {/* Audio settings */}
        <Typography variant="subtitle2" sx={{ color: 'white', mb: 1 }}>
          Audio
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Button
            variant={settings.micEnabled ? 'contained' : 'outlined'}
            startIcon={settings.micEnabled ? <MicIcon /> : <MicOffIcon />}
            onClick={() => onSettingChange && onSettingChange('micEnabled', !settings.micEnabled)}
            fullWidth
            sx={{ mb: 1 }}
          >
            {settings.micEnabled ? 'Microphone On' : 'Microphone Off'}
          </Button>
          <Button
            variant={settings.spatialAudio ? 'contained' : 'outlined'}
            onClick={() => onSettingChange && onSettingChange('spatialAudio', !settings.spatialAudio)}
            fullWidth
          >
            Spatial Audio: {settings.spatialAudio ? 'On' : 'Off'}
          </Button>
        </Box>

        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />

        {/* Graphics settings */}
        <Typography variant="subtitle2" sx={{ color: 'white', mb: 1 }}>
          Graphics Quality
        </Typography>
        <Box sx={{ mb: 2 }}>
          {['low', 'medium', 'high'].map((quality) => (
            <Button
              key={quality}
              variant={settings.quality === quality ? 'contained' : 'outlined'}
              onClick={() => onSettingChange && onSettingChange('quality', quality)}
              sx={{ mr: 0.5, mb: 0.5 }}
            >
              {quality.charAt(0).toUpperCase() + quality.slice(1)}
            </Button>
          ))}
        </Box>

        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />

        {/* Avatar settings */}
        <Typography variant="subtitle2" sx={{ color: 'white', mb: 1 }}>
          Avatar
        </Typography>
        <Box>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => onSettingChange && onSettingChange('showAvatarCustomization', true)}
          >
            Customize Avatar
          </Button>
        </Box>
      </Box>
    </FloatingMenu>
  );
};

/**
 * Tooltip attached to objects
 */
export const Tooltip = ({
  position = [0, 2, 0],
  text = '',
  visible = true
}) => {
  if (!visible || !text) return null;

  return (
    <Billboard position={position} follow={true}>
      <Html transform distanceFactor={3}>
        <Paper
          elevation={4}
          sx={{
            bgcolor: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
          }}
        >
          {text}
        </Paper>
      </Html>
    </Billboard>
  );
};

/**
 * Control HUD - Fixed overlay controls
 */
export const ControlHUD = ({
  onToggleUserList,
  onToggleMinimap,
  onToggleSettings,
  onLeaveSpace,
  micEnabled = false,
  onToggleMic
}) => {
  return (
    <Html fullscreen>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 1000,
          pointerEvents: 'auto'
        }}
      >
        <Paper
          elevation={8}
          sx={{
            display: 'flex',
            gap: 1,
            p: 1,
            bgcolor: 'rgba(26, 26, 46, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2
          }}
        >
          <IconButton
            onClick={onToggleMic}
            sx={{
              bgcolor: micEnabled ? '#4CAF50' : 'rgba(244, 67, 54, 0.8)',
              color: 'white',
              '&:hover': {
                bgcolor: micEnabled ? '#45a049' : 'rgba(244, 67, 54, 1)'
              }
            }}
          >
            {micEnabled ? <MicIcon /> : <MicOffIcon />}
          </IconButton>

          <IconButton
            onClick={onToggleUserList}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.3)' } }}
          >
            <PeopleIcon />
          </IconButton>

          <IconButton
            onClick={onToggleMinimap}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.3)' } }}
          >
            <MapIcon />
          </IconButton>

          <IconButton
            onClick={onToggleSettings}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.3)' } }}
          >
            <SettingsIcon />
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mx: 0.5 }} />

          <IconButton
            onClick={onLeaveSpace}
            sx={{
              color: 'white',
              '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.3)' }
            }}
          >
            <ExitIcon />
          </IconButton>
        </Paper>
      </Box>
    </Html>
  );
};

/**
 * Welcome message overlay
 */
export const WelcomeOverlay = ({ spaceName, visible = true, onDismiss }) => {
  if (!visible) return null;

  return (
    <Html fullscreen>
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          pointerEvents: 'auto'
        }}
      >
        <Paper
          elevation={8}
          sx={{
            bgcolor: 'rgba(26, 26, 46, 0.95)',
            backdropFilter: 'blur(10px)',
            p: 2,
            borderRadius: 2,
            maxWidth: 400,
            border: '1px solid rgba(33, 150, 243, 0.3)'
          }}
        >
          <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
            Welcome to {spaceName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
            Use WASD or arrow keys to move. Click and drag to look around. Use controls at the bottom to access features.
          </Typography>
          <Button
            variant="contained"
            onClick={onDismiss}
            fullWidth
          >
            Got it
          </Button>
        </Paper>
      </Box>
    </Html>
  );
};

export default {
  FloatingMenu,
  UserListPanel,
  MinimapPanel,
  SettingsPanel,
  Tooltip,
  ControlHUD,
  WelcomeOverlay
};
