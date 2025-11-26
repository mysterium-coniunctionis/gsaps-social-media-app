import React from 'react';
import { Box, Skeleton as MuiSkeleton } from '@mui/material';

/**
 * Enhanced Skeleton Loading components
 * Provides pre-configured loading skeletons for common UI patterns
 */

/**
 * Base Skeleton with enhanced animation
 */
export const Skeleton = ({ ...props }) => (
  <MuiSkeleton
    animation="wave"
    {...props}
    sx={{
      ...props.sx,
    }}
  />
);

/**
 * Post Card Skeleton
 * Mimics the PostCard component structure
 */
export const PostCardSkeleton = () => (
  <Box sx={{ p: 2, mb: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="30%" height={20} />
        <Skeleton variant="text" width="50%" height={16} />
      </Box>
    </Box>
    <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 1 }} />
    <Skeleton variant="text" width="90%" />
    <Skeleton variant="text" width="70%" />
    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <Skeleton variant="rounded" width={80} height={32} />
      <Skeleton variant="rounded" width={100} height={32} />
      <Skeleton variant="rounded" width={80} height={32} />
    </Box>
  </Box>
);

/**
 * User Card Skeleton
 * For member directory and user lists
 */
export const UserCardSkeleton = () => (
  <Box sx={{ p: 2, mb: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Skeleton variant="circular" width={56} height={56} sx={{ mr: 2 }} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="40%" height={24} />
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="30%" height={16} />
      </Box>
      <Skeleton variant="rounded" width={100} height={36} />
    </Box>
  </Box>
);

/**
 * Group Card Skeleton
 * For groups listing
 */
export const GroupCardSkeleton = () => (
  <Box sx={{ mb: 2 }}>
    <Skeleton variant="rectangular" width="100%" height={180} />
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1 }} />
        <Skeleton variant="text" width="50%" height={24} />
      </Box>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Skeleton variant="rounded" width={60} height={24} />
        <Skeleton variant="rounded" width={80} height={24} />
      </Box>
    </Box>
  </Box>
);

/**
 * Event Card Skeleton
 * For events listing
 */
export const EventCardSkeleton = () => (
  <Box sx={{ mb: 2 }}>
    <Skeleton variant="rectangular" width="100%" height={200} />
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Box>
          <Skeleton variant="text" width={60} height={32} />
          <Skeleton variant="text" width={40} height={20} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="70%" height={24} />
          <Skeleton variant="text" width="50%" height={20} />
        </Box>
      </Box>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="90%" />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Skeleton variant="rounded" width={120} height={36} />
        <Skeleton variant="rounded" width={80} height={36} />
      </Box>
    </Box>
  </Box>
);

/**
 * Message Preview Skeleton
 * For message inbox
 */
export const MessagePreviewSkeleton = () => (
  <Box sx={{ p: 2, mb: 1, display: 'flex', alignItems: 'center' }}>
    <Skeleton variant="circular" width={48} height={48} sx={{ mr: 2 }} />
    <Box sx={{ flex: 1 }}>
      <Skeleton variant="text" width="40%" height={20} />
      <Skeleton variant="text" width="80%" height={16} />
    </Box>
    <Skeleton variant="text" width={60} height={16} />
  </Box>
);

/**
 * Comment Skeleton
 * For comment sections
 */
