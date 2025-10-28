import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  IconButton,
  alpha,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  ViewModule as GridIcon,
  ViewList as ListIcon,
  School as SchoolIcon,
  FilterList as FilterIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CourseCard from '../../components/courses/CourseCard';
import CreateCourseDialog from '../../components/courses/CreateCourseDialog';
import { fadeInUp } from '../../theme/animations';

/**
 * Courses Page - Main LMS course listing
 * Browse, search, and enroll in courses
 */
const Courses = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Course categories
  const categories = [
    'all',
    'psychedelic-therapy',
    'neuroscience',
    'clinical-research',
    'harm-reduction',
    'integration',
    'ethics',
    'pharmacology',
    'psychology',
    'meditation'
  ];

  // Difficulty levels
  const levels = ['all', 'beginner', 'intermediate', 'advanced', 'professional'];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    setLoading(true);

    // TODO: Replace with real API call
    setTimeout(() => {
      const mockCourses = [
        {
          id: 1,
          title: 'Introduction to Psychedelic-Assisted Therapy',
          slug: 'intro-psychedelic-therapy',
          description: 'A comprehensive introduction to the field of psychedelic-assisted psychotherapy, covering history, mechanisms, and current clinical applications.',
          instructor: {
            id: 3,
            name: 'Dr. Jane Smith',
            avatar_url: 'https://i.pravatar.cc/150?img=5',
            credentials: 'PhD, Clinical Psychology',
            verified: true
          },
          category: 'psychedelic-therapy',
          level: 'beginner',
          thumbnail: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400',
          duration: '8 weeks',
          lessonsCount: 24,
          studentsEnrolled: 142,
          rating: 4.8,
          ratingCount: 67,
          price: 0, // Free course
          ceCredits: 15,
          ceCategories: ['APA', 'CME'],
          featured: true,
          createdAt: new Date('2024-09-01'),
          updatedAt: new Date('2024-10-15'),
          status: 'published',
          modules: [
            {
              id: 1,
              title: 'Foundations',
              lessons: 8
            },
            {
              id: 2,
              title: 'Clinical Applications',
              lessons: 10
            },
            {
              id: 3,
              title: 'Ethics & Integration',
              lessons: 6
            }
          ]
        },
        {
          id: 2,
          title: 'MDMA-Assisted Therapy for PTSD',
          slug: 'mdma-therapy-ptsd',
          description: 'Learn the latest research and clinical protocols for MDMA-assisted therapy in treating PTSD, based on MAPS Phase 3 trials.',
          instructor: {
            id: 4,
            name: 'Dr. Michael Chen',
            avatar_url: 'https://i.pravatar.cc/150?img=7',
            credentials: 'MD, Psychiatry',
            verified: true
          },
          category: 'clinical-research',
          level: 'intermediate',
          thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
          duration: '6 weeks',
          lessonsCount: 18,
          studentsEnrolled: 89,
          rating: 4.9,
          ratingCount: 45,
          price: 299,
          ceCredits: 12,
          ceCategories: ['CME', 'CNE'],
          featured: true,
          createdAt: new Date('2024-08-15'),
          updatedAt: new Date('2024-10-10'),
          status: 'published',
          modules: [
            {
              id: 1,
              title: 'MDMA Pharmacology',
              lessons: 6
            },
            {
              id: 2,
              title: 'Clinical Protocol',
              lessons: 8
            },
            {
              id: 3,
              title: 'Case Studies',
              lessons: 4
            }
          ]
        },
        {
          id: 3,
          title: 'Neuroscience of Psychedelics',
          slug: 'neuroscience-psychedelics',
          description: 'Deep dive into the neuroscientific mechanisms of psychedelic compounds, including receptor pharmacology and neuroplasticity.',
          instructor: {
            id: 5,
            name: 'Prof. Sarah Rodriguez',
            avatar_url: 'https://i.pravatar.cc/150?img=9',
            credentials: 'PhD, Neuroscience',
            verified: true
          },
          category: 'neuroscience',
          level: 'advanced',
          thumbnail: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400',
          duration: '10 weeks',
          lessonsCount: 30,
          studentsEnrolled: 67,
          rating: 4.7,
          ratingCount: 34,
          price: 399,
          ceCredits: 20,
          ceCategories: ['CME'],
          featured: false,
          createdAt: new Date('2024-07-20'),
          updatedAt: new Date('2024-09-30'),
          status: 'published',
          modules: [
            {
              id: 1,
              title: 'Receptor Pharmacology',
              lessons: 10
            },
            {
              id: 2,
              title: 'Neural Networks',
              lessons: 10
            },
            {
              id: 3,
              title: 'Clinical Implications',
              lessons: 10
            }
          ]
        },
        {
          id: 4,
          title: 'Harm Reduction & Safety Protocols',
          slug: 'harm-reduction-safety',
          description: 'Essential harm reduction strategies, contraindications, and safety protocols for psychedelic work in clinical and ceremonial settings.',
          instructor: {
            id: 6,
            name: 'Emily Johnson',
            avatar_url: 'https://i.pravatar.cc/150?img=10',
            credentials: 'MSW, Harm Reduction Specialist',
            verified: true
          },
          category: 'harm-reduction',
          level: 'beginner',
          thumbnail: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400',
          duration: '4 weeks',
          lessonsCount: 12,
          studentsEnrolled: 203,
          rating: 4.9,
          ratingCount: 98,
          price: 0, // Free
          ceCredits: 8,
          ceCategories: ['Social Work'],
          featured: true,
          createdAt: new Date('2024-09-10'),
          updatedAt: new Date('2024-10-20'),
          status: 'published',
          modules: [
            {
              id: 1,
              title: 'Risk Assessment',
              lessons: 4
            },
            {
              id: 2,
              title: 'Safety Protocols',
              lessons: 4
            },
            {
              id: 3,
              title: 'Emergency Response',
              lessons: 4
            }
          ]
        }
      ];

      setCourses(mockCourses);
      setLoading(false);
    }, 800);
  };

  // Filter and sort courses
  const filteredCourses = courses.filter(course => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = course.title.toLowerCase().includes(query);
      const matchesDescription = course.description.toLowerCase().includes(query);
      const matchesInstructor = course.instructor.name.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDescription && !matchesInstructor) {
        return false;
      }
    }

    // Category filter
    if (filterCategory !== 'all' && course.category !== filterCategory) {
      return false;
    }

    // Level filter
    if (filterLevel !== 'all' && course.level !== filterLevel) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'popular':
        return b.studentsEnrolled - a.studentsEnrolled;
      case 'rating':
        return b.rating - a.rating;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleCreateCourse = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setCreateDialogOpen(true);
  };

  const handleCourseCreated = (newCourse) => {
    setCourses([newCourse, ...courses]);
    setCreateDialogOpen(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        {/* Header */}
        <Box
          sx={{
            mb: 4,
            animation: `${fadeInUp} 0.6s ease-out`
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Typography variant="h3" fontWeight="bold">
              Courses
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Community-driven online courses for psychedelic education and professional development.
            Earn CE credits while learning from experts.
          </Typography>

          {/* Create Course Button */}
          {currentUser && (
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={handleCreateCourse}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 4
              }}
            >
              Create Course
            </Button>
          )}
        </Box>

        {/* Search and Filters */}
        <Card sx={{ mb: 4, animation: `${fadeInUp} 0.6s ease-out 0.1s backwards` }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              {/* Search */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              {/* Category Filter */}
              <Grid item xs={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    label="Category"
                  >
                    {categories.map(cat => (
                      <MenuItem key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat.replace(/-/g, ' ')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Level Filter */}
              <Grid item xs={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Level</InputLabel>
                  <Select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    label="Level"
                  >
                    {levels.map(level => (
                      <MenuItem key={level} value={level}>
                        {level === 'all' ? 'All Levels' : level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Sort */}
              <Grid item xs={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                  >
                    <MenuItem value="recent">Most Recent</MenuItem>
                    <MenuItem value="popular">Most Popular</MenuItem>
                    <MenuItem value="rating">Highest Rated</MenuItem>
                    <MenuItem value="title">Title A-Z</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* View Toggle */}
              <Grid item xs={6} md={2}>
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(e, newMode) => newMode && setViewMode(newMode)}
                  size="small"
                  fullWidth
                >
                  <ToggleButton value="grid">
                    <GridIcon />
                  </ToggleButton>
                  <ToggleButton value="list">
                    <ListIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>

            {/* Active Filters */}
            {(filterCategory !== 'all' || filterLevel !== 'all' || searchQuery) && (
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {searchQuery && (
                  <Chip
                    label={`Search: "${searchQuery}"`}
                    onDelete={() => setSearchQuery('')}
                    size="small"
                  />
                )}
                {filterCategory !== 'all' && (
                  <Chip
                    label={`Category: ${filterCategory.replace(/-/g, ' ')}`}
                    onDelete={() => setFilterCategory('all')}
                    size="small"
                  />
                )}
                {filterLevel !== 'all' && (
                  <Chip
                    label={`Level: ${filterLevel}`}
                    onDelete={() => setFilterLevel('all')}
                    size="small"
                  />
                )}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
        </Typography>

        {/* Courses Grid/List */}
        {loading ? (
          <Typography>Loading courses...</Typography>
        ) : filteredCourses.length === 0 ? (
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <SchoolIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No courses found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {filteredCourses.map((course, index) => (
              <Grid
                item
                xs={12}
                sm={viewMode === 'grid' ? 6 : 12}
                md={viewMode === 'grid' ? 4 : 12}
                key={course.id}
                sx={{
                  animation: `${fadeInUp} 0.6s ease-out ${0.2 + index * 0.1}s backwards`
                }}
              >
                <CourseCard course={course} viewMode={viewMode} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Create Course Dialog */}
      <CreateCourseDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCourseCreated={handleCourseCreated}
      />
    </Box>
  );
};

export default Courses;
