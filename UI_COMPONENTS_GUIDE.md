# Modern UI Components Guide

This guide demonstrates how to use the new modern UI components in the GSAPS Social Media App.

## Table of Contents
- [GlassCard](#glasscard)
- [Skeleton Loaders](#skeleton-loaders)
- [Toast Notifications](#toast-notifications)

---

## GlassCard

A modern card component with glassmorphism effect (frosted glass appearance).

### Import
```javascript
import { GlassCard } from '../components/common';
```

### Basic Usage
```javascript
<GlassCard>
  <CardContent>
    <Typography variant="h6">Beautiful Glass Card</Typography>
    <Typography>With frosted glass effect</Typography>
  </CardContent>
</GlassCard>
```

### Variants
```javascript
// Default variant (medium blur, 70% opacity)
<GlassCard variant="default">
  Content here
</GlassCard>

// Strong variant (more blur, 80% opacity)
<GlassCard variant="strong">
  Content here
</GlassCard>

// Subtle variant (light blur, 50% opacity)
<GlassCard variant="subtle">
  Content here
</GlassCard>
```

### With Hover Effect
```javascript
<GlassCard hover>
  {/* Card will lift on hover */}
  <CardContent>Content</CardContent>
</GlassCard>
```

### Custom Styling
```javascript
<GlassCard
  variant="strong"
  hover
  sx={{
    borderRadius: 4,
    p: 3,
    maxWidth: 400
  }}
>
  <CardContent>Content</CardContent>
</GlassCard>
```

### Use Cases
- Hero sections with background images
- Modal overlays
- Featured content cards
- Premium/highlighted sections
- Dashboard widgets

---

## Skeleton Loaders

Pre-configured loading skeletons for common UI patterns.

### Import
```javascript
import {
  PostCardSkeleton,
  UserCardSkeleton,
  GroupCardSkeleton,
  EventCardSkeleton,
  MessagePreviewSkeleton,
  CommentSkeleton,
  ProfileHeaderSkeleton,
  ListSkeleton,
} from '../components/common';
```

### Post Card Skeleton
```javascript
// Show loading state for posts
{loading ? (
  <PostCardSkeleton />
) : (
  <PostCard post={post} />
)}

// Multiple posts
{loading ? (
  <ListSkeleton count={5} Component={PostCardSkeleton} />
) : (
  posts.map(post => <PostCard key={post.id} post={post} />)
)}
```

### User Card Skeleton
```javascript
// Member directory loading
{loading ? (
  <ListSkeleton count={3} Component={UserCardSkeleton} />
) : (
  users.map(user => <UserCard key={user.id} user={user} />)
)}
```

### Group Card Skeleton
```javascript
// Groups page loading
{loading ? (
  <>
    <GroupCardSkeleton />
    <GroupCardSkeleton />
    <GroupCardSkeleton />
  </>
) : (
  groups.map(group => <GroupCard key={group.id} group={group} />)
)}
```

### Event Card Skeleton
```javascript
// Events page loading
{loading ? (
  <ListSkeleton count={4} Component={EventCardSkeleton} />
) : (
  events.map(event => <EventCard key={event.id} event={event} />)
)}
```

### Comment Skeleton
```javascript
// Comment section loading
{loadingComments ? (
  <>
    <CommentSkeleton />
    <CommentSkeleton />
  </>
) : (
  comments.map(comment => <CommentItem key={comment.id} comment={comment} />)
)}
```

### Profile Header Skeleton
```javascript
// Profile page loading
{loading ? (
  <ProfileHeaderSkeleton />
) : (
  <ProfileHeader user={user} />
)}
```

### Custom List Skeleton
```javascript
// Generic list with custom count
<ListSkeleton count={10} Component={MessagePreviewSkeleton} />
```

---

## Toast Notifications

Context-based toast notification system for user feedback.

### Setup (Already Done)
The `ToastProvider` is already wrapped around the app in `src/index.js`.

### Import Hook
```javascript
import { useToast } from '../components/common';

function MyComponent() {
  const toast = useToast();

  // Use toast methods...
}
```

### Success Toast
```javascript
const toast = useToast();

const handleSave = async () => {
  try {
    await saveData();
    toast.success('Data saved successfully!');
  } catch (error) {
    toast.error('Failed to save data');
  }
};
```

### Error Toast
```javascript
toast.error('An error occurred', 5000); // 5 second duration
```

### Warning Toast
```javascript
toast.warning('Please review your changes');
```

### Info Toast
```javascript
toast.info('New features available!');
```

### Custom Duration
```javascript
// Show for 8 seconds
toast.success('Post published!', 8000);

// Show indefinitely (until user closes)
toast.info('Important message', 0);
```

### Generic Toast
```javascript
toast.showToast('Custom message', 'info', 3000);
```

### Real-World Examples

#### Post Creation
```javascript
const handleCreatePost = async (content) => {
  try {
    await api.createPost(content);
    toast.success('Post created successfully!');
    navigate('/feed');
  } catch (error) {
    toast.error('Failed to create post. Please try again.');
  }
};
```

#### Like Action
```javascript
const handleLike = async () => {
  try {
    await api.likePost(postId);
    toast.success('Post liked!', 2000); // Short duration
    setLiked(true);
  } catch (error) {
    toast.error('Failed to like post');
  }
};
```

#### Follow User
```javascript
const handleFollow = async (userId) => {
  try {
    await api.followUser(userId);
    toast.success('You are now following this user');
  } catch (error) {
    toast.error('Failed to follow user');
  }
};
```

#### Form Validation
```javascript
const handleSubmit = (data) => {
  if (!data.email) {
    toast.warning('Email is required');
    return;
  }

  if (!data.password) {
    toast.warning('Password is required');
    return;
  }

  // Submit form...
};
```

#### Delete Confirmation
```javascript
const handleDelete = async () => {
  if (!confirm('Are you sure?')) return;

  try {
    await api.deletePost(postId);
    toast.success('Post deleted');
    navigate('/feed');
  } catch (error) {
    toast.error('Failed to delete post');
  }
};
```

---

## Combining Components

### Glass Card with Skeleton
```javascript
<GlassCard variant="strong" hover>
  {loading ? (
    <Box sx={{ p: 2 }}>
      <PostCardSkeleton />
    </Box>
  ) : (
    <CardContent>
      <Typography variant="h6">{data.title}</Typography>
      <Typography>{data.content}</Typography>
    </CardContent>
  )}
</GlassCard>
```

### Form with Toast Feedback
```javascript
const MyForm = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      await api.submitForm(values);
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error(error.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard>
      <CardContent>
        {loading ? (
          <Skeleton variant="rectangular" height={200} />
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
          </form>
        )}
      </CardContent>
    </GlassCard>
  );
};
```

---

## Best Practices

### GlassCard
- Use on top of images or colorful backgrounds for best effect
- Avoid stacking multiple glass cards (reduces visual clarity)
- Use `hover` prop for interactive cards (links, buttons)
- Choose variant based on content importance:
  - `subtle` for decorative elements
  - `default` for standard content
  - `strong` for important/featured content

### Skeleton Loaders
- Always match skeleton structure to actual component
- Use ListSkeleton for multiple items
- Keep skeleton animation smooth (wave is best)
- Show skeleton for at least 300ms to avoid flash
- Remove skeleton immediately when data loads

### Toast Notifications
- Use appropriate severity:
  - `success` for completed actions
  - `error` for failures
  - `warning` for validation/caution
  - `info` for neutral information
- Keep messages short and clear (under 50 chars)
- Use shorter duration (2-3s) for success messages
- Use longer duration (5-6s) for errors that need attention
- Avoid showing too many toasts at once
- Don't use toasts for critical errors (use modals instead)

---

## Animation Integration

All components use animations from `src/theme/animations.js`:

```javascript
import { fadeInUp, pulse, shimmer } from '../theme/animations';

// Animate glass card entrance
<GlassCard
  sx={{
    animation: `${fadeInUp} 0.6s ease-out`,
  }}
>
  Content
</GlassCard>

// Pulse effect on hover
<GlassCard
  hover
  sx={{
    '&:hover': {
      animation: `${pulse} 0.5s ease-in-out`,
    }
  }}
>
  Content
</GlassCard>
```

---

## TypeScript Support (Future)

When migrating to TypeScript, these components will have full type definitions:

```typescript
interface GlassCardProps extends CardProps {
  variant?: 'default' | 'strong' | 'subtle';
  hover?: boolean;
}

interface ToastOptions {
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}
```

---

## Additional Resources

- [Material-UI Card Docs](https://mui.com/material-ui/react-card/)
- [Material-UI Skeleton Docs](https://mui.com/material-ui/react-skeleton/)
- [Material-UI Snackbar Docs](https://mui.com/material-ui/react-snackbar/)
- [Glassmorphism Design Trend](https://uxdesign.cc/glassmorphism-in-user-interfaces-1f39bb1308c9)

---

**Last Updated:** October 2025
**Version:** 1.0.0
