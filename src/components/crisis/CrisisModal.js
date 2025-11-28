import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  alpha,
  useTheme,
  Divider,
  Paper
} from '@mui/material';
import {
  Close as CloseIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  SelfImprovement as GroundingIcon,
  Favorite as HeartIcon,
  Warning as WarningIcon,
  LocalHospital as EmergencyIcon,
  Psychology as MentalHealthIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import { CIRCLE_GUIDELINES, GROUNDING_EXERCISES } from '../../data/circleResources';

/**
 * CrisisModal - Comprehensive crisis support resources modal
 * Provides immediate access to hotlines, grounding exercises, and emergency protocols
 */
const CrisisModal = ({ open, onClose }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const crisisResources = CIRCLE_GUIDELINES.crisisResources.resources;

  const handleCall = (number) => {
    // Handle different phone number formats
    // Extract the numeric phone number from formats like "62-FIRESIDE (623-473-7433)" or "988"
    const match = number.match(/\((\d{3}-\d{3}-\d{4})\)/);
    if (match) {
      // Format like "62-FIRESIDE (623-473-7433)" - use the number in parentheses
      window.location.href = `tel:${match[1].replace(/-/g, '')}`;
    } else {
      // Simple number like "988" or "1-800-662-4357"
      const cleanNumber = number.replace(/[^\d]/g, '');
      window.location.href = `tel:${cleanNumber}`;
    }
  };

  const handleText = (textInfo) => {
    // Extract number from "Text HOME to 741741" format
    const match = textInfo.match(/(\d+)$/);
    if (match) {
      window.location.href = `sms:${match[1]}`;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.95)})`,
          backdropFilter: 'blur(10px)'
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.warning.main})`,
          color: 'white',
          py: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <HeartIcon fontSize="large" />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Crisis Support
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              You are not alone. Help is available 24/7.
            </Typography>
          </Box>
        </Box>
        <IconButton 
          onClick={onClose} 
          sx={{ color: 'white' }}
          aria-label="Close crisis support modal"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* Emergency Banner */}
        <Paper
          sx={{
            p: 2,
            m: 2,
            mb: 0,
            bgcolor: alpha(theme.palette.error.main, 0.1),
            borderLeft: `4px solid ${theme.palette.error.main}`
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <EmergencyIcon color="error" />
            <Box>
              <Typography variant="subtitle1" fontWeight={600} color="error">
                If you are in immediate danger, call 911
              </Typography>
              <Typography variant="body2" color="text.secondary">
                For medical emergencies or immediate safety concerns
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="error"
              href="tel:911"
              sx={{ ml: 'auto', fontWeight: 600 }}
            >
              Call 911
            </Button>
          </Box>
        </Paper>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 2 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
          >
            <Tab 
              icon={<PhoneIcon />} 
              label="Hotlines" 
              iconPosition="start"
            />
            <Tab 
              icon={<GroundingIcon />} 
              label="Grounding Exercises" 
              iconPosition="start"
            />
            <Tab 
              icon={<MentalHealthIcon />} 
              label="Safety Tips" 
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          {/* Hotlines Tab */}
          {activeTab === 0 && (
            <Grid container spacing={2}>
              {crisisResources.map((resource, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                        borderColor: theme.palette.primary.main
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {resource.name}
                        </Typography>
                        <Chip
                          icon={<TimeIcon sx={{ fontSize: 14 }} />}
                          label={resource.hours}
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {resource.description}
                      </Typography>
                      
                      <Typography 
                        variant="h6" 
                        color="primary" 
                        fontWeight={700}
                        sx={{ mb: 2 }}
                      >
                        {resource.number}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {resource.number.includes('Text') ? (
                          <Button
                            fullWidth
                            variant="contained"
                            startIcon={<ChatIcon />}
                            onClick={() => handleText(resource.number)}
                          >
                            Text Now
                          </Button>
                        ) : (
                          <Button
                            fullWidth
                            variant="contained"
                            startIcon={<PhoneIcon />}
                            onClick={() => handleCall(resource.number)}
                          >
                            Call Now
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}

              {/* Additional Resources */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Additional Resources
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label="Zendo Project"
                    component="a"
                    href="https://zendoproject.org"
                    target="_blank"
                    clickable
                  />
                  <Chip
                    label="MAPS Integration List"
                    component="a"
                    href="https://integration.maps.org"
                    target="_blank"
                    clickable
                  />
                  <Chip
                    label="Psychedelic.Support"
                    component="a"
                    href="https://psychedelic.support"
                    target="_blank"
                    clickable
                  />
                </Box>
              </Grid>
            </Grid>
          )}

          {/* Grounding Exercises Tab */}
          {activeTab === 1 && (
            <Box>
              <Typography variant="body1" paragraph>
                These exercises can help you feel more grounded and present. 
                Choose one that feels right for you now.
              </Typography>
              
              <Grid container spacing={2}>
                {GROUNDING_EXERCISES.map((exercise) => (
                  <Grid item xs={12} sm={6} md={4} key={exercise.id}>
                    <Card
                      variant="outlined"
                      sx={{
                        height: '100%',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4,
                          borderColor: theme.palette.secondary.main
                        }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {exercise.name}
                          </Typography>
                          <Chip 
                            label={exercise.duration} 
                            size="small"
                            color="secondary"
                            variant="outlined"
                          />
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {exercise.description}
                        </Typography>
                        
                        <Chip
                          label={`When: ${exercise.when}`}
                          size="small"
                          sx={{ bgcolor: alpha(theme.palette.info.main, 0.1) }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Safety Tips Tab */}
          {activeTab === 2 && (
            <Box>
              <Typography variant="body1" paragraph>
                If you're experiencing a difficult time, these tips may help you navigate safely.
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <HeartIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Remember: This will pass"
                    secondary="Difficult experiences are temporary. You have survived 100% of your hardest days."
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <GroundingIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ground yourself"
                    secondary="Feel your feet on the floor. Notice 5 things you can see. Take slow, deep breaths."
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Reach out to someone"
                    secondary="Call a friend, family member, or one of the hotlines above. Connection helps."
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <MentalHealthIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Be gentle with yourself"
                    secondary="You're doing the best you can. Asking for help is a sign of strength."
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <WarningIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Avoid making big decisions"
                    secondary="Wait until you're feeling more stable before making major life changes."
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                For Psychedelic Experiences
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="• Change your environment (music, lighting, location)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="• Have someone sit with you if possible"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="• Surrender rather than resist the experience"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="• Remember: you are safe, this will end"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="• Call Fireside Project for peer support: 62-FIRESIDE"
                  />
                </ListItem>
              </List>
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            borderTop: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            💜 You matter. Help is always available.
          </Typography>
          <Button
            variant="outlined"
            href="tel:623-473-7433"
            startIcon={<PhoneIcon />}
          >
            Call Fireside Project
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CrisisModal;
