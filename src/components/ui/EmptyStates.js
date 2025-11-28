import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  alpha,
  useTheme
} from '@mui/material';
import {
  SearchOff as SearchIcon,
  InboxOutlined as InboxIcon,
  CloudOff as OfflineIcon,
  Error as ErrorIcon,
  Group as GroupIcon,
  Event as EventIcon,
  School as CourseIcon,
  Article as ArticleIcon,
  Favorite as CircleIcon,
  Work as CareerIcon,
  SentimentDissatisfied as SadIcon
} from '@mui/icons-material';

/**
 * Enhanced Empty State components with illustrations and consistent styling
 */

const illustrations = {
  search: SearchIcon,
  inbox: InboxIcon,
  offline: OfflineIcon,
  error: ErrorIcon,
  groups: GroupIcon,
  events: EventIcon,
  courses: CourseIcon,
  articles: ArticleIcon,
  circles: CircleIcon,
  career: CareerIcon,
  default: SadIcon
};

/**
 * Base EmptyState component
 */
export const EmptyState = ({
  icon = 'default',
  title,
  description,
  action,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  compact = false,
  children
}) => {
  const theme = useTheme();
  const IconComponent = typeof icon === 'string' ? illustrations[icon] || illustrations.default : icon;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: compact ? 4 : 8,
        px: 3
      }}
    >
      <Box
        sx={{
          width: compact ? 80 : 120,
          height: compact ? 80 : 120,
          borderRadius: '50%',
          bgcolor: alpha(theme.palette.primary.main, 0.08),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3
        }}
      >
        <IconComponent
          sx={{
            fontSize: compact ? 40 : 60,
            color: theme.palette.primary.main,
            opacity: 0.7
          }}
        />
      </Box>

      <Typography
        variant={compact ? 'h6' : 'h5'}
        fontWeight={600}
        gutterBottom
        color="text.primary"
      >
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 400, mb: 3 }}
        >
          {description}
        </Typography>
      )}

      {children}

      {(action || secondaryAction) && (
        <Box sx={{ display: 'flex', gap: 2, mt: children ? 2 : 0 }}>
          {action && (
            <Button variant="contained" onClick={action}>
              {actionLabel || 'Get Started'}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outlined" onClick={secondaryAction}>
              {secondaryActionLabel || 'Learn More'}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

/**
 * Search Empty State - No search results found
 */
export const SearchEmptyState = ({
  searchTerm,
  onClear,
  suggestions = []
}) => {
  const theme = useTheme();

  return (
    <EmptyState
      icon="search"
      title={`No results for "${searchTerm}"`}
      description="Try adjusting your search or filters to find what you're looking for."
      action={onClear}
      actionLabel="Clear Search"
    >
      {suggestions.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Try searching for:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            {suggestions.map((suggestion, idx) => (
              <Paper
                key={idx}
                sx={{
                  px: 2,
                  py: 0.5,
                  cursor: 'pointer',
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1)
                  }
                }}
              >
                <Typography variant="body2">{suggestion}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    </EmptyState>
  );
};

/**
 * Circles Empty State
 */
export const CirclesEmptyState = ({ onBrowse, onCreate }) => (
  <EmptyState
    icon="circles"
    title="No Integration Circles Yet"
    description="Join peer-led circles for psychedelic integration, preparation, and support."
    action={onBrowse}
    actionLabel="Browse Circles"
    secondaryAction={onCreate}
    secondaryActionLabel="Start a Circle"
  />
);

/**
 * Events Empty State
 */
export const EventsEmptyState = ({ onExplore }) => (
  <EmptyState
    icon="events"
    title="No Upcoming Events"
    description="Check back soon for workshops, symposia, and community gatherings."
    action={onExplore}
    actionLabel="Explore Past Events"
  />
);

/**
 * Courses Empty State
 */
export const CoursesEmptyState = ({ onBrowse }) => (
  <EmptyState
    icon="courses"
    title="No Courses Found"
    description="Explore our comprehensive curriculum of graduate-level psychedelic education."
    action={onBrowse}
    actionLabel="Browse All Courses"
  />
);

/**
 * Library Empty State
 */
export const LibraryEmptyState = ({ onBrowse }) => (
  <EmptyState
    icon="articles"
    title="No Papers Found"
    description="Our research library contains 1,200+ peer-reviewed papers on psychedelic science."
    action={onBrowse}
    actionLabel="Browse Library"
  />
);

/**
 * Groups Empty State
 */
export const GroupsEmptyState = ({ onBrowse, onCreate }) => (
  <EmptyState
    icon="groups"
    title="No Groups Joined"
    description="Connect with professionals in specialized interest groups."
    action={onBrowse}
    actionLabel="Discover Groups"
    secondaryAction={onCreate}
    secondaryActionLabel="Create a Group"
  />
);

/**
 * Career Empty State
 */
export const CareerEmptyState = ({ onExplore }) => (
  <EmptyState
    icon="career"
    title="Explore Career Paths"
    description="Discover opportunities in the growing field of psychedelic science and therapy."
    action={onExplore}
    actionLabel="View Career Paths"
  />
);

/**
 * Offline State
 */
export const OfflineState = ({ onRetry }) => (
  <EmptyState
    icon="offline"
    title="You're Offline"
    description="Please check your internet connection and try again."
    action={onRetry}
    actionLabel="Retry Connection"
  />
);

/**
 * Error State
 */
export const ErrorState = ({ error, onRetry }) => (
  <EmptyState
    icon="error"
    title="Something Went Wrong"
    description={error?.message || "We couldn't load this content. Please try again."}
    action={onRetry}
    actionLabel="Try Again"
  />
);

/**
 * Inbox Empty State
 */
export const InboxEmptyState = ({ onCompose }) => (
  <EmptyState
    icon="inbox"
    title="No Messages"
    description="Start a conversation with other community members."
    action={onCompose}
    actionLabel="Send a Message"
  />
);

export default EmptyState;
