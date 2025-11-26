import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  IconButton,
  Skeleton,
  alpha,
  useTheme,
  Tooltip
} from '@mui/material';
import {
  AutoAwesome as AIIcon,
  Article as PaperIcon,
  School as CourseIcon,
  Group as CircleIcon,
  Person as MentorIcon,
  Refresh as RefreshIcon,
  BookmarkAdd as SaveIcon,
  ArrowForward as ViewIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../common/GlassCard';
import { fadeInUp } from '../../theme/animations';

/**
 * SmartRecommendations - AI-powered personalized recommendations
 * Suggests papers, courses, circles, and connections based on user activity
 */

// Mock recommendation data (replace with actual ML/API integration)
const mockRecommendations = {
  papers: [
    {
      id: 1,
      title: 'Psilocybin for Treatment-Resistant Depression: A Randomized Trial',
      authors: 'Carhart-Harris et al.',
      year: 2021,
      journal: 'NEJM',
      matchScore: 94,
      reason: 'Based on your interest in psilocybin therapy'
    },
    {
      id: 2,
      title: 'MDMA-Assisted Therapy for PTSD: Phase 3 Results',
      authors: 'Mitchell et al.',
      year: 2023,
      journal: 'Nature Medicine',
      matchScore: 89,
      reason: 'Similar to papers you\'ve saved'
    },
    {
      id: 3,
      title: 'Neuroimaging the Psychedelic State: A Review',
      authors: 'Preller & Vollenweider',
      year: 2022,
      journal: 'Neuropsychopharmacology',
      matchScore: 85,
      reason: 'Trending in your field'
    }
  ],
  courses: [
    {
      id: 1,
      title: 'Advanced Integration Techniques',
      instructor: 'Dr. Sarah Martinez',
      ceCredits: 12,
      matchScore: 92,
      reason: 'Continues from courses you\'ve completed'
    },
    {
      id: 2,
      title: 'Trauma-Informed Psychedelic Care',
      instructor: 'Dr. Michael Chen',
      ceCredits: 18,
      matchScore: 88,
      reason: 'Popular with similar learners'
    }
  ],
  circles: [
    {
      id: 1,
      name: 'Ketamine Therapy Practitioners',
      members: 45,
      matchScore: 90,
      reason: 'Matches your professional focus'
    },
    {
      id: 2,
      name: 'Research Methods Study Group',
      members: 28,
      matchScore: 86,
      reason: 'Based on your career interests'
    }
  ],
  connections: [
    {
      id: 1,
      name: 'Dr. Elena Rodriguez',
      role: 'Clinical Researcher',
      organization: 'Johns Hopkins',
      matchScore: 91,
      reason: 'Works in your area of interest'
    },
    {
      id: 2,
      name: 'Prof. James Liu',
      role: 'Neuroscientist',
      organization: 'Imperial College',
      matchScore: 87,
      reason: 'Has published related research'
    }
  ]
};

const RecommendationCard = ({ item, type, onView, onSave }) => {
  const theme = useTheme();
  
  const icons = {
    paper: PaperIcon,
    course: CourseIcon,
    circle: CircleIcon,
    connection: MentorIcon
  };
  
  const IconComponent = icons[type] || PaperIcon;
  
  return (
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              display: 'flex'
            }}
          >
            <IconComponent sx={{ color: 'primary.main' }} />
          </Box>
          <Chip
            icon={<AIIcon sx={{ fontSize: 14 }} />}
            label={`${item.matchScore}% match`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>
        
        <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ lineHeight: 1.3 }}>
          {item.title || item.name}
        </Typography>
        
        {item.authors && (
          <Typography variant="body2" color="text.secondary">
            {item.authors} • {item.year}
          </Typography>
        )}
        
        {item.instructor && (
          <Typography variant="body2" color="text.secondary">
            {item.instructor} • {item.ceCredits} CE credits
          </Typography>
        )}
        
        {item.members && (
          <Typography variant="body2" color="text.secondary">
            {item.members} members
          </Typography>
        )}
        
        {item.role && (
          <Typography variant="body2" color="text.secondary">
            {item.role} • {item.organization}
          </Typography>
        )}
        
        <Box
          sx={{
            mt: 2,
            p: 1,
            borderRadius: 1,
            bgcolor: alpha(theme.palette.info.main, 0.05),
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <AIIcon sx={{ fontSize: 14, color: 'info.main' }} />
          <Typography variant="caption" color="info.main">
            {item.reason}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            size="small"
            variant="contained"
            endIcon={<ViewIcon />}
            onClick={() => onView?.(item)}
            fullWidth
          >
            View
          </Button>
          <Tooltip title="Save for later">
            <IconButton size="small" onClick={() => onSave?.(item)} aria-label="Save recommendation">
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

const SmartRecommendations = ({ type = 'all', maxItems = 6 }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    // Simulate loading recommendations
    const loadRecommendations = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    };
    loadRecommendations();
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleView = (item, itemType) => {
    // Navigate to appropriate detail page
    switch (itemType) {
      case 'paper':
        navigate(`/library/${item.id}`);
        break;
      case 'course':
        navigate(`/courses/${item.id}`);
        break;
      case 'circle':
        navigate(`/circles/${item.id}`);
        break;
      case 'connection':
        navigate(`/profile/${item.id}`);
        break;
      default:
        break;
    }
  };

  const handleSave = (item) => {
    // Save to user's bookmarks
    console.log('Saving recommendation:', item);
  };

  const getItemsForType = (itemType) => {
    if (!recommendations) return [];
    return recommendations[itemType + 's'] || [];
  };

  const sections = type === 'all'
    ? [
        { type: 'paper', title: 'Recommended Papers', icon: PaperIcon },
        { type: 'course', title: 'Suggested Courses', icon: CourseIcon },
        { type: 'circle', title: 'Circles for You', icon: CircleIcon },
        { type: 'connection', title: 'People to Connect With', icon: MentorIcon }
      ]
    : [{ type, title: `Recommended ${type}s`, icon: PaperIcon }];

  if (isLoading) {
    return (
      <Box sx={{ animation: `${fadeInUp} 0.5s ease-out` }}>
        <GlassCard sx={{ mb: 4, p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="40%" height={28} />
              <Skeleton variant="text" width="60%" height={20} />
            </Box>
          </Box>
        </GlassCard>
        <Grid container spacing={3}>
          {Array.from({ length: maxItems }).map((_, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ animation: `${fadeInUp} 0.5s ease-out` }}>
      {/* Header */}
      <GlassCard sx={{ mb: 4, p: 3, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: 'white'
              }}
            >
              <AIIcon />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Personalized Recommendations
              </Typography>
              <Typography variant="body2" color="text.secondary">
                AI-powered suggestions based on your interests and activity
              </Typography>
            </Box>
          </Box>
          <Tooltip title="Refresh recommendations">
            <IconButton onClick={handleRefresh} aria-label="Refresh recommendations">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GlassCard>

      {/* Recommendation Sections */}
      {sections.map((section) => {
        const items = getItemsForType(section.type).slice(0, maxItems);
        if (items.length === 0) return null;

        return (
          <Box key={section.type} sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <section.icon color="primary" />
              <Typography variant="h6" fontWeight={600}>
                {section.title}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {items.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <RecommendationCard
                    item={item}
                    type={section.type}
                    onView={(i) => handleView(i, section.type)}
                    onSave={handleSave}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};

export default SmartRecommendations;
