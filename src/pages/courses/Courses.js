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
import { useGamification } from '../../context/GamificationContext';
import COMPREHENSIVE_COURSES from '../../data/coursesData';

/**
 * Courses Page - Main LMS course listing
 * Browse, search, and enroll in courses
 */
const Courses = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { awardXP, updateStat } = useGamification();
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

    // Use comprehensive course data from coursesData.js
    setTimeout(() => {
      // Map comprehensive courses to expected format
      const courses = COMPREHENSIVE_COURSES.map(course => ({
        ...course,
        description: course.shortDescription,
        // Ensure createdAt and updatedAt are Date objects
        createdAt: course.createdAt || new Date('2024-09-01'),
        updatedAt: course.updatedAt || new Date('2024-10-20'),
        status: course.status || 'published',
        // Map syllabus to modules format for display
        modules: course.syllabus ? course.syllabus.map(module => ({
          id: module.moduleId,
          title: module.title,
          lessons: module.lessons.length
        })) : []
      }));

      setCourses(courses);
      setLoading(false);
    }, 600);
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

    // Award XP for creating course (major contribution!)
    awardXP('CREATE_COURSE'); // +100 XP for creating a course
    updateStat('courses_created');

    // Bonus XP if course offers CE credits
    if (newCourse.ceCredits && newCourse.ceCredits > 0) {
      awardXP('COURSE_WITH_CE'); // +25 XP bonus for offering CE credits
    }
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
