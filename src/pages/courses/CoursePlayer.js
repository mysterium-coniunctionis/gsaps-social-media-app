import React, { useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Stack
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCourses, updateCourseProgress } from '../../api/backend';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useGamification } from '../../context/GamificationContext';

const CoursePlayer = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const queryClient = useQueryClient();
  const { awardXP } = useGamification();
  const { data: courses = [], isLoading } = useQuery({ queryKey: ['courses'], queryFn: fetchCourses });

  const course = useMemo(() => courses.find((c) => `${c.id}` === courseId || c.slug === courseId), [courses, courseId]);

  const progressMutation = useMutation({
    mutationFn: (value) => updateCourseProgress({ courseId: course.id, progress: value }),
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      awardXP('COMPLETE_LESSON');
    }
  });

  if (isLoading) return <LoadingSpinner />;
  if (!course) return null;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {course.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Track your learning progress. Each click advances 10%.
            </Typography>
            <Box sx={{ my: 2 }}>
              <LinearProgress variant="determinate" value={course.progress || 0} sx={{ height: 12, borderRadius: 1 }} />
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="contained" onClick={() => progressMutation.mutate(Math.min(100, (course.progress || 0) + 10))}>
                Mark 10% Complete
              </Button>
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CoursePlayer;