export const CommentSkeleton = () => (
  <Box sx={{ display: 'flex', mb: 2 }}>
    <Skeleton variant="circular" width={32} height={32} sx={{ mr: 2 }} />
    <Box sx={{ flex: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        <Skeleton variant="text" width={100} height={16} />
        <Skeleton variant="text" width={80} height={14} />
      </Box>
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="60%" />
      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <Skeleton variant="text" width={40} height={14} />
        <Skeleton variant="text" width={50} height={14} />
      </Box>
    </Box>
  </Box>
);

/**
 * Profile Header Skeleton
 * For profile page header
 */
export const ProfileHeaderSkeleton = () => (
  <Box>
    <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
      <Skeleton
        variant="circular"
        width={120}
        height={120}
        sx={{ mb: 2, mt: -8 }}
      />
      <Skeleton variant="text" width={200} height={32} sx={{ mb: 1 }} />
      <Skeleton variant="text" width={150} height={20} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="80%" height={16} />
      <Skeleton variant="text" width="70%" height={16} />
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Skeleton variant="rounded" width={120} height={40} />
        <Skeleton variant="rounded" width={100} height={40} />
      </Box>
    </Box>
  </Box>
);

/**
 * Table Row Skeleton
 * For data tables
 */
export const TableRowSkeleton = ({ columns = 4 }) => (
  <Box sx={{ display: 'flex', gap: 2, p: 2, alignItems: 'center' }}>
    {Array.from({ length: columns }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        width={`${100 / columns}%`}
        height={20}
      />
    ))}
  </Box>
);

/**
 * Circle Card Skeleton
 * For integration circles listing
 */
export const CircleCardSkeleton = () => (
  <Box sx={{ mb: 2, p: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Skeleton variant="circular" width={48} height={48} sx={{ mr: 2 }} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="40%" height={18} />
      </Box>
      <Skeleton variant="rounded" width={80} height={32} />
    </Box>
    <Skeleton variant="text" width="100%" />
    <Skeleton variant="text" width="85%" />
    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
      <Skeleton variant="rounded" width={70} height={24} />
      <Skeleton variant="rounded" width={90} height={24} />
      <Skeleton variant="rounded" width={60} height={24} />
    </Box>
  </Box>
);

/**
 * Module Card Skeleton
 * For prep academy and courses
 */
export const ModuleCardSkeleton = () => (
  <Box sx={{ p: 2, mb: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
      <Skeleton variant="rounded" width={60} height={60} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="70%" height={24} />
        <Skeleton variant="text" width="90%" height={16} />
        <Skeleton variant="text" width="60%" height={16} />
      </Box>
    </Box>
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Skeleton variant="rounded" width={80} height={28} />
      <Skeleton variant="rounded" width={100} height={28} />
    </Box>
  </Box>
);

/**
 * Career Pathway Skeleton
 * For career navigator
 */
export const CareerPathwaySkeleton = () => (
  <Box sx={{ p: 3, mb: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Skeleton variant="rounded" width={60} height={60} />
      <Skeleton variant="rounded" width={80} height={24} />
    </Box>
    <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
    <Skeleton variant="text" width="100%" />
    <Skeleton variant="text" width="90%" />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <Skeleton variant="text" width="35%" height={20} />
      <Skeleton variant="text" width="25%" height={20} />
    </Box>
    <Box sx={{ mt: 2 }}>
      <Skeleton variant="text" width="20%" height={16} />
      <Skeleton variant="rectangular" width="100%" height={8} sx={{ mt: 0.5, borderRadius: 4 }} />
    </Box>
  </Box>
);

/**
 * Hero Section Skeleton
 * For page headers with hero sections
 */
export const HeroSkeleton = () => (
  <Box sx={{ mb: 4 }}>
    <Skeleton 
      variant="rectangular" 
      width="100%" 
      height={280} 
      sx={{ borderRadius: 3 }}
    />
  </Box>
);

/**
 * Stats Grid Skeleton
 * For dashboard stats
 */
export const StatsGridSkeleton = ({ count = 4 }) => (
  <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
    {Array.from({ length: count }).map((_, index) => (
      <Box key={index} sx={{ flex: 1, p: 2 }}>
        <Skeleton variant="text" width="30%" height={48} />
        <Skeleton variant="text" width="60%" height={20} />
      </Box>
    ))}
  </Box>
);

/**
 * Course Card Skeleton
 * For course listings
 */
export const CourseCardSkeleton = () => (
  <Box sx={{ mb: 2 }}>
    <Skeleton variant="rectangular" width="100%" height={160} sx={{ borderRadius: 2 }} />
    <Box sx={{ p: 2 }}>
      <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="80%" height={24} />
      <Skeleton variant="text" width="50%" height={18} sx={{ mt: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Skeleton variant="circular" width={16} height={16} />
          <Skeleton variant="text" width={40} height={16} />
        </Box>
        <Skeleton variant="text" width={60} height={20} />
      </Box>
    </Box>
  </Box>
);

/**
 * Generic List Skeleton
 * Renders multiple items of a specified skeleton type
 */
export const ListSkeleton = ({
  count = 3,
  Component = PostCardSkeleton
}) => (
  <Box>
    {Array.from({ length: count }).map((_, index) => (
      <Component key={index} />
    ))}
  </Box>
);

export default Skeleton;
