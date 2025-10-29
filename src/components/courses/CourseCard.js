import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Box,
  Typography,
  Chip,
  Avatar,
  Rating,
  alpha,
  LinearProgress
} from '@mui/material';
import {
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  MenuBook as LessonsIcon,
  Star as StarIcon,
  Verified as VerifiedIcon,
  School as CEIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * CourseCard Component
 * Display course in grid or list view
 */
const CourseCard = ({ course, viewMode = 'grid' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${course.slug}`);
  };

  const getLevelColor = (level) => {
    const colors = {
      beginner: 'success',
      intermediate: 'primary',
      advanced: 'warning',
      professional: 'error'
    };
    return colors[level] || 'default';
  };

  if (viewMode === 'list') {
    return (
      <Card
        sx={{
          display: 'flex',
          transition: 'all 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6
          }
        }}
      >
        <CardActionArea onClick={handleClick} sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <CardMedia
            component="img"
            sx={{ width: 240, height: 180, objectFit: 'cover' }}
            image={course.thumbnail}
            alt={course.title}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <CardContent sx={{ flexGrow: 1 }}>
              {/* Featured Badge */}
              {course.featured && (
                <Chip
                  label="Featured"
                  size="small"
                  color="secondary"
                  sx={{ mb: 1 }}
                />
              )}

              {/* Title */}
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {course.title}
              </Typography>

              {/* Instructor */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar
                  src={course.instructor.avatar_url}
                  alt={course.instructor.name}
                  sx={{ width: 24, height: 24, mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {course.instructor.name}
                </Typography>
                {course.instructor.verified && (
                  <VerifiedIcon sx={{ ml: 0.5, fontSize: 16, color: 'primary.main' }} />
                )}
              </Box>

              {/* Description */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {course.description}
              </Typography>

              {/* Meta Info */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {course.duration}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LessonsIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {course.lessonsCount} lessons
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {course.studentsEnrolled} students
                  </Typography>
                </Box>

                {course.ceCredits > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CEIcon sx={{ fontSize: 16, color: 'success.main' }} />
                    <Typography variant="caption" color="success.main" fontWeight="bold">
                      {course.ceCredits} CE Credits
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Rating value={course.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" fontWeight="bold">
                  {course.rating.toFixed(1)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ({course.ratingCount} reviews)
                </Typography>
              </Box>

              {/* Tags */}
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <Chip
                  label={course.level}
                  size="small"
                  color={getLevelColor(course.level)}
                  variant="outlined"
                />
                <Chip
                  label={course.category.replace(/-/g, ' ')}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </CardContent>

            {/* Price */}
            <Box
              sx={{
                p: 2,
                pt: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6" color="primary.main" fontWeight="bold">
                {course.price === 0 ? 'Free' : `$${course.price}`}
              </Typography>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    );
  }

  // Grid View
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6
        }
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        {/* Thumbnail */}
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="180"
            image={course.thumbnail}
            alt={course.title}
          />

          {/* Featured Badge */}
          {course.featured && (
            <Chip
              label="Featured"
              size="small"
              color="secondary"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                fontWeight: 'bold'
              }}
            />
          )}

          {/* Price Badge */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              bgcolor: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              fontWeight: 'bold'
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              {course.price === 0 ? 'Free' : `$${course.price}`}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Title */}
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: 64
            }}
          >
            {course.title}
          </Typography>

          {/* Instructor */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar
              src={course.instructor.avatar_url}
              alt={course.instructor.name}
              sx={{ width: 24, height: 24, mr: 1 }}
            />
            <Typography variant="caption" color="text.secondary" noWrap>
              {course.instructor.name}
            </Typography>
            {course.instructor.verified && (
              <VerifiedIcon sx={{ ml: 0.5, fontSize: 14, color: 'primary.main' }} />
            )}
          </Box>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
            <Rating value={course.rating} precision={0.1} readOnly size="small" />
            <Typography variant="caption" fontWeight="bold">
              {course.rating.toFixed(1)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ({course.ratingCount})
            </Typography>
          </Box>

          {/* Meta Info */}
          <Box sx={{ mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              <ScheduleIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {course.duration}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mx: 0.5 }}>
                •
              </Typography>
              <LessonsIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {course.lessonsCount} lessons
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PersonIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {course.studentsEnrolled} students
              </Typography>
            </Box>
          </Box>

          {/* CE Credits */}
          {course.ceCredits > 0 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                bgcolor: alpha('#4caf50', 0.1),
                px: 1,
                py: 0.5,
                borderRadius: 1,
                mb: 1.5
              }}
            >
              <CEIcon sx={{ fontSize: 16, color: 'success.main' }} />
              <Typography variant="caption" color="success.main" fontWeight="bold">
                {course.ceCredits} CE Credits
              </Typography>
            </Box>
          )}

          {/* Tags */}
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 'auto' }}>
            <Chip
              label={course.level}
              size="small"
              color={getLevelColor(course.level)}
              sx={{ fontSize: '0.7rem', height: 20 }}
            />
            <Chip
              label={course.category.replace(/-/g, ' ')}
              size="small"
              sx={{ fontSize: '0.7rem', height: 20 }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CourseCard;
