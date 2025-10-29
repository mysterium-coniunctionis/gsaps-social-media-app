import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Button,
  Chip,
  Divider,
  IconButton,
  Collapse,
  Grid,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import {
  PlayCircle as PlayIcon,
  CheckCircle as CompleteIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
  Article as ArticleIcon,
  Quiz as QuizIcon,
  Description as DocumentIcon,
  ArrowBack as BackIcon,
  ArrowForward as NextIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import COMPREHENSIVE_COURSES from '../../data/coursesData';

/**
 * CoursePlayer Component
 * Interactive learning interface for enrolled students
 */
const CoursePlayer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { awardXP } = useGamification();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [expandedModules, setExpandedModules] = useState([0]); // First module expanded by default
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundCourse = COMPREHENSIVE_COURSES.find(
        c => c.id === parseInt(courseId) || c.slug === courseId
      );

      if (foundCourse) {
        setCourse(foundCourse);
        // Load progress from localStorage
        const savedProgress = localStorage.getItem(`course_progress_${foundCourse.id}`);
        if (savedProgress) {
          const progress = JSON.parse(savedProgress);
          setCompletedLessons(new Set(progress.completed || []));
          setCurrentModule(progress.currentModule || 0);
          setCurrentLesson(progress.currentLesson || 0);
        }
      }
      setLoading(false);
    }, 500);
  }, [courseId]);

  useEffect(() => {
    // Save progress whenever it changes
    if (course) {
      const progress = {
        completed: Array.from(completedLessons),
        currentModule,
        currentLesson,
        lastAccessed: new Date().toISOString()
      };
      localStorage.setItem(`course_progress_${course.id}`, JSON.stringify(progress));
    }
  }, [course, completedLessons, currentModule, currentLesson]);

  const handleModuleToggle = (moduleIndex) => {
    setExpandedModules(prev =>
      prev.includes(moduleIndex)
        ? prev.filter(i => i !== moduleIndex)
        : [...prev, moduleIndex]
    );
  };

  const handleLessonSelect = (moduleIndex, lessonIndex) => {
    setCurrentModule(moduleIndex);
    setCurrentLesson(lessonIndex);
  };

  const handleCompleteLesson = () => {
    const lessonId = `${currentModule}-${currentLesson}`;
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonId);
    setCompletedLessons(newCompleted);

    // Award XP for completing lesson
    awardXP('COMPLETE_LESSON', { amount: 20 });

    // Auto-advance to next lesson
    handleNextLesson();
  };

  const handleNextLesson = () => {
    const currentModuleLessons = course.syllabus[currentModule].lessons;

    if (currentLesson < currentModuleLessons.length - 1) {
      // Next lesson in same module
      setCurrentLesson(currentLesson + 1);
    } else if (currentModule < course.syllabus.length - 1) {
      // First lesson of next module
      setCurrentModule(currentModule + 1);
      setCurrentLesson(0);
      setExpandedModules(prev => [...prev, currentModule + 1]);
    } else {
      // Course completed!
      awardXP('COMPLETE_COURSE', { amount: 150 });
      alert('Congratulations! You have completed the course!');
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      // Previous lesson in same module
      setCurrentLesson(currentLesson - 1);
    } else if (currentModule > 0) {
      // Last lesson of previous module
      setCurrentModule(currentModule - 1);
      setCurrentLesson(course.syllabus[currentModule - 1].lessons.length - 1);
    }
  };

  const isLessonCompleted = (moduleIndex, lessonIndex) => {
    return completedLessons.has(`${moduleIndex}-${lessonIndex}`);
  };

  const calculateProgress = () => {
    if (!course) return 0;
    const totalLessons = course.syllabus.reduce((acc, mod) => acc + mod.lessons.length, 0);
    return Math.round((completedLessons.size / totalLessons) * 100);
  };

  const getLessonIcon = (lessonType) => {
    switch (lessonType) {
      case 'video':
        return <PlayIcon />;
      case 'quiz':
        return <QuizIcon />;
      case 'reading':
        return <ArticleIcon />;
      default:
        return <DocumentIcon />;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!course) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          Course not found. Please check the URL and try again.
        </Alert>
        <Button onClick={() => navigate('/courses')} sx={{ mt: 2 }}>
          Back to Courses
        </Button>
      </Container>
    );
  }

  const activeLessonData = course.syllabus[currentModule]?.lessons[currentLesson];

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Sidebar - Course Navigation */}
      <Box
        sx={{
          width: showSidebar ? 320 : 0,
          transition: 'width 0.3s',
          overflow: 'auto',
          borderRight: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        {showSidebar && (
          <Box sx={{ p: 2 }}>
            {/* Course Header */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" fontWeight="bold" noWrap>
                {course.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {course.instructor.name}
              </Typography>
            </Box>

            {/* Progress */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Course Progress
                </Typography>
                <Typography variant="caption" fontWeight="bold">
                  {calculateProgress()}%
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={calculateProgress()} sx={{ height: 8, borderRadius: 1 }} />
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Module List */}
            <List dense>
              {course.syllabus.map((module, moduleIndex) => (
                <Box key={module.moduleId}>
                  <ListItem
                    disablePadding
                    sx={{
                      bgcolor: moduleIndex === currentModule ? 'action.selected' : 'transparent',
                      borderRadius: 1,
                      mb: 0.5
                    }}
                  >
                    <ListItemButton onClick={() => handleModuleToggle(moduleIndex)}>
                      <ListItemText
                        primary={`Module ${moduleIndex + 1}: ${module.title}`}
                        primaryTypographyProps={{
                          variant: 'subtitle2',
                          fontWeight: 'bold'
                        }}
                      />
                      {expandedModules.includes(moduleIndex) ? <CollapseIcon /> : <ExpandIcon />}
                    </ListItemButton>
                  </ListItem>

                  <Collapse in={expandedModules.includes(moduleIndex)} timeout="auto">
                    <List component="div" disablePadding dense>
                      {module.lessons.map((lesson, lessonIndex) => {
                        const isCompleted = isLessonCompleted(moduleIndex, lessonIndex);
                        const isActive = moduleIndex === currentModule && lessonIndex === currentLesson;

                        return (
                          <ListItem
                            key={lesson.lessonId}
                            disablePadding
                            sx={{ pl: 3 }}
                          >
                            <ListItemButton
                              selected={isActive}
                              onClick={() => handleLessonSelect(moduleIndex, lessonIndex)}
                              sx={{ borderRadius: 1 }}
                            >
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                {isCompleted ? (
                                  <CompleteIcon color="success" fontSize="small" />
                                ) : (
                                  getLessonIcon(lesson.type)
                                )}
                              </ListItemIcon>
                              <ListItemText
                                primary={lesson.title}
                                secondary={lesson.duration}
                                primaryTypographyProps={{
                                  variant: 'body2',
                                  noWrap: true
                                }}
                                secondaryTypographyProps={{
                                  variant: 'caption'
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </Box>
              ))}
            </List>
          </Box>
        )}
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Bar */}
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 0,
            boxShadow: 1
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => setShowSidebar(!showSidebar)}>
              <MenuIcon />
            </IconButton>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {activeLessonData?.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Module {currentModule + 1}, Lesson {currentLesson + 1}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<BackIcon />}
            onClick={() => navigate(`/courses/${course.slug}`)}
          >
            Exit Course
          </Button>
        </Paper>

        {/* Lesson Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 4, bgcolor: 'background.default' }}>
          <Container maxWidth="md">
            <Grid container spacing={3}>
              {/* Main Lesson Content */}
              <Grid item xs={12}>
                <Card>
                  <CardContent sx={{ p: 4 }}>
                    {/* Lesson Type Chip */}
                    <Box sx={{ mb: 3 }}>
                      <Chip
                        icon={getLessonIcon(activeLessonData?.type)}
                        label={activeLessonData?.type?.toUpperCase()}
                        color="primary"
                        size="small"
                      />
                      <Chip
                        label={activeLessonData?.duration}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Box>

                    {/* Lesson Title */}
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                      {activeLessonData?.title}
                    </Typography>

                    {/* Lesson Content */}
                    <Box sx={{ my: 4 }}>
                      {activeLessonData?.type === 'video' && (
                        <Paper
                          sx={{
                            aspectRatio: '16/9',
                            bgcolor: 'grey.900',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3
                          }}
                        >
                          <PlayIcon sx={{ fontSize: 80, color: 'grey.400' }} />
                        </Paper>
                      )}

                      <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                        {activeLessonData?.content}
                      </Typography>

                      {/* Resources */}
                      {activeLessonData?.resources && activeLessonData.resources.length > 0 && (
                        <Box sx={{ mt: 4 }}>
                          <Typography variant="h6" gutterBottom fontWeight="bold">
                            Additional Resources
                          </Typography>
                          <List>
                            {activeLessonData.resources.map((resource, index) => (
                              <ListItem key={index} divider>
                                <ListItemIcon>
                                  <DocumentIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary={resource.title || resource}
                                  secondary={resource.description || 'Resource'}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Bottom Navigation */}
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: 0,
            boxShadow: 3
          }}
        >
          <Button
            startIcon={<BackIcon />}
            onClick={handlePreviousLesson}
            disabled={currentModule === 0 && currentLesson === 0}
          >
            Previous Lesson
          </Button>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {!isLessonCompleted(currentModule, currentLesson) && (
              <Button
                variant="contained"
                color="success"
                startIcon={<CompleteIcon />}
                onClick={handleCompleteLesson}
              >
                Mark Complete
              </Button>
            )}
            <Button
              variant="contained"
              endIcon={<NextIcon />}
              onClick={handleNextLesson}
              disabled={
                currentModule === course.syllabus.length - 1 &&
                currentLesson === course.syllabus[currentModule].lessons.length - 1
              }
            >
              Next Lesson
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default CoursePlayer;
