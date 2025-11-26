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
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Checkbox,
  FormControlLabel,
  alpha,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Avatar
} from '@mui/material';
import {
  Explore as ExploreIcon,
  TrendingUp as TrendingIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  CheckCircle as CheckIcon,
  Star as StarIcon,
  ExpandMore as ExpandIcon,
  Timeline as TimelineIcon,
  AttachMoney as MoneyIcon,
  Speed as DemandIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import GlassCard from '../../components/common/GlassCard';
import { CAREER_PATHWAYS, SKILL_ASSESSMENTS } from '../../data/prepAcademyData';
import { fadeInUp } from '../../theme/animations';

const CareerNavigator = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPathway, setSelectedPathway] = useState(null);
  const [assessedSkills, setAssessedSkills] = useState({});

  // Mock user profile
  const userProfile = {
    currentRole: 'Graduate Student',
    experience: '2 years',
    interests: ['Research', 'Clinical Practice']
  };

  const handleSkillToggle = (category, skill) => {
    setAssessedSkills(prev => ({
      ...prev,
      [skill]: !prev[skill]
    }));
  };

  const getSkillProgress = (pathway) => {
    const relevantSkills = [...(SKILL_ASSESSMENTS[pathway.id] || []), ...SKILL_ASSESSMENTS.general];
    const assessedCount = relevantSkills.filter(skill => assessedSkills[skill]).length;
    return (assessedCount / relevantSkills.length) * 100;
  };

  const getDemandColor = (level) => {
    switch (level) {
      case 'Very High': return 'success';
      case 'High': return 'info';
      case 'Growing': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ animation: `${fadeInUp} 0.5s ease-out` }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
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
              label="CAREER DEVELOPMENT"
              size="small"
              sx={{
                bgcolor: alpha('#fff', 0.2),
                color: 'white',
                fontWeight: 600,
                mb: 2
              }}
            />
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Career Pathways Navigator
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 3, maxWidth: 600 }}>
              Explore career opportunities in psychedelic science and therapy. Discover your path, assess your skills, and connect with mentors.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WorkIcon />
                <Typography>{CAREER_PATHWAYS.length} Career Paths</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SchoolIcon />
                <Typography>Skill Assessments</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingIcon />
                <Typography>Growing Industry</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                bgcolor: alpha('#fff', 0.15),
                borderRadius: 3,
                p: 3
              }}
            >
              <Typography variant="subtitle2" sx={{ opacity: 0.8 }} gutterBottom>
                Industry Growth
              </Typography>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                +400%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Projected job growth in psychedelic therapy by 2030
              </Typography>
            </Box>
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
          <Tab icon={<ExploreIcon />} label="Career Paths" iconPosition="start" />
          <Tab icon={<CheckIcon />} label="Skill Assessment" iconPosition="start" />
        </Tabs>
      </Box>

      {/* Career Paths Tab */}
      {activeTab === 0 && (
        <Box>
          <Grid container spacing={3}>
            {CAREER_PATHWAYS.map((pathway) => (
              <Grid item xs={12} md={6} lg={4} key={pathway.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    border: selectedPathway?.id === pathway.id 
                      ? `2px solid ${theme.palette.primary.main}` 
                      : 'none',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                  onClick={() => setSelectedPathway(
                    selectedPathway?.id === pathway.id ? null : pathway
                  )}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h2">{pathway.icon}</Typography>
                      <Chip
                        label={pathway.demandLevel}
                        size="small"
                        color={getDemandColor(pathway.demandLevel)}
                      />
                    </Box>

                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {pathway.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" paragraph>
                      {pathway.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <MoneyIcon fontSize="small" color="action" />
                        <Typography variant="body2">{pathway.avgSalary}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <TimelineIcon fontSize="small" color="action" />
                        <Typography variant="body2">{pathway.timeToQualify}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Skill Match
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={getSkillProgress(pathway)}
                        sx={{ height: 8, borderRadius: 4, mt: 0.5 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Selected Pathway Details */}
          {selectedPathway && (
            <Paper sx={{ mt: 4, p: 4, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography variant="h2">{selectedPathway.icon}</Typography>
                <Box>
                  <Typography variant="h5" fontWeight={600}>
                    {selectedPathway.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedPathway.description}
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Required Education
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {selectedPathway.requiredEducation}
                  </Typography>

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Key Certifications
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedPathway.certifications.map((cert, idx) => (
                      <Chip key={idx} label={cert} size="small" variant="outlined" />
                    ))}
                  </Box>

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Core Skills
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedPathway.skills.map((skill, idx) => (
                      <Chip 
                        key={idx} 
                        label={skill} 
                        size="small" 
                        color={assessedSkills[skill] ? 'success' : 'default'}
                        variant={assessedSkills[skill] ? 'filled' : 'outlined'}
                      />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Career Path Steps
                  </Typography>
                  <List>
                    {selectedPathway.steps.map((step, idx) => (
                      <ListItem key={idx} sx={{ py: 1 }}>
                        <ListItemIcon>
                          <Avatar 
                            sx={{ 
                              width: 28, 
                              height: 28, 
                              bgcolor: theme.palette.primary.main,
                              fontSize: '0.875rem'
                            }}
                          >
                            {idx + 1}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={step} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Button variant="contained" startIcon={<SchoolIcon />}>
                  Find Related Courses
                </Button>
                <Button variant="outlined" startIcon={<WorkIcon />}>
                  Browse Job Listings
                </Button>
              </Box>
            </Paper>
          )}
        </Box>
      )}

      {/* Skill Assessment Tab */}
      {activeTab === 1 && (
        <Box>
          <GlassCard sx={{ mb: 4, p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Assess Your Skills
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Check the skills you currently have to see which career paths match your profile.
            </Typography>
          </GlassCard>

          <Grid container spacing={3}>
            {Object.entries(SKILL_ASSESSMENTS).map(([category, skills]) => (
              <Grid item xs={12} md={6} key={category}>
                <Paper sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ textTransform: 'capitalize' }}>
                    {category} Skills
                  </Typography>
                  <List dense>
                    {skills.map((skill) => (
                      <ListItem key={skill} sx={{ py: 0 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={assessedSkills[skill] || false}
                              onChange={() => handleSkillToggle(category, skill)}
                            />
                          }
                          label={skill}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Skills Summary */}
          <Paper sx={{ mt: 4, p: 3, borderRadius: 3, bgcolor: alpha(theme.palette.success.main, 0.05) }}>
            <Typography variant="h6" gutterBottom>
              Your Skill Profile
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Based on {Object.values(assessedSkills).filter(Boolean).length} skills selected:
            </Typography>

            <Grid container spacing={2}>
              {CAREER_PATHWAYS.map((pathway) => {
                const progress = getSkillProgress(pathway);
                return (
                  <Grid item xs={12} sm={6} md={4} key={pathway.id}>
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">{pathway.title}</Typography>
                        <Typography variant="caption">{Math.round(progress)}%</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ height: 8, borderRadius: 4 }}
                        color={progress > 50 ? 'success' : progress > 25 ? 'warning' : 'error'}
                      />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default CareerNavigator;
