import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  AppBar,
  Toolbar,
  Chip,
  Dialog,
  DialogContent,
  Alert,
  Divider,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Menu as MenuIcon,
  CheckCircle as CheckIcon,
  RadioButtonUnchecked as UncheckedIcon,
  PlayCircle as VideoIcon,
  Article as TextIcon,
  Quiz as QuizIcon,
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
  EmojiEvents as TrophyIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchCourseEnrollment,
  fetchLesson,
  completeLesson,
  updateLessonWatchTime,
  submitQuizResult,
  completeCourse
} from '../../api/backend';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Quiz from '../../components/courses/Quiz';
import Certificate from '../../components/courses/Certificate';
import { useGamification } from '../../context/GamificationContext';

const DRAWER_WIDTH = 320;
const VIDEO_COMPLETE_THRESHOLD = 0.8; // 80% watched to mark complete

const CoursePlayer = () => {
  const navigate = useNavigate();
  const { courseId, lessonId: urlLessonId } = useParams();
  const queryClient = useQueryClient();
  const { awardXP } = useGamification();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [completionData, setCompletionData] = useState(null);
  const videoRef = useRef(null);
  const watchTimeRef = useRef(0);

  // Fetch enrollment data with progress
  const { data: enrollment, isLoading: enrollmentLoading } = useQuery({
    queryKey: ['enrollment', courseId],
    queryFn: () => fetchCourseEnrollment(courseId),
    retry: false
  });

  // Fetch current lesson
  const { data: currentLesson, isLoading: lessonLoading } = useQuery({
    queryKey: ['lesson', courseId, currentLessonId],
    queryFn: () => fetchLesson(courseId, currentLessonId),
    enabled: !!currentLessonId
  });

  // Set initial lesson
  useEffect(() => {
    if (enrollment?.lessons && !currentLessonId) {
      if (urlLessonId) {
        setCurrentLessonId(parseInt(urlLessonId));
      } else {
        // Find first incomplete lesson or start at beginning
        const firstIncomplete = enrollment.lessons.find(l => !l.completed);
        setCurrentLessonId(firstIncomplete?.id || enrollment.lessons[0]?.id);
      }
    }
  }, [enrollment, currentLessonId, urlLessonId]);

  // Complete lesson mutation
  const completeLessonMutation = useMutation({
    mutationFn: ({ lessonId, watchTime }) => completeLesson(courseId, lessonId, watchTime),
    onSuccess: () => {
      queryClient.invalidateQueries(['enrollment', courseId]);
      awardXP('COMPLETE_LESSON');
    }
  });

  // Update watch time mutation
  const updateWatchTimeMutation = useMutation({
    mutationFn: ({ lessonId, watchTime }) => updateLessonWatchTime(courseId, lessonId, watchTime)
  });

  // Submit quiz mutation
  const submitQuizMutation = useMutation({
    mutationFn: ({ lessonId, score, answers }) => submitQuizResult(courseId, lessonId, score, answers),
    onSuccess: () => {
      queryClient.invalidateQueries(['enrollment', courseId]);
    }
  });

  // Complete course mutation
  const completeCourseM = useMutation({
    mutationFn: () => completeCourse(courseId),
    onSuccess: (data) => {
      setCompletionData(data);
      setShowCertificate(true);
      queryClient.invalidateQueries(['enrollment', courseId]);
    }
  });

  // Video progress tracking
  const handleVideoTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const currentTime = Math.floor(videoRef.current.currentTime);
      if (currentTime > watchTimeRef.current) {
        watchTimeRef.current = currentTime;
      }

      // Check if video is 80% complete
      const duration = videoRef.current.duration;
      if (duration && currentTime / duration >= VIDEO_COMPLETE_THRESHOLD) {
        const lessonData = enrollment?.lessons?.find(l => l.id === currentLessonId);
        if (lessonData && !lessonData.completed) {
          completeLessonMutation.mutate({ lessonId: currentLessonId, watchTime: currentTime });
        }
      }
    }
  }, [currentLessonId, enrollment, completeLessonMutation]);

  // Save watch time on unmount or lesson change
  useEffect(() => {
    return () => {
      if (watchTimeRef.current > 0 && currentLessonId) {
        updateWatchTimeMutation.mutate({ lessonId: currentLessonId, watchTime: watchTimeRef.current });
      }
    };
  }, [currentLessonId, updateWatchTimeMutation]);

  const handleLessonSelect = (lessonId) => {
    // Save watch time before switching
    if (watchTimeRef.current > 0 && currentLessonId) {
      updateWatchTimeMutation.mutate({ lessonId: currentLessonId, watchTime: watchTimeRef.current });
    }
    watchTimeRef.current = 0;
    setCurrentLessonId(lessonId);
    if (isMobile) setDrawerOpen(false);
  };

  const handleMarkComplete = () => {
    completeLessonMutation.mutate({ lessonId: currentLessonId, watchTime: watchTimeRef.current });
  };

  const handleQuizComplete = (result) => {
    submitQuizMutation.mutate({
      lessonId: currentLessonId,
      score: result.score,
      answers: result.answers || {}
    });
  };

  const handleNextLesson = () => {
    const currentIndex = enrollment?.lessons?.findIndex(l => l.id === currentLessonId);
    if (currentIndex !== undefined && currentIndex < enrollment.lessons.length - 1) {
      handleLessonSelect(enrollment.lessons[currentIndex + 1].id);
    }
  };

  const handlePrevLesson = () => {
    const currentIndex = enrollment?.lessons?.findIndex(l => l.id === currentLessonId);
    if (currentIndex !== undefined && currentIndex > 0) {
      handleLessonSelect(enrollment.lessons[currentIndex - 1].id);
    }
  };

  const handleCompleteCourse = () => {
    completeCourseM.mutate();
  };

  const getLessonIcon = (lesson) => {
    if (lesson.completed) return <CheckIcon color="success" />;
    switch (lesson.contentType) {
      case 'video': return <VideoIcon />;
      case 'text': return <TextIcon />;
      case 'quiz': return lesson.quizPassed ? <CheckIcon color="success" /> : <QuizIcon />;
      default: return <UncheckedIcon />;
    }
  };

  if (enrollmentLoading) return <LoadingSpinner />;

  if (!enrollment) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Not Enrolled</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          You need to enroll in this course to access lessons.
        </Typography>
        <Button variant="contained" onClick={() => navigate(`/courses/${courseId}`)}>
          Go to Course Page
        </Button>
      </Container>
    );
  }

  const currentLessonData = enrollment.lessons?.find(l => l.id === currentLessonId);
  const currentIndex = enrollment.lessons?.findIndex(l => l.id === currentLessonId);
  const hasNext = currentIndex < enrollment.lessons.length - 1;
  const hasPrev = currentIndex > 0;
  const allLessonsCompleted = enrollment.lessons?.every(l => l.completed);
  const allQuizzesPassed = enrollment.lessons
    ?.filter(l => l.contentType === 'quiz')
    .every(l => l.quizPassed);
  const canCompleteCourse = allLessonsCompleted && allQuizzesPassed && !enrollment.credential;

  // Sidebar content
  const sidebarContent = (
    <Box sx={{ width: DRAWER_WIDTH, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Course Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" color="text.secondary" noWrap>
          Course Progress
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <LinearProgress
            variant="determinate"
            value={enrollment.progress || 0}
            sx={{ flex: 1, height: 8, borderRadius: 1 }}
          />
          <Typography variant="caption" fontWeight="bold">
            {enrollment.progress || 0}%
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {enrollment.lessons?.filter(l => l.completed).length} of {enrollment.lessons?.length} lessons
        </Typography>
      </Box>

      {/* Lesson List */}
      <List sx={{ flex: 1, overflow: 'auto', py: 0 }}>
        {enrollment.lessons?.map((lesson, index) => (
          <ListItem key={lesson.id} disablePadding>
            <ListItemButton
              selected={lesson.id === currentLessonId}
              onClick={() => handleLessonSelect(lesson.id)}
              sx={{
                py: 1.5,
                '&.Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  borderLeft: 3,
                  borderColor: 'primary.main'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {getLessonIcon(lesson)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    fontWeight={lesson.id === currentLessonId ? 'bold' : 'normal'}
                    noWrap
                  >
                    {index + 1}. {lesson.title}
                  </Typography>
                }
                secondary={
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mt: 0.5 }}>
                    <Chip
                      label={lesson.contentType}
                      size="small"
                      sx={{ height: 18, fontSize: '0.65rem' }}
                    />
                    {lesson.duration && (
                      <Typography variant="caption" color="text.secondary">
                        {lesson.duration} min
                      </Typography>
                    )}
                  </Box>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Complete Course Button */}
      {canCompleteCourse && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            startIcon={<TrophyIcon />}
            onClick={handleCompleteCourse}
            disabled={completeCourseM.isPending}
          >
            Complete Course & Get Certificate
          </Button>
        </Box>
      )}

      {/* Already completed */}
      {enrollment.credential && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Alert severity="success" sx={{ mb: 1 }}>
            Course Completed!
          </Alert>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setShowCertificate(true)}
          >
            View Certificate
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: drawerOpen ? DRAWER_WIDTH : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            position: isMobile ? 'fixed' : 'relative',
            height: '100vh'
          }
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header */}
        <AppBar position="sticky" color="default" elevation={1}>
          <Toolbar>
            <IconButton edge="start" onClick={() => setDrawerOpen(!drawerOpen)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <IconButton onClick={() => navigate(`/courses/${courseId}`)} sx={{ mr: 2 }}>
              <BackIcon />
            </IconButton>
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <Typography variant="subtitle1" fontWeight="bold" noWrap>
                {currentLessonData?.title || 'Loading...'}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                Lesson {(currentIndex || 0) + 1} of {enrollment.lessons?.length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton disabled={!hasPrev} onClick={handlePrevLesson}>
                <PrevIcon />
              </IconButton>
              <IconButton disabled={!hasNext} onClick={handleNextLesson}>
                <NextIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Lesson Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 2, md: 4 } }}>
          <Container maxWidth="lg">
            {lessonLoading ? (
              <LoadingSpinner />
            ) : currentLesson ? (
              <>
                {/* Video Lesson */}
                {currentLesson.contentType === 'video' && (
                  <Card sx={{ mb: 3 }}>
                    <Box sx={{ position: 'relative', paddingTop: '56.25%', bgcolor: 'black' }}>
                      {currentLesson.contentUrl ? (
                        <video
                          ref={videoRef}
                          src={currentLesson.contentUrl}
                          controls
                          onTimeUpdate={handleVideoTimeUpdate}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Typography color="white">Video not available</Typography>
                        </Box>
                      )}
                    </Box>
                    <CardContent>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {currentLesson.title}
                      </Typography>
                      {currentLesson.description && (
                        <Typography color="text.secondary">
                          {currentLesson.description}
                        </Typography>
                      )}
                      {!currentLessonData?.completed && (
                        <Button
                          variant="contained"
                          sx={{ mt: 2 }}
                          onClick={handleMarkComplete}
                          disabled={completeLessonMutation.isPending}
                        >
                          Mark as Complete
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Text Lesson */}
                {currentLesson.contentType === 'text' && (
                  <Card sx={{ mb: 3 }}>
                    <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {currentLesson.title}
                      </Typography>
                      <Divider sx={{ my: 3 }} />
                      <Box
                        sx={{
                          '& h1, & h2, & h3': { mt: 4, mb: 2 },
                          '& p': { mb: 2, lineHeight: 1.8 },
                          '& ul, & ol': { mb: 2, pl: 3 },
                          '& li': { mb: 1 }
                        }}
                        dangerouslySetInnerHTML={{
                          __html: currentLesson.content || '<p>No content available</p>'
                        }}
                      />
                      {!currentLessonData?.completed && (
                        <Box sx={{ mt: 4 }}>
                          <Button
                            variant="contained"
                            onClick={handleMarkComplete}
                            disabled={completeLessonMutation.isPending}
                          >
                            Mark as Complete
                          </Button>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Quiz Lesson */}
                {currentLesson.contentType === 'quiz' && (
                  <>
                    {currentLessonData?.quizPassed ? (
                      <Card sx={{ mb: 3 }}>
                        <CardContent sx={{ textAlign: 'center', py: 6 }}>
                          <CheckIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                          <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Quiz Passed!
                          </Typography>
                          <Typography color="text.secondary" sx={{ mb: 2 }}>
                            You scored {currentLessonData.quizScore}% on this quiz.
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Attempts: {currentLessonData.quizAttempts}
                          </Typography>
                          {hasNext && (
                            <Box sx={{ mt: 3 }}>
                              <Button variant="contained" onClick={handleNextLesson}>
                                Continue to Next Lesson
                              </Button>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    ) : currentLesson.quizData ? (
                      <Quiz
                        quizData={currentLesson.quizData}
                        lessonTitle={currentLesson.title}
                        onComplete={handleQuizComplete}
                      />
                    ) : (
                      <Card>
                        <CardContent sx={{ textAlign: 'center', py: 6 }}>
                          <QuizIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                          <Typography>Quiz data not available</Typography>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}

                {/* Completion status */}
                {currentLessonData?.completed && currentLesson.contentType !== 'quiz' && (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography>Lesson completed!</Typography>
                      {hasNext && (
                        <Button size="small" onClick={handleNextLesson}>
                          Next Lesson
                        </Button>
                      )}
                    </Box>
                  </Alert>
                )}
              </>
            ) : (
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 6 }}>
                  <Typography>Select a lesson to begin</Typography>
                </CardContent>
              </Card>
            )}
          </Container>
        </Box>
      </Box>

      {/* Certificate Dialog */}
      <Dialog
        open={showCertificate}
        onClose={() => setShowCertificate(false)}
        maxWidth="lg"
        fullWidth
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={() => setShowCertificate(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {(completionData || enrollment.credential) && (
            <Certificate
              course={{
                id: enrollment.courseId,
                title: completionData?.course?.title || 'Course',
                instructor: { name: completionData?.course?.instructorName || 'GSAPS Faculty' },
                duration: `${enrollment.lessons?.length} lessons`,
                totalHours: Math.round(enrollment.lessons?.reduce((acc, l) => acc + (l.duration || 0), 0) / 60),
                ceCredits: completionData?.credential?.ceCredits || enrollment.credential?.ceCredits
              }}
              completionDate={completionData?.credential?.issuedAt || enrollment.credential?.issuedAt || new Date()}
              ceCredits={completionData?.credential?.ceCredits || enrollment.credential?.ceCredits}
              score={completionData?.credential?.score}
              credential={{
                id: completionData?.credential?.certificateId || enrollment.credential?.certificateId,
                verificationUrl: completionData?.credential?.verificationUrl || enrollment.credential?.verificationUrl,
                ceCredits: completionData?.credential?.ceCredits || enrollment.credential?.ceCredits
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CoursePlayer;
