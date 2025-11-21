import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  Switch,
  FormControlLabel,
  Tab,
  Tabs,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  PhotoCamera as PhotoIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fadeInUp } from '../theme/animations';
import { useAccessibility } from '../context/AccessibilityContext';

/**
 * Settings/Edit Profile Page
 * Allows users to edit their profile information, preferences, and account settings
 */
const Settings = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { preferences, togglePreference } = useAccessibility();
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Profile form state
  const [profile, setProfile] = useState({
    name: currentUser?.display_name || '',
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || '',
    location: '',
    website: '',
    interests: '',
  });

  // Account settings state
  const [accountSettings, setAccountSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    messageNotifications: true,
    weeklyDigest: true,
    publicProfile: true,
  });

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    showEmail: false,
    showLocation: true,
    allowMessages: true,
    showActivity: true,
  });

  const handleProfileChange = (field) => (event) => {
    setProfile({ ...profile, [field]: event.target.value });
  };

  const handleAccountSettingChange = (field) => (event) => {
    setAccountSettings({ ...accountSettings, [field]: event.target.checked });
  };

  const handlePrivacySettingChange = (field) => (event) => {
    setPrivacySettings({ ...privacySettings, [field]: event.target.checked });
  };

  const handleSaveProfile = () => {
    // TODO: Implement API call to save profile
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSaveAccount = () => {
    // TODO: Implement API call to save account settings
    setSuccessMessage('Settings updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSavePrivacy = () => {
    // TODO: Implement API call to save privacy settings
    setSuccessMessage('Privacy settings updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ animation: `${fadeInUp} 0.5s ease-out` }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account settings and preferences
          </Typography>
        </Box>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
          >
            <Tab label="Profile" />
            <Tab label="Account" />
            <Tab label="Privacy" />
            <Tab label="Accessibility" />
          </Tabs>
        </Paper>

        {/* Profile Tab */}
        {activeTab === 0 && (
          <Paper sx={{ p: 3, animation: `${fadeInUp} 0.5s ease-out` }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Edit Profile
            </Typography>

            {/* Avatar Upload */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Avatar
                src={currentUser?.avatar_url}
                sx={{ width: 100, height: 100, mr: 3 }}
              >
                {currentUser?.display_name?.charAt(0) || 'U'}
              </Avatar>
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<PhotoIcon />}
                  component="label"
                >
                  Change Photo
                  <input type="file" hidden accept="image/*" />
                </Button>
                <Typography variant="caption" display="block" sx={{ mt: 1 }} color="text.secondary">
                  JPG, PNG or GIF. Max size 5MB.
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Profile Form */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={profile.name}
                  onChange={handleProfileChange('name')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  value={profile.username}
                  onChange={handleProfileChange('username')}
                  helperText="Can only be changed once per month"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={profile.email}
                  onChange={handleProfileChange('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={4}
                  value={profile.bio}
                  onChange={handleProfileChange('bio')}
                  helperText={`${profile.bio.length}/500 characters`}
                  inputProps={{ maxLength: 500 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={profile.location}
                  onChange={handleProfileChange('location')}
                  placeholder="e.g., San Francisco, CA"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Website"
                  value={profile.website}
                  onChange={handleProfileChange('website')}
                  placeholder="https://"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Research Interests"
                  value={profile.interests}
                  onChange={handleProfileChange('interests')}
                  placeholder="e.g., Psilocybin, MDMA therapy, Clinical trials"
                  helperText="Comma-separated list of interests"
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/profile/${currentUser?.username}`)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveProfile}
              >
                Save Changes
              </Button>
            </Box>
          </Paper>
        )}

        {/* Account Tab */}
        {activeTab === 1 && (
          <Paper sx={{ p: 3, animation: `${fadeInUp} 0.5s ease-out` }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Account Settings
            </Typography>

            {/* Notification Settings */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Notifications
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={accountSettings.emailNotifications}
                    onChange={handleAccountSettingChange('emailNotifications')}
                  />
                }
                label="Email Notifications"
              />
              <Typography variant="caption" display="block" color="text.secondary" sx={{ ml: 6, mb: 2 }}>
                Receive email updates about activity, messages, and comments
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={accountSettings.pushNotifications}
                    onChange={handleAccountSettingChange('pushNotifications')}
                  />
                }
                label="Push Notifications"
              />
              <Typography variant="caption" display="block" color="text.secondary" sx={{ ml: 6, mb: 2 }}>
                Receive push notifications in your browser
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={accountSettings.messageNotifications}
                    onChange={handleAccountSettingChange('messageNotifications')}
                  />
                }
                label="Message Notifications"
              />
              <Typography variant="caption" display="block" color="text.secondary" sx={{ ml: 6, mb: 2 }}>
                Get notified when you receive new messages
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={accountSettings.weeklyDigest}
                    onChange={handleAccountSettingChange('weeklyDigest')}
                  />
                }
                label="Weekly Digest"
              />
              <Typography variant="caption" display="block" color="text.secondary" sx={{ ml: 6, mb: 2 }}>
                Receive a weekly summary of community activity
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Change Password */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Change Password
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type={showPassword ? 'text' : 'password'}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveAccount}
              >
                Save Settings
              </Button>
            </Box>
          </Paper>
        )}

        {/* Privacy Tab */}
        {activeTab === 2 && (
          <Paper sx={{ p: 3, animation: `${fadeInUp} 0.5s ease-out` }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Privacy Settings
            </Typography>

            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={privacySettings.showEmail}
                    onChange={handlePrivacySettingChange('showEmail')}
                  />
                }
                label="Show email on profile"
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={privacySettings.showLocation}
                    onChange={handlePrivacySettingChange('showLocation')}
                  />
                }
                label="Show location on profile"
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={privacySettings.allowMessages}
                    onChange={handlePrivacySettingChange('allowMessages')}
                  />
                }
                label="Allow members to send me messages"
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={privacySettings.showActivity}
                    onChange={handlePrivacySettingChange('showActivity')}
                  />
                }
                label="Show my activity on my profile"
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Alert severity="info">
              Your privacy is important to us. These settings control what information is visible to other members of the GSAPS community.
            </Alert>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSavePrivacy}
              >
                Save Privacy Settings
              </Button>
            </Box>
          </Paper>
        )}

        {/* Accessibility Tab */}
        {activeTab === 3 && (
          <Paper sx={{ p: 3, animation: `${fadeInUp} 0.5s ease-out` }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Accessibility Preferences
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Tune contrast, text size, motion, and learning support to reduce visual noise and provide transcripts across all lessons.
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={preferences.highContrast}
                  onChange={() => togglePreference('highContrast')}
                  inputProps={{ 'aria-label': 'Toggle high contrast mode' }}
                />
              }
              label="High contrast mode"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={preferences.largeText}
                  onChange={() => togglePreference('largeText')}
                  inputProps={{ 'aria-label': 'Toggle large text mode' }}
                />
              }
              label="Large text and spacing"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={preferences.reduceMotion}
                  onChange={() => togglePreference('reduceMotion')}
                  inputProps={{ 'aria-label': 'Toggle reduced motion animations' }}
                />
              }
              label="Reduce motion"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={preferences.captions}
                  onChange={() => togglePreference('captions')}
                  inputProps={{ 'aria-label': 'Toggle captions and transcripts for lessons' }}
                />
              }
              label="Always show captions and lesson transcripts"
            />
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default Settings;
