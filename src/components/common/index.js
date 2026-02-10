/**
 * Common Components Index
 * Central export point for reusable UI components
 */

// Glass Card
export { default as GlassCard } from './GlassCard';

// Skeleton Loaders
export {
  default as Skeleton,
  PostCardSkeleton,
  UserCardSkeleton,
  GroupCardSkeleton,
  EventCardSkeleton,
  MessagePreviewSkeleton,
  CommentSkeleton,
  ProfileHeaderSkeleton,
  TableRowSkeleton,
  ListSkeleton,
} from './SkeletonLoader';

// Toast Notifications
export {
  default as Toast,
  ToastProvider,
  useToast,
} from './Toast';

// Mention Input
export { default as MentionInput } from './MentionInput';

// Loading Spinner (if exists)
export { default as LoadingSpinner } from './LoadingSpinner';

// Search TextField
export { default as SearchTextField } from './SearchTextField';

// Centered Auth Layout
export { default as CenteredAuthLayout } from './CenteredAuthLayout';

// Stat Card
export { default as StatCard } from './StatCard';

// Keyboard Shortcuts Help
export { default as KeyboardShortcutsHelp } from './KeyboardShortcutsHelp';
