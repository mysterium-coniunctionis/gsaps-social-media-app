import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Grid,
  Tabs,
  Tab,
  Chip,
  TextField,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * User profile page component
 * Displays user information and activity
 */
const Profile = () => {
  const { username } = useParams();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [editData, setEditData] = useState({});

  const isOwnProfile = currentUser && (currentUser.username === username || currentUser.id === parseInt(username));

  useEffect(() => {
    // TODO: Fetch user profile from API
    // For now, use mock data
    setTimeout(() => {
      const mockProfile = {
        id: 1,
        username: username,
        name: currentUser?.name || 'User Name',
        email: currentUser?.email || 'user@example.com',
        avatar_url: currentUser?.avatar_url || '',
        bio: 'Passionate researcher in psychedelic studies.',
        location: 'San Francisco, CA',
        website: 'https://example.com',
        interests: ['Psychedelics', 'Neuroscience', 'Psychology', 'Research'],
        memberSince: '2024-01-15',
        stats: {
          posts: 42,
          groups: 5,
          connections: 127
        }
      };
      setProfileData(mockProfile);
      setEditData(mockProfile);
      setLoading(false);
    }, 500);
  }, [username, currentUser]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setEditing(false);
  };

  const handleSave = async () => {
    // TODO: Save profile changes to API
    setProfileData(editData);
    setEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData({
      ...editData,
      [field]: value
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!profileData) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5">User not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      {/* Profile Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 3 }}>
            <Avatar
              src={profileData.avatar_url}
              sx={{ width: 120, height: 120, fontSize: 48 }}
            >
              {profileData.name.charAt(0)}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    {profileData.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    @{profileData.username}
                  </Typography>
                </Box>

                {isOwnProfile && !editing && (
                  <Button
                    startIcon={<EditIcon />}
                    variant="outlined"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </Button>
                )}

                {editing && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      startIcon={<SaveIcon />}
                      variant="contained"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button
                      startIcon={<CancelIcon />}
                      variant="outlined"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>

              {editing ? (
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={editData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  sx={{ mt: 2 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {profileData.bio}
                </Typography>
              )}

              <Box sx={{ display: 'flex', gap: 3, mt: 2, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <EmailIcon fontSize="small" color="action" />
                  <Typography variant="body2">{profileData.email}</Typography>
                </Box>
                {profileData.location && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationIcon fontSize="small" color="action" />
                    <Typography variant="body2">{profileData.location}</Typography>
                  </Box>
                )}
                {profileData.website && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LinkIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                        {profileData.website}
                      </a>
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          {/* Stats */}
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={4} sx={{ textAlign: 'center' }}>
              <Typography variant="h5">{profileData.stats.posts}</Typography>
              <Typography variant="body2" color="text.secondary">Posts</Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: 'center' }}>
              <Typography variant="h5">{profileData.stats.groups}</Typography>
              <Typography variant="body2" color="text.secondary">Groups</Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: 'center' }}>
              <Typography variant="h5">{profileData.stats.connections}</Typography>
              <Typography variant="body2" color="text.secondary">Connections</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Interests */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Research Interests
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {profileData.interests.map((interest) => (
              <Chip key={interest} label={interest} color="primary" variant="outlined" />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Activity Tabs */}
      <Card>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
          <Tab label="Activity" />
          <Tab label="Groups" />
          <Tab label="Publications" />
        </Tabs>
        <CardContent>
          {activeTab === 0 && (
            <Typography color="text.secondary">
              Recent activity will appear here
            </Typography>
          )}
          {activeTab === 1 && (
            <Typography color="text.secondary">
              Group memberships will appear here
            </Typography>
          )}
          {activeTab === 2 && (
            <Typography color="text.secondary">
              Research publications will appear here
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
