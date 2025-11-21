import React, { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Stack
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import { enrollInCourse, fetchCourses, updateCourseProgress } from '../../api/backend';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { fadeInUp } from '../../theme/animations';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { awardXP } = useGamification();
  const queryClient = useQueryClient();
  const { data: courses = [], isLoading } = useQuery({ queryKey: ['courses'], queryFn: fetchCourses });
  const [progress, setProgress] = useState(0);

  const course = useMemo(() => courses.find((c) => `${c.id}` === courseId || c.slug === courseId), [courses, courseId]);

  const enrollMutation = useMutation({
    mutationFn: () => enrollInCourse(course.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      awardXP('ENROLL_COURSE');
    }
  });

  const progressMutation = useMutation({
    mutationFn: ({ value }) => updateCourseProgress({ courseId: course.id, progress: value }),
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      awardXP('COMPLETE_LESSON');
    }
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!course) {
    return (
      <Container sx={{ py: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Course not found
            </Typography>
            <Button variant="contained" onClick={() => navigate('/courses')}>
              Back to courses
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  const handleEnroll = () => enrollMutation.mutate();
  const handleProgress = (value) => {
    setProgress(value);
    progressMutation.mutate({ value });
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Card sx={{ animation: `${fadeInUp} 0.4s ease-out` }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              {course.category || 'Course'}
            </Typography>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {course.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {course.description}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ my: 2 }}>
              <Chip label={`Level: ${course.level || 'beginner'}`} color="primary" />
              <Chip label={course.status === 'enrolled' || course.enrolled ? 'Enrolled' : 'Available'} />
            </Stack>

            <Box sx={{ my: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Progress
              </Typography>
              <LinearProgress variant="determinate" value={course.progress || progress} sx={{ height: 10, borderRadius: 1 }} />
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                onClick={handleEnroll}
                disabled={course.enrolled || enrollMutation.isLoading}
              >
                {course.enrolled ? 'Enrolled' : 'Enroll now'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleProgress(Math.min(100, (course.progress || progress) + 10))}
                disabled={!course.enrolled && !course.status?.includes('enrolled')}
              >
                Mark 10% Complete
              </Button>
              <Button variant="text" onClick={() => navigate(`/courses/${course.id}/learn`)}>
                Open player
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CourseDetail;
