import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Divider,
  Chip,
  alpha,
} from '@mui/material';
import { Close as CloseIcon, Keyboard as KeyboardIcon } from '@mui/icons-material';
import { getShortcutsByCategory } from '../../hooks/useKeyboardShortcuts';

/**
 * KeyboardKey Component
 * Renders a keyboard key with styling
 */
const KeyboardKey = ({ children }) => (
  <Box
    component="kbd"
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 28,
      height: 28,
      px: 1,
      mx: 0.25,
      bgcolor: (theme) => alpha(theme.palette.action.selected, 0.2),
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      fontSize: '0.75rem',
      fontFamily: 'monospace',
      fontWeight: 600,
      boxShadow: (theme) =>
        `0 2px 0 ${alpha(theme.palette.common.black, 0.1)}`,
    }}
  >
    {children}
  </Box>
);

/**
 * ShortcutRow Component
 * Displays a single shortcut with its keys and description
 */
const ShortcutRow = ({ shortcut }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      py: 1,
      px: 1,
      '&:hover': {
        bgcolor: 'action.hover',
        borderRadius: 1,
      },
    }}
  >
    <Typography variant="body2" color="text.secondary">
      {shortcut.description}
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {shortcut.keys.map((key, index) => (
        <React.Fragment key={key}>
          {index > 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ mx: 0.5 }}>
              then
            </Typography>
          )}
          <KeyboardKey>{key === 'Escape' ? 'Esc' : key}</KeyboardKey>
        </React.Fragment>
      ))}
    </Box>
  </Box>
);

/**
 * KeyboardShortcutsHelp Component
 * Modal dialog showing all available keyboard shortcuts
 */
const KeyboardShortcutsHelp = ({ open, onClose }) => {
  const categories = getShortcutsByCategory();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <KeyboardIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Keyboard Shortcuts
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Use these shortcuts to navigate faster. Press <KeyboardKey>?</KeyboardKey> anytime to show this help.
        </Typography>

        {Object.entries(categories).map(([category, shortcuts], index) => (
          <Box key={category} sx={{ mb: 3 }}>
            {index > 0 && <Divider sx={{ mb: 2 }} />}
            <Chip
              label={category}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mb: 1.5, fontWeight: 600 }}
            />
            <Box>
              {shortcuts.map((shortcut) => (
                <ShortcutRow key={shortcut.description} shortcut={shortcut} />
              ))}
            </Box>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
          Shortcuts are disabled when typing in input fields
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcutsHelp;
