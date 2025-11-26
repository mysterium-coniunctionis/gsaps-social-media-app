import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  alpha,
  useTheme,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  School as SchoolIcon,
  PlayCircle as PlayIcon,
  CheckCircle as CheckIcon,
  Lock as LockIcon,
  ExpandMore as ExpandIcon,
  Timer as TimerIcon,
  MenuBook as BookIcon,
  FamilyRestroom as FamilyIcon,
  Security as SafetyIcon,
  TrendingUp as ProgressIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import GlassCard from '../../components/common/GlassCard';
import { PREP_ACADEMY_MODULES, FAMILY_RESOURCES } from '../../data/prepAcademyData';
import { fadeInUp } from '../../theme/animations';

const PrepAcademy = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [expandedModule, setExpandedModule] = useState(null);

  // Mock user progress
  const userProgress = {
    completedModules: [1, 2],
    currentModule: 3,
    overallProgress: 25,
    totalTime: '2h 15m'
  };

  const isModuleCompleted = (moduleId) => userProgress.completedModules.includes(moduleId);
  const isModuleLocked = (moduleId) => {
    if (moduleId === 1) return false;
    return !userProgress.completedModules.includes(moduleId - 1) && moduleId !== userProgress.currentModule;
  };

  const handleModuleClick = (module) => {
    if (!isModuleLocked(module.id)) {
      navigate(`/prep-academy/module/${module.id}`);
    }
  };

  const totalDuration = PREP_ACADEMY_MODULES.reduce((sum, m) => {
    const mins = parseInt(m.duration);
    return sum + mins;
  }, 0);

  return (
    <Box sx={{ animation: `${fadeInUp} 0.5s ease-out` }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
          color: 'white',
          mb: 4,
          p: { xs: 3, md: 6 },
          borderRadius: 3,
          overflow: 'hidden'
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Chip
              label="PATIENT PREPARATION"
              size="small"
              sx={{
                bgcolor: alpha('#fff', 0.2),
                color: 'white',
                fontWeight: 600,
                mb: 2
              }}
            />
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Preparation Academy
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 3, maxWidth: 600 }}>
              A comprehensive 8-module curriculum to prepare you for a safe, meaningful psychedelic experience.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BookIcon />
                <Typography>8 Modules</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimerIcon />
                <Typography>{Math.round(totalDuration / 60)}+ Hours</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SafetyIcon />
                <Typography>Interactive Tools</Typography>
              </Box>
            </Box>

            {currentUser ? (
              <Button
                variant="contained"
                size="large"
                startIcon={userProgress.overallProgress > 0 ? <ProgressIcon /> : <PlayIcon />}
                onClick={() => navigate(`/prep-academy/module/${userProgress.currentModule}`)}
                sx={{
                  bgcolor: 'white',
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  '&:hover': { bgcolor: alpha('#fff', 0.9) }
                }}
              >
                {userProgress.overallProgress > 0 ? 'Continue Learning' : 'Start Academy'}
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  bgcolor: 'white',
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  '&:hover': { bgcolor: alpha('#fff', 0.9) }
                }}
              >
                Sign Up to Start
              </Button>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            {currentUser && (
              <Box
                sx={{
                  bgcolor: alpha('#fff', 0.15),
                  borderRadius: 3,
                  p: 3,
                  textAlign: 'center'
                }}
              >
                <Typography variant="h6" gutterBottom>Your Progress</Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      border: '8px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="h4" fontWeight="bold">
                      {userProgress.overallProgress}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {userProgress.completedModules.length} of 8 modules completed
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  Time invested: {userProgress.totalTime}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<SchoolIcon />} label="Curriculum" iconPosition="start" />
          <Tab icon={<FamilyIcon />} label="Family Resources" iconPosition="start" />
        </Tabs>
      </Box>

      {/* Curriculum Tab */}
      {activeTab === 0 && (
        <Box>
          {/* Module Progress Overview */}
          <GlassCard sx={{ mb: 4, p: 3 }}>
            <Typography variant="h6" gutterBottom>Course Progress</Typography>
            <LinearProgress
              variant="determinate"
              value={userProgress.overallProgress}
              sx={{ 
                height: 12, 
                borderRadius: 6,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  borderRadius: 6,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {userProgress.completedModules.length} modules completed
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {8 - userProgress.completedModules.length} remaining
              </Typography>
            </Box>
          </GlassCard>

          {/* Modules Grid */}
          <Grid container spacing={3}>
            {PREP_ACADEMY_MODULES.map((module) => {
              const completed = isModuleCompleted(module.id);
              const locked = isModuleLocked(module.id);
              const isCurrent = module.id === userProgress.currentModule;

              return (
                <Grid item xs={12} md={6} key={module.id}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: locked ? 'not-allowed' : 'pointer',
                      opacity: locked ? 0.6 : 1,
                      transition: 'all 0.3s',
                      border: isCurrent ? `2px solid ${theme.palette.primary.main}` : 'none',
                      '&:hover': locked ? {} : {
                        transform: 'translateY(-4px)',
                        boxShadow: 6
                      }
                    }}
                    onClick={() => handleModuleClick(module)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography variant="h3">{module.icon}</Typography>
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              Module {module.id}
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                              {module.title}
                            </Typography>
                          </Box>
                        </Box>
                        {completed ? (
                          <CheckIcon color="success" fontSize="large" />
                        ) : locked ? (
                          <LockIcon color="disabled" fontSize="large" />
                        ) : isCurrent ? (
                          <Chip label="In Progress" color="primary" size="small" />
                        ) : null}
                      </Box>

                      <Typography variant="body2" color="text.secondary" paragraph>
                        {module.description}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Chip
                          icon={<TimerIcon />}
                          label={module.duration}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          icon={<BookIcon />}
                          label={`${module.lessons} lessons`}
                          size="small"
                          variant="outlined"
                        />
                        {module.hasInteractiveTool && (
                          <Chip
                            label="Interactive"
                            size="small"
                            color="secondary"
                          />
                        )}
                      </Box>

                      {/* Topics Preview */}
                      <Accordion
                        expanded={expandedModule === module.id}
                        onChange={(e, isExpanded) => {
                          e.stopPropagation();
                          setExpandedModule(isExpanded ? module.id : null);
                        }}
                        sx={{ bgcolor: 'transparent', boxShadow: 'none' }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandIcon />}
                          onClick={(e) => e.stopPropagation()}
                          sx={{ px: 0, minHeight: 'auto' }}
                        >
                          <Typography variant="body2" color="primary">
                            View Topics
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 0 }}>
                          <List dense>
                            {module.topics.map((topic, idx) => (
                              <ListItem key={idx} sx={{ py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                  <CheckIcon fontSize="small" color="action" />
                                </ListItemIcon>
                                <ListItemText primary={topic} />
                              </ListItem>
                            ))}
                          </List>
                        </AccordionDetails>
                      </Accordion>

                      {!locked && (
                        <Button
                          fullWidth
                          variant={completed ? 'outlined' : 'contained'}
                          startIcon={completed ? <CheckIcon /> : <PlayIcon />}
                          sx={{ mt: 2 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleModuleClick(module);
                          }}
                        >
                          {completed ? 'Review Module' : isCurrent ? 'Continue' : 'Start Module'}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {/* Family Resources Tab */}
      {activeTab === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Resources for Family & Caregivers
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Help your loved ones understand your journey and how they can support you.
          </Typography>

          <Grid container spacing={3}>
            {FAMILY_RESOURCES.map((resource) => (
              <Grid item xs={12} sm={6} md={3} key={resource.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <FamilyIcon color="primary" />
                      <Chip label={resource.audience} size="small" variant="outlined" />
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {resource.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {resource.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        {resource.duration}
                      </Typography>
                      <Button size="small">Read</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default PrepAcademy;
