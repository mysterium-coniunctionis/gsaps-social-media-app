import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  TextField,
  Autocomplete,
  LinearProgress,
  Grid,
  Paper,
  IconButton,
  useTheme,
  alpha,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Close as CloseIcon,
  ArrowBack as BackIcon,
  ArrowForward as NextIcon,
  Check as CheckIcon,
  Psychology as PsychologyIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Favorite as ValuesIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { matchUserToCircles, PREFERENCE_OPTIONS, DEFAULT_PREFERENCES } from '../../utils/circleMatching';
import { circles } from '../../data/circlesData';
import CircleCard from './CircleCard';

const STEPS = [
  { label: 'Experience Type', icon: <PsychologyIcon /> },
  { label: 'Circle Purpose', icon: <SearchIcon /> },
  { label: 'Location', icon: <LocationIcon /> },
  { label: 'Schedule', icon: <ScheduleIcon /> },
  { label: 'Values', icon: <ValuesIcon /> }
];

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const CircleMatchingWizard = ({ open, onClose, onComplete }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [preferences, setPreferences] = useState({ ...DEFAULT_PREFERENCES });
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleNext = () => {
    if (activeStep === STEPS.length - 1) {
      // Last step - find matches
      findMatches();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setPreferences({ ...DEFAULT_PREFERENCES });
    setMatches([]);
    setShowResults(false);
  };

  const findMatches = useCallback(() => {
    setLoading(true);

    // Simulate API delay for better UX
    setTimeout(() => {
      const results = matchUserToCircles(preferences, circles, {
        minScore: 0.25,
        maxResults: 10
      });
      setMatches(results);
      setShowResults(true);
      setLoading(false);

      // Save preferences to localStorage
      localStorage.setItem('gsaps_circle_preferences', JSON.stringify(preferences));
    }, 800);
  }, [preferences]);

  const updatePreference = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleArrayPreference = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value]
    }));
  };

  const handleComplete = (circleId) => {
    if (onComplete) {
      onComplete(preferences, circleId);
    }
    onClose();
  };

  const progress = ((activeStep + 1) / STEPS.length) * 100;

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              What type of experience are you integrating?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Select the primary substance or experience type you'd like support with.
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={preferences.experienceType || ''}
                onChange={(e) => updatePreference('experienceType', e.target.value)}
              >
                <Grid container spacing={2}>
                  {PREFERENCE_OPTIONS.experienceTypes.map((type) => (
                    <Grid item xs={6} sm={4} key={type.value}>
                      <Paper
                        elevation={preferences.experienceType === type.value ? 3 : 1}
                        sx={{
                          p: 2,
                          cursor: 'pointer',
                          border: preferences.experienceType === type.value
                            ? `2px solid ${theme.palette.primary.main}`
                            : '2px solid transparent',
                          transition: 'all 0.2s',
                          '&:hover': {
                            borderColor: alpha(theme.palette.primary.main, 0.5)
                          }
                        }}
                        onClick={() => updatePreference('experienceType', type.value)}
                      >
                        <FormControlLabel
                          value={type.value}
                          control={<Radio />}
                          label={type.label}
                          sx={{ m: 0 }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              What is your primary goal?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Choose the type of support you're looking for.
            </Typography>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={preferences.circlePurpose || ''}
                onChange={(e) => updatePreference('circlePurpose', e.target.value)}
              >
                {PREFERENCE_OPTIONS.circlePurposes.map((purpose) => (
                  <Paper
                    key={purpose.value}
                    elevation={preferences.circlePurpose === purpose.value ? 3 : 1}
                    sx={{
                      p: 2,
                      mb: 2,
                      cursor: 'pointer',
                      border: preferences.circlePurpose === purpose.value
                        ? `2px solid ${theme.palette.primary.main}`
                        : '2px solid transparent',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: alpha(theme.palette.primary.main, 0.5)
                      }
                    }}
                    onClick={() => updatePreference('circlePurpose', purpose.value)}
                  >
                    <FormControlLabel
                      value={purpose.value}
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="subtitle1">
                            {purpose.label.split(' (')[0]}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {purpose.label.match(/\(([^)]+)\)/)?.[1]}
                          </Typography>
                        </Box>
                      }
                      sx={{ m: 0, width: '100%' }}
                    />
                  </Paper>
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Where would you like to meet?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Choose your preferred meeting format.
            </Typography>
            <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
              <RadioGroup
                value={preferences.locationType || ''}
                onChange={(e) => updatePreference('locationType', e.target.value)}
              >
                {PREFERENCE_OPTIONS.locationTypes.map((loc) => (
                  <Paper
                    key={loc.value}
                    elevation={preferences.locationType === loc.value ? 3 : 1}
                    sx={{
                      p: 2,
                      mb: 2,
                      cursor: 'pointer',
                      border: preferences.locationType === loc.value
                        ? `2px solid ${theme.palette.primary.main}`
                        : '2px solid transparent',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: alpha(theme.palette.primary.main, 0.5)
                      }
                    }}
                    onClick={() => updatePreference('locationType', loc.value)}
                  >
                    <FormControlLabel
                      value={loc.value}
                      control={<Radio />}
                      label={loc.label}
                      sx={{ m: 0 }}
                    />
                  </Paper>
                ))}
              </RadioGroup>
            </FormControl>

            {preferences.locationType === 'in-person' && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Your Location (optional)
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      value={preferences.city || ''}
                      onChange={(e) => updatePreference('city', e.target.value)}
                      placeholder="e.g., San Francisco"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      options={US_STATES}
                      value={preferences.state || null}
                      onChange={(_, value) => updatePreference('state', value)}
                      renderInput={(params) => (
                        <TextField {...params} label="State" placeholder="Select state" />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              When are you available?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Select the days and times that work best for you.
            </Typography>

            <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
              <FormLabel sx={{ mb: 1 }}>Preferred Days</FormLabel>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {PREFERENCE_OPTIONS.days.map((day) => (
                  <Chip
                    key={day.value}
                    label={day.label}
                    onClick={() => toggleArrayPreference('preferredDays', day.value)}
                    color={preferences.preferredDays.includes(day.value) ? 'primary' : 'default'}
                    variant={preferences.preferredDays.includes(day.value) ? 'filled' : 'outlined'}
                    sx={{ transition: 'all 0.2s' }}
                  />
                ))}
              </Box>
            </FormControl>

            <FormControl component="fieldset" fullWidth>
              <FormLabel sx={{ mb: 1 }}>Preferred Times</FormLabel>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {PREFERENCE_OPTIONS.times.map((time) => (
                  <Chip
                    key={time.value}
                    label={time.label}
                    onClick={() => toggleArrayPreference('preferredTimes', time.value)}
                    color={preferences.preferredTimes.includes(time.value) ? 'primary' : 'default'}
                    variant={preferences.preferredTimes.includes(time.value) ? 'filled' : 'outlined'}
                    sx={{ transition: 'all 0.2s' }}
                  />
                ))}
              </Box>
            </FormControl>
          </Box>
        );

      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              What values are important to you?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Select values that align with what you're looking for in a circle.
            </Typography>

            <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {PREFERENCE_OPTIONS.values.map((value) => (
                  <Chip
                    key={value.value}
                    label={value.label}
                    onClick={() => toggleArrayPreference('values', value.value)}
                    color={preferences.values.includes(value.value) ? 'primary' : 'default'}
                    variant={preferences.values.includes(value.value) ? 'filled' : 'outlined'}
                    sx={{ transition: 'all 0.2s' }}
                  />
                ))}
              </Box>
            </FormControl>

            <FormControl component="fieldset" fullWidth>
              <FormLabel sx={{ mb: 1 }}>Preferred Group Size</FormLabel>
              <RadioGroup
                row
                value={preferences.capacity || 'medium'}
                onChange={(e) => updatePreference('capacity', e.target.value)}
              >
                {PREFERENCE_OPTIONS.capacities.map((cap) => (
                  <FormControlLabel
                    key={cap.value}
                    value={cap.value}
                    control={<Radio />}
                    label={cap.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        );

      default:
        return null;
    }
  };

  const renderResults = () => (
    <Box>
      <Typography variant="h5" gutterBottom align="center">
        Your Matched Circles
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
        We found {matches.length} circles that match your preferences
      </Typography>

      {matches.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No exact matches found
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Try adjusting your preferences or explore all circles.
          </Typography>
          <Button variant="outlined" onClick={handleReset}>
            Try Again
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {matches.map(({ circle, score, matchReasons }) => (
            <Grid item xs={12} sm={6} key={circle.id}>
              <Box sx={{ position: 'relative' }}>
                <Chip
                  label={`${Math.round(score * 100)}% Match`}
                  color="primary"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 1,
                    fontWeight: 600
                  }}
                />
                <CircleCard
                  circle={circle}
                  onViewDetails={() => handleComplete(circle.id)}
                  showJoinButton={false}
                />
                <Box sx={{ mt: 1, px: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {matchReasons.slice(0, 2).join(' • ')}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '70vh',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            {showResults ? 'Your Matches' : 'Find Your Circle'}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        {!showResults && (
          <>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ mt: 2, borderRadius: 1 }}
            />
            <Stepper activeStep={activeStep} sx={{ mt: 2 }} alternativeLabel>
              {STEPS.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    StepIconComponent={() => (
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: index <= activeStep
                            ? theme.palette.primary.main
                            : theme.palette.grey[300],
                          color: index <= activeStep
                            ? 'white'
                            : theme.palette.grey[600]
                        }}
                      >
                        {index < activeStep ? <CheckIcon fontSize="small" /> : step.icon}
                      </Box>
                    )}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        display: { xs: 'none', sm: 'block' },
                        color: index <= activeStep ? 'text.primary' : 'text.secondary'
                      }}
                    >
                      {step.label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </>
        )}
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
            <CircularProgress size={48} sx={{ mb: 2 }} />
            <Typography variant="h6">Finding your matches...</Typography>
            <Typography variant="body2" color="text.secondary">
              Analyzing {circles.length} circles based on your preferences
            </Typography>
          </Box>
        ) : showResults ? (
          renderResults()
        ) : (
          renderStepContent()
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        {!loading && (
          <>
            <Button
              onClick={showResults ? handleReset : handleBack}
              disabled={activeStep === 0 && !showResults}
              startIcon={showResults ? null : <BackIcon />}
            >
              {showResults ? 'Start Over' : 'Back'}
            </Button>
            <Box sx={{ flex: 1 }} />
            {!showResults && (
              <>
                <Tooltip title="Skip to see all circles">
                  <Button
                    variant="text"
                    onClick={onClose}
                    sx={{ mr: 1 }}
                  >
                    Skip
                  </Button>
                </Tooltip>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={activeStep === STEPS.length - 1 ? <SearchIcon /> : <NextIcon />}
                >
                  {activeStep === STEPS.length - 1 ? 'Find Matches' : 'Next'}
                </Button>
              </>
            )}
            {showResults && (
              <Button variant="contained" onClick={onClose}>
                Browse All Circles
              </Button>
            )}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CircleMatchingWizard;
