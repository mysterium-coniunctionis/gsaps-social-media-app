import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Chip,
  Stack,
  Tooltip,
  Collapse,
  useTheme,
  alpha,
  InputAdornment
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Search as SearchIcon,
  Star as StarIcon,
  KeyboardArrowDown as ExpandIcon,
  KeyboardArrowUp as CollapseIcon,
  AutoAwesome as AIIcon
} from '@mui/icons-material';
import { format } from 'date-fns';

/**
 * TranscriptEntry - Individual transcript entry
 */
const TranscriptEntry = ({ entry, searchQuery }) => {
  const theme = useTheme();

  const highlightText = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <Box
          component="span"
          key={index}
          sx={{
            bgcolor: alpha(theme.palette.warning.main, 0.3),
            px: 0.5,
            borderRadius: 0.5
          }}
        >
          {part}
        </Box>
      ) : (
        part
      )
    );
  };

  return (
    <Box
      sx={{
        py: 2,
        px: 2,
        borderRadius: 2,
        bgcolor: entry.isHighlight
          ? alpha(theme.palette.primary.main, 0.05)
          : 'transparent',
        border: entry.isHighlight
          ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
          : '1px solid transparent',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: alpha(theme.palette.background.paper, 0.05)
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        <Typography variant="subtitle2" fontWeight="bold" color="primary">
          {entry.speakerName}
        </Typography>
        {entry.isHighlight && (
          <Tooltip title="AI-highlighted key moment">
            <Chip
              icon={<AIIcon sx={{ fontSize: 12 }} />}
              label="Key Point"
              size="small"
              sx={{
                height: 18,
                fontSize: '0.65rem',
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main'
              }}
            />
          </Tooltip>
        )}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ ml: 'auto' }}
        >
          {format(new Date(entry.timestamp), 'h:mm:ss a')}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color="text.primary"
        sx={{ lineHeight: 1.6 }}
      >
        {highlightText(entry.text, searchQuery)}
      </Typography>
    </Box>
  );
};

/**
 * LiveTranscript - AI-powered transcription panel
 */
const LiveTranscript = ({ transcript, isLive, onCopy }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showHighlightsOnly, setShowHighlightsOnly] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const transcriptEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom when new entries arrive
  useEffect(() => {
    if (isLive && transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcript, isLive]);

  const filteredTranscript = transcript.filter((entry) => {
    if (showHighlightsOnly && !entry.isHighlight) return false;
    if (
      searchQuery &&
      !entry.text.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !entry.speakerName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleCopyAll = () => {
    const text = transcript
      .map(
        (entry) =>
          `[${format(new Date(entry.timestamp), 'h:mm:ss a')}] ${entry.speakerName}: ${entry.text}`
      )
      .join('\n\n');

    navigator.clipboard.writeText(text);
    if (onCopy) onCopy();
  };

  const highlightCount = transcript.filter((e) => e.isHighlight).length;

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: alpha(theme.palette.background.paper, 0.4),
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            Live Transcript
          </Typography>
          {isLive && (
            <Chip
              label="LIVE"
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.error.main, 0.1),
                color: 'error.main',
                fontWeight: 700,
                fontSize: '0.7rem',
                height: 20
              }}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Copy full transcript">
            <IconButton size="small" onClick={handleCopyAll}>
              <CopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <CollapseIcon fontSize="small" />
            ) : (
              <ExpandIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Box>

      <Collapse in={isExpanded}>
        {/* Search and filters */}
        <Box sx={{ p: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            sx={{ mb: 1.5 }}
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label="All"
              size="small"
              onClick={() => setShowHighlightsOnly(false)}
              color={!showHighlightsOnly ? 'primary' : 'default'}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              icon={<StarIcon sx={{ fontSize: 14 }} />}
              label={`Highlights (${highlightCount})`}
              size="small"
              onClick={() => setShowHighlightsOnly(true)}
              color={showHighlightsOnly ? 'primary' : 'default'}
              sx={{ cursor: 'pointer' }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ ml: 'auto !important' }}
            >
              {filteredTranscript.length} entries
            </Typography>
          </Stack>
        </Box>

        {/* Transcript entries */}
        <Box
          ref={containerRef}
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            p: 2,
            maxHeight: 500,
            '&::-webkit-scrollbar': {
              width: 8
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: alpha(theme.palette.background.paper, 0.1),
              borderRadius: 4
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: alpha(theme.palette.text.secondary, 0.2),
              borderRadius: 4,
              '&:hover': {
                bgcolor: alpha(theme.palette.text.secondary, 0.3)
              }
            }
          }}
        >
          {filteredTranscript.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
                color: 'text.secondary'
              }}
            >
              <Typography variant="body2">
                {transcript.length === 0
                  ? 'Transcript will appear here as speakers talk...'
                  : 'No results found'}
              </Typography>
            </Box>
          ) : (
            <Stack spacing={1}>
              {filteredTranscript.map((entry) => (
                <TranscriptEntry
                  key={entry.id}
                  entry={entry}
                  searchQuery={searchQuery}
                />
              ))}
              <div ref={transcriptEndRef} />
            </Stack>
          )}
        </Box>

        {/* AI Summary hint */}
        {transcript.length > 0 && (
          <Box
            sx={{
              p: 2,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              bgcolor: alpha(theme.palette.info.main, 0.05)
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AIIcon sx={{ fontSize: 16, color: 'info.main' }} />
              <Typography variant="caption" color="text.secondary">
                AI is highlighting key moments in real-time. After the room ends,
                you'll receive a complete summary.
              </Typography>
            </Box>
          </Box>
        )}
      </Collapse>
    </Paper>
  );
};

export default LiveTranscript;
