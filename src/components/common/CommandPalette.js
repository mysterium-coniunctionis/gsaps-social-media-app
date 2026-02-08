import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  Typography,
  Box,
  Chip,
  Divider,
  alpha,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  Home as HomeIcon,
  DynamicFeed as FeedIcon,
  Mic as VoiceIcon,
  ViewInAr as VRIcon,
  Hub as NetworkIcon,
  LibraryBooks as LibraryIcon,
  School as CoursesIcon,
  Event as EventIcon,
  Groups as GroupsIcon,
  Message as MessageIcon,
  Settings as SettingsIcon,
  EmojiEvents as LeaderboardIcon,
  Favorite as CirclesIcon,
  Person as ProfileIcon,
  Keyboard as KeyboardIcon,
  AutoAwesome as AriaIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Command Palette - VS Code/Spotlight style quick navigation
 * Triggered by Ctrl+K or Cmd+K
 */
const CommandPalette = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('commandPalette_recent');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // All available commands/navigation items
  const allCommands = useMemo(() => [
    // Navigation
    { id: 'home', label: 'Go to Home', icon: <HomeIcon />, action: () => navigate('/'), category: 'Navigation', keywords: ['home', 'main', 'start'] },
    { id: 'feed', label: 'Go to Feed', icon: <FeedIcon />, action: () => navigate('/feed'), category: 'Navigation', keywords: ['feed', 'posts', 'timeline'] },
    { id: 'voice-rooms', label: 'Go to Voice Rooms', icon: <VoiceIcon />, action: () => navigate('/voice-rooms'), category: 'Navigation', keywords: ['voice', 'audio', 'rooms', 'talk', 'speak'], isNew: true },
    { id: '3d-spaces', label: 'Go to 3D Virtual Spaces', icon: <VRIcon />, action: () => navigate('/virtual-spaces'), category: 'Navigation', keywords: ['3d', 'virtual', 'spaces', 'vr', 'immersive'], isNew: true },
    { id: 'network', label: 'Go to Mentor Network', icon: <NetworkIcon />, action: () => navigate('/network'), category: 'Navigation', keywords: ['network', 'mentor', 'connect', 'match'], isNew: true },
    { id: 'messages', label: 'Go to Messages', icon: <MessageIcon />, action: () => navigate('/messages'), category: 'Navigation', keywords: ['messages', 'chat', 'dm', 'inbox'] },
    { id: 'library', label: 'Go to Research Library', icon: <LibraryIcon />, action: () => navigate('/library'), category: 'Navigation', keywords: ['library', 'research', 'papers', 'studies'] },
    { id: 'courses', label: 'Go to Courses', icon: <CoursesIcon />, action: () => navigate('/courses'), category: 'Navigation', keywords: ['courses', 'learn', 'education', 'training'] },
    { id: 'events', label: 'Go to Events', icon: <EventIcon />, action: () => navigate('/events'), category: 'Navigation', keywords: ['events', 'calendar', 'symposia'] },
    { id: 'groups', label: 'Go to Groups', icon: <GroupsIcon />, action: () => navigate('/groups'), category: 'Navigation', keywords: ['groups', 'communities', 'teams'] },
    { id: 'circles', label: 'Go to Integration Circles', icon: <CirclesIcon />, action: () => navigate('/circles'), category: 'Navigation', keywords: ['circles', 'integration', 'support'] },
    { id: 'leaderboard', label: 'Go to Leaderboard', icon: <LeaderboardIcon />, action: () => navigate('/leaderboard'), category: 'Navigation', keywords: ['leaderboard', 'rankings', 'points', 'xp'] },
    { id: 'settings', label: 'Go to Settings', icon: <SettingsIcon />, action: () => navigate('/settings'), category: 'Navigation', keywords: ['settings', 'preferences', 'config'] },
    { id: 'profile', label: 'Go to My Profile', icon: <ProfileIcon />, action: () => navigate(`/profile/${currentUser?.username || currentUser?.id}`), category: 'Navigation', keywords: ['profile', 'me', 'account'] },

    // Actions
    { id: 'new-post', label: 'Create New Post', icon: <AddIcon />, action: () => { navigate('/feed'); /* trigger post modal */ }, category: 'Actions', keywords: ['new', 'create', 'post', 'write'] },
    { id: 'join-voice', label: 'Join a Voice Room', icon: <VoiceIcon />, action: () => navigate('/voice-rooms'), category: 'Actions', keywords: ['join', 'voice', 'audio', 'room'], isNew: true },
    { id: 'enter-space', label: 'Enter a 3D Space', icon: <VRIcon />, action: () => navigate('/virtual-spaces'), category: 'Actions', keywords: ['enter', '3d', 'space', 'virtual'], isNew: true },
    { id: 'find-mentor', label: 'Find a Mentor', icon: <NetworkIcon />, action: () => navigate('/network'), category: 'Actions', keywords: ['find', 'mentor', 'match', 'connect'], isNew: true },

    // Quick Actions
    { id: 'aria', label: 'Open Aria AI Assistant', icon: <AriaIcon />, action: () => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })); setOpen(false); }, category: 'AI', keywords: ['aria', 'ai', 'assistant', 'help', 'ask'], isNew: true },
    { id: 'shortcuts', label: 'View Keyboard Shortcuts', icon: <KeyboardIcon />, action: () => { /* show shortcuts */ }, category: 'Help', keywords: ['shortcuts', 'keyboard', 'keys', 'help'] }
  ], [navigate, currentUser]);

  // Filter commands based on search
  const filteredCommands = useMemo(() => {
    if (!search.trim()) {
      // Show recent + suggested when no search
      const newFeatures = allCommands.filter(c => c.isNew);
      const navigation = allCommands.filter(c => c.category === 'Navigation' && !c.isNew).slice(0, 5);
      return [...newFeatures, ...navigation];
    }

    const searchLower = search.toLowerCase();
    return allCommands.filter(cmd =>
      cmd.label.toLowerCase().includes(searchLower) ||
      cmd.keywords.some(k => k.includes(searchLower))
    );
  }, [search, allCommands]);

  // Reset selection when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  // Keyboard shortcut to open (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Open with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }

      // Also open with just / when not in input
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle keyboard navigation within palette
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        executeCommand(filteredCommands[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredCommands, selectedIndex]);

  const executeCommand = (command) => {
    // Save to recent searches
    const newRecent = [command.id, ...recentSearches.filter(id => id !== command.id)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('commandPalette_recent', JSON.stringify(newRecent));

    // Execute
    command.action();
    setOpen(false);
    setSearch('');
  };

  const handleClose = () => {
    setOpen(false);
    setSearch('');
  };

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups = {};
    filteredCommands.forEach(cmd => {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          position: 'fixed',
          top: '15%',
          m: 0,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.background.paper, 0.95),
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
        }
      }}
      BackdropProps={{
        sx: {
          bgcolor: alpha(theme.palette.common.black, 0.5),
          backdropFilter: 'blur(4px)'
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Search Input */}
        <TextField
          autoFocus
          fullWidth
          placeholder="Search commands, pages, or type to navigate..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Chip
                  size="small"
                  label="ESC"
                  sx={{ fontSize: '0.7rem', height: 20 }}
                />
              </InputAdornment>
            ),
            sx: {
              py: 1.5,
              px: 2,
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
            }
          }}
        />

        <Divider />

        {/* Results */}
        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          {!search && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ px: 2, py: 1, display: 'block' }}
            >
              New Features & Quick Navigation
            </Typography>
          )}

          <List dense sx={{ py: 0 }}>
            {Object.entries(groupedCommands).map(([category, commands], groupIndex) => (
              <React.Fragment key={category}>
                {search && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ px: 2, py: 0.5, display: 'block', bgcolor: 'action.hover' }}
                  >
                    {category}
                  </Typography>
                )}
                {commands.map((cmd, cmdIndex) => {
                  const globalIndex = filteredCommands.indexOf(cmd);
                  return (
                    <ListItem
                      key={cmd.id}
                      button
                      selected={globalIndex === selectedIndex}
                      onClick={() => executeCommand(cmd)}
                      sx={{
                        py: 1.5,
                        px: 2,
                        '&.Mui-selected': {
                          bgcolor: alpha(theme.palette.primary.main, 0.1)
                        },
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.05)
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40, color: cmd.isNew ? 'secondary.main' : 'inherit' }}>
                        {cmd.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {cmd.label}
                            {cmd.isNew && (
                              <Chip
                                label="NEW"
                                size="small"
                                color="secondary"
                                sx={{ height: 18, fontSize: '0.65rem' }}
                              />
                            )}
                          </Box>
                        }
                        secondary={cmd.category}
                      />
                      {globalIndex === selectedIndex && (
                        <Chip
                          size="small"
                          label="↵"
                          sx={{ fontSize: '0.8rem', height: 20 }}
                        />
                      )}
                    </ListItem>
                  );
                })}
              </React.Fragment>
            ))}
          </List>

          {filteredCommands.length === 0 && (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                No commands found for "{search}"
              </Typography>
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Divider />
        <Box
          sx={{
            px: 2,
            py: 1,
            display: 'flex',
            justifyContent: 'space-between',
            bgcolor: 'action.hover'
          }}
        >
          <Typography variant="caption" color="text.secondary">
            ↑↓ Navigate • ↵ Select • ESC Close
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Ctrl+K to open
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CommandPalette;
