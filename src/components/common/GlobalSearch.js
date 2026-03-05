import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  CircularProgress,
  Tabs,
  Tab,
  Avatar,
  alpha,
  useTheme,
  IconButton
} from '@mui/material';
import {
  Search as SearchIcon,
  DynamicFeed as PostIcon,
  LibraryBooks as PaperIcon,
  School as CourseIcon,
  Person as UserIcon,
  Mic as VoiceIcon,
  ViewInAr as SpaceIcon,
  TrendingUp as TrendingIcon,
  History as HistoryIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  globalSearch,
  getTrendingSearches,
  getRecentSearches,
  saveRecentSearch,
  clearRecentSearches,
  CONTENT_TYPES
} from '../../api/globalSearchService';

// Custom hook for debouncing (if not exists)
const useDebounceValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Global Search Component
 * Unified search across all content types
 */
const GlobalSearch = ({ open, onClose }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const inputRef = useRef(null);

  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState(CONTENT_TYPES.ALL);
  const [results, setResults] = useState({});
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);
  const [recent, setRecent] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const debouncedQuery = useDebounceValue(query, 300);

  // Content type icons
  const typeIcons = {
    [CONTENT_TYPES.POSTS]: <PostIcon />,
    [CONTENT_TYPES.PAPERS]: <PaperIcon />,
    [CONTENT_TYPES.COURSES]: <CourseIcon />,
    [CONTENT_TYPES.USERS]: <UserIcon />,
    [CONTENT_TYPES.VOICE_ROOMS]: <VoiceIcon />,
    [CONTENT_TYPES.VIRTUAL_SPACES]: <SpaceIcon />
  };

  const typeLabels = {
    [CONTENT_TYPES.ALL]: 'All',
    [CONTENT_TYPES.POSTS]: 'Posts',
    [CONTENT_TYPES.PAPERS]: 'Papers',
    [CONTENT_TYPES.COURSES]: 'Courses',
    [CONTENT_TYPES.USERS]: 'People',
    [CONTENT_TYPES.VOICE_ROOMS]: 'Voice Rooms',
    [CONTENT_TYPES.VIRTUAL_SPACES]: '3D Spaces'
  };

  // Load trending and recent on open
  useEffect(() => {
    if (open) {
      getTrendingSearches().then(setTrending);
      setRecent(getRecentSearches());
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Perform search when query changes
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults({});
      setTotalResults(0);
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      try {
        const searchResults = await globalSearch(debouncedQuery, {
          type: activeTab,
          limit: 10
        });
        setResults(searchResults.results);
        setTotalResults(searchResults.totalResults);
      } catch (error) {
        console.error('Search error:', error);
      }
      setLoading(false);
    };

    performSearch();
  }, [debouncedQuery, activeTab]);

  // Handle result selection
  const handleResultClick = (result) => {
    saveRecentSearch(query);
    onClose();
    navigate(result.url);
  };

  // Handle quick search selection
  const handleQuickSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    const flatResults = Object.values(results).flat();

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatResults[selectedIndex]) {
        handleResultClick(flatResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, selectedIndex, onClose]);

  // Get all results as flat array for rendering
  const getAllResults = () => {
    if (activeTab === CONTENT_TYPES.ALL) {
      return Object.entries(results).flatMap(([type, items]) =>
        items.map(item => ({ ...item, type }))
      );
    }
    return results[activeTab] || [];
  };

  const flatResults = getAllResults();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          position: 'fixed',
          top: '10%',
          m: 0,
          maxHeight: '80vh',
          borderRadius: 3,
          bgcolor: alpha(theme.palette.background.paper, 0.98),
          backdropFilter: 'blur(20px)'
        }
      }}
      BackdropProps={{
        sx: {
          bgcolor: alpha(theme.palette.common.black, 0.5),
          backdropFilter: 'blur(4px)'
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Search Input */}
        <Box sx={{ p: 2, pb: 0 }}>
          <TextField
            ref={inputRef}
            autoFocus
            fullWidth
            placeholder="Search posts, papers, courses, people, rooms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <SearchIcon color="action" />
                  )}
                </InputAdornment>
              ),
              endAdornment: query && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setQuery('')}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Box>

        {/* Content Type Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          {Object.entries(typeLabels).map(([type, label]) => (
            <Tab
              key={type}
              value={type}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {type !== CONTENT_TYPES.ALL && typeIcons[type]}
                  {label}
                  {results[type]?.length > 0 && (
                    <Chip
                      size="small"
                      label={results[type].length}
                      sx={{ height: 18, fontSize: '0.7rem', ml: 0.5 }}
                    />
                  )}
                </Box>
              }
            />
          ))}
        </Tabs>

        {/* Results or Suggestions */}
        <Box sx={{ maxHeight: 400, overflow: 'auto', p: 2 }}>
          {query.length < 2 ? (
            // Show trending and recent when no query
            <>
              {/* Recent Searches */}
              {recent.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <HistoryIcon fontSize="small" />
                      Recent Searches
                    </Typography>
                    <IconButton size="small" onClick={() => { clearRecentSearches(); setRecent([]); }}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {recent.map((search, i) => (
                      <Chip
                        key={i}
                        label={search}
                        onClick={() => handleQuickSearch(search)}
                        onDelete={() => {
                          const updated = recent.filter((_, idx) => idx !== i);
                          setRecent(updated);
                          localStorage.setItem('globalSearch_recent', JSON.stringify(updated));
                        }}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Trending Searches */}
              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                  <TrendingIcon fontSize="small" />
                  Trending Searches
                </Typography>
                <List dense>
                  {trending.map((item, i) => (
                    <ListItem
                      key={i}
                      button
                      onClick={() => handleQuickSearch(item.query)}
                      sx={{ borderRadius: 1 }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Typography variant="body2" color="text.secondary">
                          {i + 1}
                        </Typography>
                      </ListItemIcon>
                      <ListItemText primary={item.query} />
                      <Chip
                        size="small"
                        label={`${item.count}+ searches`}
                        sx={{ height: 20, fontSize: '0.65rem' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </>
          ) : flatResults.length > 0 ? (
            // Show search results
            <List>
              {flatResults.map((result, index) => (
                <ListItem
                  key={`${result.type}-${result.id}`}
                  button
                  selected={index === selectedIndex}
                  onClick={() => handleResultClick(result)}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    '&.Mui-selected': {
                      bgcolor: alpha(theme.palette.primary.main, 0.1)
                    }
                  }}
                >
                  <ListItemIcon>
                    {result.metadata?.avatar || result.metadata?.thumbnail ? (
                      <Avatar src={result.metadata.avatar || result.metadata.thumbnail} />
                    ) : (
                      typeIcons[result.type]
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" noWrap>
                          {result.title}
                        </Typography>
                        {(result.type === CONTENT_TYPES.VOICE_ROOMS || result.type === CONTENT_TYPES.VIRTUAL_SPACES) && (
                          <Chip
                            label="NEW"
                            size="small"
                            color="secondary"
                            sx={{ height: 16, fontSize: '0.6rem' }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {result.description}
                      </Typography>
                    }
                  />
                  <Chip
                    label={typeLabels[result.type]}
                    size="small"
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            // No results
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">
                No results found for "{query}"
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try different keywords or check spelling
              </Typography>
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Divider />
        <Box
          sx={{
            px: 2,
            py: 1,
            display: 'flex',
            justifyContent: 'space-between',
            bgcolor: 'action.hover'
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {totalResults > 0 ? `${totalResults} results` : 'Type to search'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ↑↓ Navigate • ↵ Select • ESC Close
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearch;
