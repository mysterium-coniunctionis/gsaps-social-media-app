import { formatDistanceToNow } from 'date-fns';

/**
 * Format a timestamp to a relative time string (e.g., "2 hours ago")
 * Safely handles invalid dates
 * 
 * @param {Date|string|number} date - The date to format
 * @param {object} options - Options to pass to formatDistanceToNow
 * @returns {string} Formatted relative time string
 */
export const formatRelativeTime = (date, options = { addSuffix: true }) => {
  try {
    return formatDistanceToNow(new Date(date), options);
  } catch {
    return 'recently';
  }
};

/**
 * Format a timestamp to a short relative time string (e.g., "2h ago", "3d ago")
 * Used in messaging interfaces for compact display
 * 
 * @param {Date|string|number} timestamp - The timestamp to format
 * @returns {string} Formatted short relative time string
 */
export const formatShortRelativeTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
