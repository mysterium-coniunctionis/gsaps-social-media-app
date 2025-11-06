import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Tab,
  Tabs,
  Rating,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  AccessTime as TimeIcon,
  People as PeopleIcon,
  Star as StarIcon,
  PlayCircleOutline as VideoIcon,
  Description as ReadingIcon,
  Quiz as QuizIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CompleteIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  VerifiedUser as VerifiedIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import COMPREHENSIVE_COURSES from '../../data/coursesData';
import { fadeInUp } from '../../theme/animations';

/**
 * Course Detail Page
 * Displays comprehensive course information, syllabus, and enrollment
 */
const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { awardXP, updateStat } = useGamification();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Find course by ID or slug
    setTimeout(() => {
      const foundCourse = COMPREHENSIVE_COURSES.find(
        c => c.id === parseInt(courseId) || c.slug === courseId
      );

      if (foundCourse) {
        setCourse(foundCourse);
        // Check if user is enrolled (mock - would check against user's enrolled courses)
        setIsEnrolled(Math.random() > 0.5);
        setIsBookmarked(Math.random() > 0.5);
      }

      setLoading(false);
    }, 600);
  }, [courseId]);

  const handleEnroll = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setIsEnrolled(true);

    // Award XP for enrolling in course
    awardXP('ENROLL_COURSE'); // +20 XP for enrolling
    updateStat('courses_enrolled');

    // Bonus XP if it's a paid course
    if (course.price > 0) {
      awardXP('ENROLL_PAID_COURSE'); // +10 XP bonus
    }

    // Bonus XP for CE course
    if (course.ceCredits > 0) {
      awardXP('ENROLL_CE_COURSE'); // +15 XP bonus
    }

    alert(`Successfully enrolled in ${course.title}! You've earned XP!`);
  };

  const handleUnenroll = () => {
    if (window.confirm('Are you sure you want to unenroll from this course?')) {
      setIsEnrolled(false);
      alert('Unenrolled successfully');
    }
  };

  const handleBookmark = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setIsBookmarked(!isBookmarked);

    if (!isBookmarked) {
      awardXP('BOOKMARK_COURSE'); // +5 XP for bookmarking
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.shortDescription,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video':
        return <VideoIcon fontSize="small" />;
      case 'reading':
        return <ReadingIcon fontSize="small" />;
      case 'quiz':
        return <QuizIcon fontSize="small" />;
      case 'assignment':
        return <AssignmentIcon fontSize="small" />;
      default:
        return <ReadingIcon fontSize="small" />;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!course) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <SchoolIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Course not found
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            The course you're looking for doesn't exist or has been removed.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/courses')}
            sx={{ mt: 2 }}
          >
            Browse All Courses
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        {/* Course Header */}
        <Card
          sx={{
            mb: 3,
            animation: `${fadeInUp} 0.6s ease-out`
          }}
        >
          <CardContent>
            <Grid container spacing={3}>
              {/* Left Column - Course Info */}
              <Grid item xs={12} md={8}>
                {/* Category & Featured Badge */}
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={course.category.replace(/-/g, ' ')}
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={course.level}
                    variant="outlined"
                    size="small"
                  />
                  {course.featured && (
                    <Chip
                      icon={<StarIcon />}
                      label="Featured"
                      color="warning"
                      size="small"
                    />
                  )}
                </Box>

                {/* Title */}
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  {course.title}
                </Typography>

                {/* Short Description */}
                <Typography variant="h6" color="text.secondary" paragraph>
                  {course.shortDescription}
                </Typography>

                {/* Rating & Enrollment */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={course.rating} precision={0.1} readOnly />
                    <Typography variant="body2" color="text.secondary">
                      {course.rating} ({course.ratingCount} reviews)
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PeopleIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {course.studentsEnrolled} students
                    </Typography>
                  </Box>
                </Box>

                {/* Instructor */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
                  <Avatar
                    src={course.instructor.avatar_url}
                    alt={course.instructor.name}
                    sx={{ width: 56, height: 56 }}
                  />
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {course.instructor.name}
                      </Typography>
                      {course.instructor.verified && (
                        <Tooltip title="Verified Instructor">
                          <VerifiedIcon fontSize="small" color="primary" />
                        </Tooltip>
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {course.instructor.credentials}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Right Column - Enrollment Card */}
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    {/* Price */}
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                      {course.price === 0 ? 'Free' : `$${course.price}`}
                    </Typography>

                    {/* Course Stats */}
                    <List dense sx={{ mb: 2 }}>
                      <ListItem disableGutters>
                        <TimeIcon fontSize="small" sx={{ mr: 1 }} color="action" />
                        <ListItemText
                          primary="Duration"
                          secondary={course.duration}
                        />
                      </ListItem>
                      <ListItem disableGutters>
                        <SchoolIcon fontSize="small" sx={{ mr: 1 }} color="action" />
                        <ListItemText
                          primary="Lessons"
                          secondary={`${course.lessonsCount} lessons`}
                        />
                      </ListItem>
                      {course.ceCredits > 0 && (
                        <ListItem disableGutters>
                          <VerifiedIcon fontSize="small" sx={{ mr: 1 }} color="action" />
                          <ListItemText
                            primary="CE Credits"
                            secondary={`${course.ceCredits} credits (${course.ceCategories.join(', ')})`}
                          />
                        </ListItem>
                      )}
                      <ListItem disableGutters>
                        <TimeIcon fontSize="small" sx={{ mr: 1 }} color="action" />
                        <ListItemText
                          primary="Total Hours"
                          secondary={`${course.totalHours} hours`}
                        />
                      </ListItem>
                    </List>

                    {/* Enroll Button */}
                    {isEnrolled ? (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth
                          size="large"
                          startIcon={<CompleteIcon />}
                          sx={{ mb: 1 }}
                          onClick={() => navigate(`/courses/${course.slug}/learn`)}
                        >
                          Continue Learning
                        </Button>
                        <Button
                          variant="outlined"
                          fullWidth
                          size="small"
                          onClick={handleUnenroll}
                        >
                          Unenroll
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        onClick={handleEnroll}
                        sx={{ mb: 1 }}
                      >
                        {course.price === 0 ? 'Enroll for Free' : `Enroll for $${course.price}`}
                      </Button>
                    )}

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <Tooltip title={isBookmarked ? "Remove Bookmark" : "Bookmark Course"}>
                        <IconButton onClick={handleBookmark} size="small">
                          {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Share Course">
                        <IconButton onClick={handleShare} size="small">
                          <ShareIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card sx={{ mb: 3, animation: `${fadeInUp} 0.6s ease-out 0.1s backwards` }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
          >
            <Tab label="Overview" />
            <Tab label="Curriculum" />
            <Tab label="Instructor" />
            <Tab label="Reviews" />
          </Tabs>
        </Card>

        {/* Tab Content */}
        <Box sx={{ animation: `${fadeInUp} 0.6s ease-out 0.2s backwards` }}>
          {/* Overview Tab */}
          {activeTab === 0 && (
            <Card>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  About This Course
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ whiteSpace: 'pre-line' }}
                >
                  {course.fullDescription}
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* Learning Outcomes */}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  What You'll Learn
                </Typography>
                <List>
                  {course.learningOutcomes.map((outcome, index) => (
                    <ListItem key={index}>
                      <CompleteIcon color="success" sx={{ mr: 2 }} />
                      <ListItemText primary={outcome} />
                    </ListItem>
                  ))}
                </List>

                {course.prerequisites && course.prerequisites.length > 0 && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Prerequisites
                    </Typography>
                    <List>
                      {course.prerequisites.map((prereq, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={prereq} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Curriculum Tab */}
          {activeTab === 1 && (
            <Card>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Course Curriculum
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.syllabus.length} modules • {course.lessonsCount} lessons • {course.totalHours} total hours
                </Typography>

                {/* Module Accordions */}
                {course.syllabus.map((module, moduleIndex) => (
                  <Accordion
                    key={module.moduleId}
                    defaultExpanded={moduleIndex === 0}
                    sx={{ mb: 1 }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="h6" fontWeight="bold">
                          {module.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {module.duration} • {module.lessons.length} lessons
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* Module Description */}
                      {module.description && (
                        <Typography variant="body2" paragraph>
                          {module.description}
                        </Typography>
                      )}

                      {/* Learning Objectives */}
                      {module.learningObjectives && (
                        <>
                          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                            Learning Objectives:
                          </Typography>
                          <List dense sx={{ mb: 2 }}>
                            {module.learningObjectives.map((obj, idx) => (
                              <ListItem key={idx}>
                                <ListItemText
                                  primary={obj}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </>
                      )}

                      {/* Lessons */}
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        Lessons:
                      </Typography>
                      <List dense>
                        {module.lessons.map((lesson, lessonIndex) => (
                          <ListItem
                            key={lesson.lessonId}
                            sx={{
                              bgcolor: lessonIndex % 2 === 0 ? 'action.hover' : 'transparent',
                              borderRadius: 1
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                              {getLessonIcon(lesson.type)}
                              <ListItemText
                                primary={`${lessonIndex + 1}. ${lesson.title}`}
                                secondary={lesson.content}
                                secondaryTypographyProps={{
                                  variant: 'caption',
                                  sx: { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }
                                }}
                              />
                              <Chip
                                label={lesson.duration}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Instructor Tab */}
          {activeTab === 2 && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                  <Avatar
                    src={course.instructor.avatar_url}
                    alt={course.instructor.name}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h4" fontWeight="bold">
                        {course.instructor.name}
                      </Typography>
                      {course.instructor.verified && (
                        <VerifiedIcon color="primary" />
                      )}
                    </Box>
                    <Typography variant="h6" color="text.secondary">
                      {course.instructor.credentials}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Biography
                </Typography>
                <Typography variant="body1" paragraph>
                  {course.instructor.bio}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Reviews Tab */}
          {activeTab === 3 && (
            <Card>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Student Reviews
                </Typography>

                {/* Overall Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" fontWeight="bold">
                      {course.rating}
                    </Typography>
                    <Rating value={course.rating} precision={0.1} readOnly />
                    <Typography variant="body2" color="text.secondary">
                      {course.ratingCount} reviews
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <Box key={stars} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="body2" sx={{ width: 60 }}>
                          {stars} stars
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={stars === 5 ? 75 : stars === 4 ? 20 : 5}
                          sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ width: 40 }}>
                          {stars === 5 ? '75%' : stars === 4 ? '20%' : '5%'}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Typography variant="body1" color="text.secondary">
                  Reviews coming soon! Enroll in this course to be the first to leave a review.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default CourseDetail;
