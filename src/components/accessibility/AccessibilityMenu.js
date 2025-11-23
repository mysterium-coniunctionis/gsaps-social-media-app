import React, { useState } from 'react';
import {
  Box,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
  Typography
} from '@mui/material';
import { AccessibilityNew, TextIncrease, Contrast, MotionPhotosOff } from '@mui/icons-material';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import { useAccessibility } from '../../context/AccessibilityContext';

const AccessibilityMenu = () => {
  const { preferences, togglePreference } = useAccessibility();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="Accessibility options">
        <IconButton
          color="inherit"
          onClick={handleOpen}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl)}
          aria-controls={anchorEl ? 'accessibility-menu' : undefined}
          aria-label="Open accessibility options"
        >
          <AccessibilityNew />
        </IconButton>
      </Tooltip>

      <Menu
        id="accessibility-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ 'aria-label': 'Accessibility preferences' }}
      >
        <MenuItem dense disableRipple>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Contrast fontSize="small" />
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.highContrast}
                  onChange={() => togglePreference('highContrast')}
                  inputProps={{ 'aria-label': 'Toggle high contrast mode' }}
                />
              }
              label={<Typography variant="body2">High contrast</Typography>}
            />
          </Box>
        </MenuItem>

        <MenuItem dense disableRipple>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextIncrease fontSize="small" />
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.largeText}
                  onChange={() => togglePreference('largeText')}
                  inputProps={{ 'aria-label': 'Toggle large text mode' }}
                />
              }
              label={<Typography variant="body2">Large text</Typography>}
            />
          </Box>
        </MenuItem>

        <MenuItem dense disableRipple>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MotionPhotosOff fontSize="small" />
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.reduceMotion}
                  onChange={() => togglePreference('reduceMotion')}
                  inputProps={{ 'aria-label': 'Toggle reduce motion' }}
                />
              }
              label={<Typography variant="body2">Reduce motion</Typography>}
            />
          </Box>
        </MenuItem>

        <MenuItem dense disableRipple>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ClosedCaptionIcon fontSize="small" />
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.captions}
                  onChange={() => togglePreference('captions')}
                  inputProps={{ 'aria-label': 'Toggle captions and transcripts' }}
                />
              }
              label={<Typography variant="body2">Captions & transcripts</Typography>}
            />
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccessibilityMenu;
