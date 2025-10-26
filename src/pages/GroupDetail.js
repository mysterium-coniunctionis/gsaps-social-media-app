import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Tabs,
  Tab,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Groups as GroupsIcon,
  ExitToApp as LeaveIcon,
  PersonAdd as InviteIcon,
  Lock as LockIcon,
  Public as PublicIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * Group detail page
 * Displays group information, members, and activity
 */
const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    // TODO: Fetch group details from API
    setTimeout(() => {
      const mockGroup = {
        id: parseInt(groupId) || 1,
        name: 'Psychedelic Research Network',
        slug: groupId,
        description: 'A community for researchers studying psychedelics and their therapeutic applications. We discuss latest research, share resources, and collaborate on projects.',
        avatar_url: '',
        memberCount: 234,
        privacy: 'public',
        category: 'Research',
        isJoined: true,
        createdDate: '2024-01-10',
        admins: [
          { id: 1, name: 'Alice Johnson', username: 'alice_researcher', avatar_url: '' }
        ],
        members: [
          { id: 2, name: 'Bob Williams', username: 'bob_neuroscience', avatar_url: '', role: 'Member' },
          { id: 3, name: 'Carol Davis', username: 'carol_therapist', avatar_url: '', role: 'Member' },
          { id: 4, name: 'David Martinez', username: 'david_student', avatar_url: '', role: 'Member' }
        ],
        recentActivity: [
          {
            id: 1,
            user: 'Alice Johnson',
            action: 'posted in the group',
            content: 'New study on psilocybin and depression published!',
            timestamp: '2 hours ago'
          },
          {
            id: 2,
            user: 'Bob Williams',
            action: 'joined the group',
            timestamp: '1 day ago'
          }
        ]
      };
      setGroup(mockGroup);
      setLoading(false);
    }, 500);
  }, [groupId]);

  const handleJoinLeave = () => {
    // TODO: Implement join/leave functionality
    if (group.isJoined) {
      if (window.confirm('Are you sure you want to leave this group?')) {
        alert('Leave group functionality coming soon!');
      }
    } else {
      alert('Join group functionality coming soon!');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!group) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5">Group not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      {/* Group Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <Avatar
              src={group.avatar_url}
              sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}
            >
              <GroupsIcon sx={{ fontSize: 48 }} />
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h4">
                      {group.name}
                    </Typography>
                    {group.privacy === 'private' ? (
                      <LockIcon color="action" />
                    ) : (
                      <PublicIcon color="action" />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip label={group.category} size="small" color="primary" />
                    <Chip label={`${group.memberCount} members`} size="small" variant="outlined" />
                    <Chip label={group.privacy} size="small" variant="outlined" />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  {group.isJoined && (
                    <Button
                      variant="outlined"
                      startIcon={<InviteIcon />}
                      onClick={() => alert('Invite functionality coming soon!')}
                    >
                      Invite
                    </Button>
                  )}
                  <Button
                    variant={group.isJoined ? 'outlined' : 'contained'}
                    color={group.isJoined ? 'error' : 'primary'}
                    startIcon={group.isJoined ? <LeaveIcon /> : null}
                    onClick={handleJoinLeave}
                  >
                    {group.isJoined ? 'Leave Group' : 'Join Group'}
                  </Button>
                </Box>
              </Box>

              <Typography variant="body1" paragraph>
                {group.description}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Created on {new Date(group.createdDate).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
          <Tab label="Activity" />
          <Tab label="Members" />
          <Tab label="About" />
        </Tabs>

        <CardContent>
          {/* Activity Tab */}
          {activeTab === 0 && (
            <Box>
              {group.isJoined ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    Recent Activity
                  </Typography>
                  {group.recentActivity.length > 0 ? (
                    <List>
                      {group.recentActivity.map((activity, index) => (
                        <React.Fragment key={activity.id}>
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary={
                                <Typography>
                                  <strong>{activity.user}</strong> {activity.action}
                                </Typography>
                              }
                              secondary={
                                <>
                                  {activity.content && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                      {activity.content}
                                    </Typography>
                                  )}
                                  <Typography variant="caption" color="text.secondary">
                                    {activity.timestamp}
                                  </Typography>
                                </>
                              }
                            />
                          </ListItem>
                          {index < group.recentActivity.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  ) : (
                    <Typography color="text.secondary">
                      No recent activity
                    </Typography>
                  )}
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="text.secondary">
                    Join this group to see activity
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {/* Members Tab */}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Administrators
              </Typography>
              <List>
                {group.admins.map((admin) => (
                  <ListItem
                    key={admin.id}
                    button
                    onClick={() => navigate(`/profile/${admin.username}`)}
                  >
                    <ListItemAvatar>
                      <Avatar src={admin.avatar_url}>
                        {admin.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={admin.name}
                      secondary={`@${admin.username} • Admin`}
                    />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Members ({group.members.length})
              </Typography>
              <List>
                {group.members.map((member) => (
                  <ListItem
                    key={member.id}
                    button
                    onClick={() => navigate(`/profile/${member.username}`)}
                  >
                    <ListItemAvatar>
                      <Avatar src={member.avatar_url}>
                        {member.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.name}
                      secondary={`@${member.username}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* About Tab */}
          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                About This Group
              </Typography>
              <Typography paragraph>
                {group.description}
              </Typography>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Privacy
                  </Typography>
                  <Typography>
                    {group.privacy.charAt(0).toUpperCase() + group.privacy.slice(1)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Category
                  </Typography>
                  <Typography>{group.category}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Members
                  </Typography>
                  <Typography>{group.memberCount}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Created
                  </Typography>
                  <Typography>
                    {new Date(group.createdDate).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default GroupDetail;
