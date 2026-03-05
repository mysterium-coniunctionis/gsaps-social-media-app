import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormControlLabel,
  Switch,
  Button,
  Collapse,
  IconButton,
  Autocomplete,
  TextField,
  Stack
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

// Available filter options
const TOPICS = [
  { value: 'psilocybin', label: 'Psilocybin' },
  { value: 'mdma', label: 'MDMA' },
  { value: 'lsd', label: 'LSD' },
  { value: 'ketamine', label: 'Ketamine' },
  { value: 'ayahuasca', label: 'Ayahuasca' },
  { value: 'therapy', label: 'Therapy & Integration' },
  { value: 'neuroscience', label: 'Neuroscience' }
];

const RESEARCH_TYPES = [
  { value: 'clinical-trial', label: 'Clinical Trial' },
  { value: 'review', label: 'Review Article' },
  { value: 'meta-analysis', label: 'Meta-Analysis' },
  { value: 'basic-science', label: 'Basic Science' },
  { value: 'qualitative', label: 'Qualitative Research' }
];

const METHODOLOGIES = [
  { value: 'RCT', label: 'Randomized Controlled Trial' },
  { value: 'open-label', label: 'Open-Label Study' },
  { value: 'systematic-review', label: 'Systematic Review' },
  { value: 'cohort', label: 'Cohort Study' }
];

const JOURNALS = [
  'Nature Medicine',
  'JAMA Psychiatry',
  'The Lancet Psychiatry',
  'Journal of Psychopharmacology',
  'Psychopharmacology',
  'Biological Psychiatry',
  'Neuropsychopharmacology',
  'Frontiers in Psychiatry',
  'Frontiers in Psychology',
  'PLOS ONE',
  'Cell',
  'Nature Neuroscience',
  'American Journal of Psychiatry',
  'Journal of Clinical Psychiatry',
  'Translational Psychiatry'
];

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'citations', label: 'Most Cited' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'downloads', label: 'Most Downloaded' }
];

const currentYear = new Date().getFullYear();
const MIN_YEAR = 1990;

const AdvancedSearchFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
  resultCount,
  isSearching = false
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleTopicToggle = (topic) => {
    const currentTopics = filters.topics || [];
    const newTopics = currentTopics.includes(topic)
      ? currentTopics.filter(t => t !== topic)
      : [...currentTopics, topic];
    onFilterChange({ topics: newTopics });
  };

  const handleResearchTypeToggle = (type) => {
    const currentTypes = filters.researchTypes || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    onFilterChange({ researchTypes: newTypes });
  };

  const handleYearChange = (event, newValue) => {
    onFilterChange({
      yearFrom: newValue[0],
      yearTo: newValue[1]
    });
  };

  const hasActiveFilters = () => {
    return (
      (filters.topics && filters.topics.length > 0) ||
      (filters.researchTypes && filters.researchTypes.length > 0) ||
      (filters.methodologies && filters.methodologies.length > 0) ||
      filters.journal ||
      filters.openAccess ||
      filters.yearFrom !== MIN_YEAR ||
      filters.yearTo !== currentYear
    );
  };

  const activeFilterCount = [
    filters.topics?.length || 0,
    filters.researchTypes?.length || 0,
    filters.methodologies?.length || 0,
    filters.journal ? 1 : 0,
    filters.openAccess ? 1 : 0,
    (filters.yearFrom !== MIN_YEAR || filters.yearTo !== currentYear) ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      {/* Header with expand/collapse */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon color="action" />
          <Typography variant="subtitle1" fontWeight="medium">
            Advanced Filters
          </Typography>
          {activeFilterCount > 0 && (
            <Chip
              size="small"
              label={`${activeFilterCount} active`}
              color="primary"
              variant="outlined"
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {resultCount !== undefined && (
            <Typography variant="body2" color="text.secondary">
              {isSearching ? 'Searching...' : `${resultCount} papers found`}
            </Typography>
          )}
          {hasActiveFilters() && (
            <Button
              size="small"
              startIcon={<ClearIcon />}
              onClick={onClearFilters}
            >
              Clear all
            </Button>
          )}
          <IconButton size="small" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* Quick filter chips (always visible) */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Topics
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {TOPICS.map(topic => (
            <Chip
              key={topic.value}
              label={topic.label}
              size="small"
              onClick={() => handleTopicToggle(topic.value)}
              color={(filters.topics || []).includes(topic.value) ? 'primary' : 'default'}
              variant={(filters.topics || []).includes(topic.value) ? 'filled' : 'outlined'}
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
      </Box>

      {/* Sort and open access (always visible) */}
      <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={filters.sortBy || 'relevance'}
            label="Sort by"
            onChange={(e) => onFilterChange({ sortBy: e.target.value })}
          >
            {SORT_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={filters.openAccess || false}
              onChange={(e) => onFilterChange({ openAccess: e.target.checked })}
              size="small"
            />
          }
          label="Open Access only"
        />
      </Box>

      {/* Expanded advanced filters */}
      <Collapse in={expanded}>
        <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          {/* Research Type */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Research Type
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {RESEARCH_TYPES.map(type => (
                <Chip
                  key={type.value}
                  label={type.label}
                  size="small"
                  onClick={() => handleResearchTypeToggle(type.value)}
                  color={(filters.researchTypes || []).includes(type.value) ? 'secondary' : 'default'}
                  variant={(filters.researchTypes || []).includes(type.value) ? 'filled' : 'outlined'}
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>

          {/* Methodology */}
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Methodology</InputLabel>
              <Select
                multiple
                value={filters.methodologies || []}
                label="Methodology"
                onChange={(e) => onFilterChange({ methodologies: e.target.value })}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map(value => {
                      const method = METHODOLOGIES.find(m => m.value === value);
                      return <Chip key={value} label={method?.label || value} size="small" />;
                    })}
                  </Box>
                )}
              >
                {METHODOLOGIES.map(method => (
                  <MenuItem key={method.value} value={method.value}>
                    {method.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Journal */}
          <Box sx={{ mb: 3 }}>
            <Autocomplete
              size="small"
              options={JOURNALS}
              value={filters.journal || null}
              onChange={(event, newValue) => onFilterChange({ journal: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="Journal" placeholder="Select journal" />
              )}
              freeSolo
            />
          </Box>

          {/* Year Range */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Publication Year: {filters.yearFrom || MIN_YEAR} - {filters.yearTo || currentYear}
            </Typography>
            <Slider
              value={[filters.yearFrom || MIN_YEAR, filters.yearTo || currentYear]}
              onChange={handleYearChange}
              valueLabelDisplay="auto"
              min={MIN_YEAR}
              max={currentYear}
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default AdvancedSearchFilters;
