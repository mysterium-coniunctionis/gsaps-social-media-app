import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Stack,
  Chip,
  Grid,
  Paper,
  Avatar,
  AvatarGroup,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  alpha,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  PanTool as HandIcon,
  ExitToApp as LeaveIcon,
  Share as ShareIcon,
  MoreVert as MoreIcon,
  Settings as SettingsIcon,
  FiberManualRecord as LiveIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import SpeakerStage from '../components/voice/SpeakerStage';
import LiveTranscript from '../components/voice/LiveTranscript';
import RoomChat from '../components/voice/RoomChat';
import { reactionTypes } from '../data/voiceRoomsData';
import {
  getVoiceRoom,
  joinVoiceRoom,
  leaveVoiceRoom,
  toggleHandRaise,
  toggleMute,
  sendReaction,
  sendChatMessage,
  removeFromStage
} from '../api/voiceRoomService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { fadeInUp } from '../theme/animations';

/**
 * VoiceRoom - Individual voice room experience page
 */
const VoiceRoom = () => {
  const theme = useTheme();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const toast = useToast();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [reactionAnimation, setReactionAnimation] = useState(null);

  useEffect(() => {
    loadRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const loadRoom = async () => {
    setLoading(true);
    try {
      const data = await getVoiceRoom(roomId);
      setRoom(data);
    } catch (error) {
      console.error('Failed to load room:', error);
      toast.error('Failed to load voice room');
      navigate('/voice-rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    try {
      const user = {
        id: currentUser?.id || 'current-user',
        username: currentUser?.username || 'user',
        displayName: currentUser?.displayName || 'User',
        avatar: currentUser?.avatar || 'https://i.pravatar.cc/150?img=1'
      };

      await joinVoiceRoom(roomId, user);
      setHasJoined(true);
      toast.success('Joined the room');
      loadRoom();
    } catch (error) {
      console.error('Failed to join room:', error);
      toast.error(error.message || 'Failed to join room');
    }
  };

  const handleLeaveRoom = async (quietly = false) => {
    try {
      await leaveVoiceRoom(roomId, currentUser?.id || 'current-user');
      toast.success(quietly ? 'Left quietly' : 'Left the room');
      navigate('/voice-rooms');
    } catch (error) {
      console.error('Failed to leave room:', error);
      toast.error('Failed to leave room');
    }
  };

  const handleToggleMute = async () => {
    try {
      const newMutedState = !isMuted;
      await toggleMute(roomId, currentUser?.id || 'current-user', newMutedState);
      setIsMuted(newMutedState);
      toast.success(newMutedState ? 'Muted' : 'Unmuted');
    } catch (error) {
      console.error('Failed to toggle mute:', error);
      toast.error('Failed to toggle mute');
    }
  };

  const handleToggleHandRaise = async () => {
    try {
      const newHandState = !handRaised;
      await toggleHandRaise(roomId, currentUser?.id || 'current-user', newHandState);
      setHandRaised(newHandState);
      toast.success(newHandState ? 'Hand raised' : 'Hand lowered');
    } catch (error) {
      console.error('Failed to toggle hand raise:', error);
      toast.error('Failed to toggle hand raise');
    }
  };

  const handleReaction = async (reactionType) => {
    try {
      await sendReaction(roomId, reactionType);
      setReactionAnimation(reactionType);
      setTimeout(() => setReactionAnimation(null), 2000);
    } catch (error) {
      console.error('Failed to send reaction:', error);
    }
  };

  const handleSendMessage = async (messageData) => {
    try {
      const message = {
        userId: currentUser?.id || 'current-user',
        username: currentUser?.username || 'user',
        text: messageData.text
      };

      await sendChatMessage(roomId, message);
      loadRoom(); // Reload to get new message
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  };

  const handleShareRoom = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Room link copied to clipboard!');
    setMenuAnchor(null);
  };

  const handleRemoveSpeaker = async (speakerId) => {
    try {
      await removeFromStage(roomId, speakerId);
      toast.success('Speaker removed from stage');
      loadRoom();
    } catch (error) {
      console.error('Failed to remove speaker:', error);
      toast.error('Failed to remove speaker');
    }
  };

  const isHost = room?.host?.id === (currentUser?.id || 'current-user');
  const isOnStage = room?.speakers?.some(
    (s) => s.id === (currentUser?.id || 'current-user')
  );

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Loading room...
        </Typography>
      </Box>
    );
  }

  if (!room) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background gradient */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at top, ${alpha(
            theme.palette.primary.main,
            0.15
          )} 0%, transparent 50%)`,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Reaction animations */}
      {reactionAnimation && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '8rem',
            zIndex: 9999,
            animation: 'reactionPop 2s ease-out forwards',
            pointerEvents: 'none',
            '@keyframes reactionPop': {
              '0%': {
                opacity: 0,
                transform: 'translate(-50%, -50%) scale(0)'
              },
              '50%': {
                opacity: 1,
                transform: 'translate(-50%, -50%) scale(1.2)'
              },
              '100%': {
                opacity: 0,
                transform: 'translate(-50%, -150%) scale(0.8)'
              }
            }
          }}
        >
          {reactionTypes.find((r) => r.type === reactionAnimation)?.emoji}
        </Box>
      )}

      <Container maxWidth="xl" sx={{ py: 3, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            bgcolor: alpha(theme.palette.background.paper, 0.6),
            backdropFilter: 'blur(20px)',
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            animation: `${fadeInUp} 0.5s ease-out`
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                {room.status === 'live' && (
                  <Chip
                    icon={<LiveIcon />}
                    label="LIVE"
                    size="small"
                    sx={{
                      bgcolor: alpha(theme.palette.error.main, 0.1),
                      color: 'error.main',
                      fontWeight: 700,
                      '& .MuiChip-icon': {
                        color: 'error.main',
                        animation: 'pulse 2s infinite'
                      }
                    }}
                  />
                )}
                <Chip label={room.category} size="small" color="primary" />
                {room.isRecording && (
                  <Chip
                    label="Recording"
                    size="small"
                    sx={{
                      bgcolor: alpha(theme.palette.error.main, 0.1),
                      color: 'error.main'
                    }}
                  />
                )}
              </Stack>

              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {room.title}
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {room.description}
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    Hosted by
                  </Typography>
                  <Avatar
                    src={room.host?.avatar}
                    alt={room.host?.displayName}
                    sx={{ width: 24, height: 24 }}
                  />
                  <Typography variant="body2" fontWeight="bold">
                    {room.host?.displayName}
                  </Typography>
                </Box>

                <Divider orientation="vertical" flexItem />

                <Typography variant="body2" color="text.secondary">
                  {room.listenerCount} listening
                </Typography>

                {room.startedAt && (
                  <>
                    <Divider orientation="vertical" flexItem />
                    <Typography variant="body2" color="text.secondary">
                      Started{' '}
                      {formatDistanceToNow(new Date(room.startedAt), {
                        addSuffix: true
                      })}
                    </Typography>
                  </>
                )}
              </Stack>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={handleShareRoom}>
                <ShareIcon />
              </IconButton>
              <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Left Column - Stage & Audience */}
          <Grid item xs={12} md={showTranscript || showChat ? 8 : 12}>
            <Stack spacing={3}>
              {/* Speaker Stage */}
              <Box sx={{ animation: `${fadeInUp} 0.5s ease-out 0.1s backwards` }}>
                <SpeakerStage
                  speakers={room.speakers}
                  currentUserId={currentUser?.id || 'current-user'}
                  isHost={isHost}
                  onRemoveSpeaker={handleRemoveSpeaker}
                />
              </Box>

              {/* Audience Section */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: alpha(theme.palette.background.paper, 0.4),
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  animation: `${fadeInUp} 0.5s ease-out 0.2s backwards`
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Audience
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {room.listenerCount} listeners
                </Typography>

                <AvatarGroup
                  max={20}
                  sx={{
                    '& .MuiAvatar-root': {
                      width: 40,
                      height: 40,
                      border: `2px solid ${theme.palette.background.paper}`
                    }
                  }}
                >
                  {room.listeners?.map((listener) => (
                    <Tooltip
                      key={listener.id}
                      title={
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {listener.displayName}
                          </Typography>
                          {listener.handRaised && (
                            <Typography variant="caption">Hand raised</Typography>
                          )}
                        </Box>
                      }
                    >
                      <Avatar
                        src={listener.avatar}
                        alt={listener.displayName}
                        sx={{
                          border: listener.handRaised
                            ? `3px solid ${theme.palette.warning.main} !important`
                            : undefined
                        }}
                      />
                    </Tooltip>
                  ))}
                </AvatarGroup>
              </Paper>

              {/* Reactions */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: alpha(theme.palette.background.paper, 0.4),
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  animation: `${fadeInUp} 0.5s ease-out 0.3s backwards`
                }}
              >
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {reactionTypes.map((reaction) => (
                    <Button
                      key={reaction.type}
                      onClick={() => handleReaction(reaction.type)}
                      sx={{
                        fontSize: '1.5rem',
                        minWidth: 48,
                        height: 48,
                        borderRadius: 3,
                        '&:hover': {
                          transform: 'scale(1.2)',
                          bgcolor: alpha(theme.palette.primary.main, 0.1)
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {reaction.emoji}
                    </Button>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          {/* Right Column - Transcript & Chat */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {showTranscript && (
                <Box sx={{ animation: `${fadeInUp} 0.5s ease-out 0.4s backwards` }}>
                  <LiveTranscript
                    transcript={room.transcript || []}
                    isLive={room.status === 'live'}
                    onCopy={() => toast.success('Transcript copied!')}
                  />
                </Box>
              )}

              {showChat && (
                <Box sx={{ animation: `${fadeInUp} 0.5s ease-out 0.5s backwards` }}>
                  <RoomChat
                    messages={room.chatMessages || []}
                    currentUserId={currentUser?.id || 'current-user'}
                    onSendMessage={handleSendMessage}
                  />
                </Box>
              )}
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Controls */}
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            bgcolor: alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(20px)',
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            zIndex: 1000
          }}
        >
          <Container maxWidth="xl">
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              {!hasJoined ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleJoinRoom}
                  sx={{ px: 6 }}
                >
                  Join Room
                </Button>
              ) : (
                <>
                  {isOnStage && (
                    <Tooltip title={isMuted ? 'Unmute' : 'Mute'}>
                      <IconButton
                        onClick={handleToggleMute}
                        sx={{
                          width: 56,
                          height: 56,
                          bgcolor: isMuted ? 'error.main' : 'success.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: isMuted ? 'error.dark' : 'success.dark'
                          }
                        }}
                      >
                        {isMuted ? <MicOffIcon /> : <MicIcon />}
                      </IconButton>
                    </Tooltip>
                  )}

                  {!isOnStage && room.allowHandRaise && (
                    <Tooltip title={handRaised ? 'Lower hand' : 'Raise hand'}>
                      <IconButton
                        onClick={handleToggleHandRaise}
                        sx={{
                          width: 56,
                          height: 56,
                          bgcolor: handRaised ? 'warning.main' : 'action.hover',
                          color: handRaised ? 'white' : 'text.primary',
                          '&:hover': {
                            bgcolor: handRaised ? 'warning.dark' : 'action.selected'
                          }
                        }}
                      >
                        <HandIcon />
                      </IconButton>
                    </Tooltip>
                  )}

                  <Button
                    variant="outlined"
                    startIcon={<LeaveIcon />}
                    onClick={() => setLeaveDialogOpen(true)}
                    sx={{ px: 4 }}
                  >
                    Leave
                  </Button>
                </>
              )}
            </Stack>
          </Container>
        </Paper>
      </Container>

      {/* Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={handleShareRoom}>
          <ShareIcon sx={{ mr: 1 }} /> Share Room
        </MenuItem>
        <MenuItem onClick={() => setShowTranscript(!showTranscript)}>
          {showTranscript ? 'Hide' : 'Show'} Transcript
        </MenuItem>
        <MenuItem onClick={() => setShowChat(!showChat)}>
          {showChat ? 'Hide' : 'Show'} Chat
        </MenuItem>
        {isHost && (
          <MenuItem onClick={() => setMenuAnchor(null)}>
            <SettingsIcon sx={{ mr: 1 }} /> Room Settings
          </MenuItem>
        )}
      </Menu>

      {/* Leave Dialog */}
      <Dialog open={leaveDialogOpen} onClose={() => setLeaveDialogOpen(false)}>
        <DialogTitle>Leave Voice Room?</DialogTitle>
        <DialogContent>
          <Typography>How would you like to leave?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLeaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => handleLeaveRoom(true)} color="inherit">
            Leave Quietly
          </Button>
          <Button onClick={() => handleLeaveRoom(false)} variant="contained">
            Leave Room
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VoiceRoom;
