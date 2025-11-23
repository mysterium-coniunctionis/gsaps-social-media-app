import React, { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Chip as MuiChip
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  ViewModule as GridIcon,
  ViewList as ListIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { fetchCourses } from '../../api/backend';
import CourseCard from '../../components/courses/CourseCard';
import CreateCourseDialog from '../../components/courses/CreateCourseDialog';
import { fadeInUp } from '../../theme/animations';

const Courses = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  // TODO: Implement useExperiment hook for A/B testing
  const courseVariant = 'control'; // useExperiment('course-feed', ['control', 'personalized']);

  const { data: courses = [], isLoading } = useQuery({ queryKey: ['courses'], queryFn: fetchCourses });

  const categories = ['all', 'psychedelic-therapy', 'neuroscience', 'clinical-research', 'integration'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced', 'professional'];

  const normalizedCourses = useMemo(
    () =>
      courses.map((course) => ({
        ...course,
        slug: `course-${course.id}`,
        thumbnail: course.thumbnail || 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&w=800&q=60',
        instructor: course.instructor || {
          name: 'GSAPS Faculty',
          avatar_url: course.avatarUrl || 'https://i.pravatar.cc/150?img=32',
          verified: true
        },
        duration: course.duration || 'Self-paced',
        modules: course.modules || []
      })),
    [courses]
  );

  const filteredCourses = normalizedCourses
    .filter((course) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDescription = course.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDescription) return false;
      }
      if (filterCategory !== 'all' && course.category !== filterCategory) return false;
      if (filterLevel !== 'all' && course.level !== filterLevel) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'popular') return (b.enrollments || 0) - (a.enrollments || 0);
      return a.title.localeCompare(b.title);
    });

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ animation: `${fadeInUp} 0.4s ease-out` }}>
              Courses
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Learn with curated psychedelic therapy and research content.
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateDialogOpen(true)}>
            Create course
          </Button>
        </Box>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                placeholder="Search courses"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                size="small"
                sx={{ minWidth: 260 }}
              />

              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Category</InputLabel>
                <Select value={filterCategory} label="Category" onChange={(e) => setFilterCategory(e.target.value)}>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Level</InputLabel>
                <Select value={filterLevel} label="Level" onChange={(e) => setFilterLevel(e.target.value)}>
                  {levels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Sort by</InputLabel>
                <Select value={sortBy} label="Sort by" onChange={(e) => setSortBy(e.target.value)}>
                  <MenuItem value="recent">Most recent</MenuItem>
                  <MenuItem value="popular">Most popular</MenuItem>
                  <MenuItem value="alpha">A-Z</MenuItem>
                </Select>
              </FormControl>

              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, value) => value && setViewMode(value)}
                aria-label="view mode"
                size="small"
              >
                <ToggleButton value="grid" aria-label="grid view">
                  <GridIcon />
                </ToggleButton>
                <ToggleButton value="list" aria-label="list view">
                  <ListIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </CardContent>
        </Card>

        {isLoading ? (
          <Card>
            <CardContent>
              <Typography>Loading courses...</Typography>
            </CardContent>
          </Card>
        ) : filteredCourses.length === 0 ? (
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <SchoolIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
              <Typography variant="h6">No courses found</Typography>
              <Typography variant="body2" color="text.secondary">
                Adjust filters or try another search.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {filteredCourses.map((course, index) => (
              <Grid item xs={12} sm={viewMode === 'grid' ? 6 : 12} key={course.id} sx={{ animation: `${fadeInUp} 0.3s ease-out ${index * 0.05}s backwards` }}>
                <CourseCard course={course} viewMode={viewMode} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <CreateCourseDialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} />
    </Box>
  );
};

export default Courses;
