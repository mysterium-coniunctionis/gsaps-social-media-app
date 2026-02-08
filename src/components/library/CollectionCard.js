import React from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Avatar,
  AvatarGroup,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Lock as LockIcon,
  Public as PublicIcon,
  Article as ArticleIcon,
  PersonAdd as FollowIcon,
  Check as FollowingIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CollectionCard = ({
  collection,
  onFollow,
  onUnfollow,
  isFollowing = false,
  showOwner = true,
  compact = false
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/library/collections/${collection.id}`);
  };

  const handleFollowClick = (e) => {
    e.stopPropagation();
    if (isFollowing) {
      onUnfollow?.(collection.id);
    } else {
      onFollow?.(collection.id);
    }
  };

  const paperCount = collection.items?.length || collection._count?.items || 0;
  const followerCount = collection.followers?.length || collection._count?.followers || 0;

  if (compact) {
    return (
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1.5,
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' }
        }}
        onClick={handleClick}
      >
        <Box sx={{ mr: 2 }}>
          <ArticleIcon color="primary" />
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {collection.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {paperCount} papers
          </Typography>
        </Box>
        {!collection.isPublic && (
          <LockIcon fontSize="small" color="action" sx={{ ml: 1 }} />
        )}
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4
        }
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        <CardContent>
          {/* Header with privacy icon */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h3" gutterBottom sx={{ lineHeight: 1.3 }}>
                {collection.name}
              </Typography>
            </Box>
            <Tooltip title={collection.isPublic ? 'Public collection' : 'Private collection'}>
              {collection.isPublic ? (
                <PublicIcon fontSize="small" color="action" />
              ) : (
                <LockIcon fontSize="small" color="action" />
              )}
            </Tooltip>
          </Box>

          {/* Description */}
          {collection.description && (
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
              {collection.description}
            </Typography>
          )}

          {/* Stats */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Chip
              size="small"
              icon={<ArticleIcon fontSize="small" />}
              label={`${paperCount} paper${paperCount !== 1 ? 's' : ''}`}
              variant="outlined"
            />
            {collection.isPublic && (
              <Chip
                size="small"
                label={`${followerCount} follower${followerCount !== 1 ? 's' : ''}`}
                variant="outlined"
              />
            )}
          </Box>

          {/* Preview of papers (if available) */}
          {collection.items && collection.items.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                Recent papers:
              </Typography>
              {collection.items.slice(0, 2).map((item, idx) => (
                <Typography
                  key={idx}
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  • {item.asset?.title || 'Untitled'}
                </Typography>
              ))}
            </Box>
          )}

          {/* Owner info */}
          {showOwner && collection.owner && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
              <Avatar
                src={collection.owner.avatarUrl}
                sx={{ width: 24, height: 24, mr: 1 }}
              >
                {collection.owner.name?.[0]}
              </Avatar>
              <Typography variant="caption" color="text.secondary">
                {collection.owner.name}
              </Typography>
            </Box>
          )}
        </CardContent>
      </CardActionArea>

      {/* Follow button for public collections */}
      {collection.isPublic && onFollow && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Tooltip title={isFollowing ? 'Unfollow collection' : 'Follow collection'}>
            <IconButton
              size="small"
              onClick={handleFollowClick}
              color={isFollowing ? 'primary' : 'default'}
              sx={{
                border: 1,
                borderColor: isFollowing ? 'primary.main' : 'divider'
              }}
            >
              {isFollowing ? <FollowingIcon fontSize="small" /> : <FollowIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Card>
  );
};

export default CollectionCard;
