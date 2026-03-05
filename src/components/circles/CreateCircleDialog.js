import React, { useState } from 'react';
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
  TextField,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Paper,
  IconButton,
  useTheme,
  alpha,
  LinearProgress,
  Slider,
  FormHelperText
} from '@mui/material';
import {
  Close as CloseIcon,
  ArrowBack as BackIcon,
  ArrowForward as NextIcon,
  Check as CheckIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import { EXPERIENCE_TYPES, CIRCLE_CATEGORIES } from '../../data/circlesData';

const STEPS = ['Basic Info', 'Experience & Topics', 'Meeting Details', 'Location', 'Capacity & Guidelines', 'Review'];

const DEFAULT_FORM_DATA = {
  name: '',
  description: '',
  category: '',
  imageUrl: '',
  experienceTypes: [],
  topics: [],
  values: [],
  meetingSchedule: {
    frequency: 'weekly',
    dayOfWeek: '',
    time: '',
    duration: 90,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  },
  location: {
    type: 'virtual',
    virtualPlatform: '',
    virtualLink: '',
    address: '',
    city: '',
    state: ''
  },
  capacity: 10,
  privacy: 'public',
  guidelines: '',
  coFacilitators: []
};

const CIRCLE_VALUES = [
  'Trauma-Informed',
  'LGBTQ+ Friendly',
  'BIPOC-Centered',
  'Spiritual',
  'Science-Based',
  'Somatic',
  'Peer-Led',
  'Professional-Led',
  'Confidential',
  'Secular'
];

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const VIRTUAL_PLATFORMS = ['Zoom', 'Google Meet', 'Whereby', 'Microsoft Teams', 'Discord', 'Other'];

const DEFAULT_GUIDELINES = `Welcome to our circle! Please review these guidelines:

1. Confidentiality - What's shared in the circle stays in the circle
2. Respect - Honor each person's experience and perspective
3. Active Listening - Practice presence when others are sharing
4. No Cross-Talk - Avoid interrupting or giving unsolicited advice
5. Self-Care - Take breaks as needed, your wellbeing comes first
6. Punctuality - Please join on time and stay for the full session
7. Substances - Do not attend under the influence of substances`;

const CreateCircleDialog = ({ open, onClose, onSubmit, currentUser }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({ ...DEFAULT_FORM_DATA, guidelines: DEFAULT_GUIDELINES });
  const [errors, setErrors] = useState({});
  const [topicInput, setTopicInput] = useState('');

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const updateNestedFormData = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const toggleArrayItem = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value]
    }));
  };

  const addTopic = () => {
    if (topicInput.trim() && !formData.topics.includes(topicInput.trim())) {
      updateFormData('topics', [...formData.topics, topicInput.trim()]);
      setTopicInput('');
    }
  };

  const removeTopic = (topic) => {
    updateFormData('topics', formData.topics.filter((t) => t !== topic));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Basic Info
        if (!formData.name || formData.name.length < 5) {
          newErrors.name = 'Name must be at least 5 characters';
        }
        if (!formData.description || formData.description.length < 50) {
          newErrors.description = 'Description must be at least 50 characters';
        }
        if (!formData.category) {
          newErrors.category = 'Please select a category';
        }
        break;

      case 1: // Experience & Topics
        if (formData.experienceTypes.length === 0) {
          newErrors.experienceTypes = 'Select at least one experience type';
        }
        break;

      case 2: // Meeting Details
        if (!formData.meetingSchedule.dayOfWeek) {
          newErrors.dayOfWeek = 'Please select a day';
        }
        if (!formData.meetingSchedule.time) {
          newErrors.time = 'Please select a time';
        }
        break;

      case 3: // Location
        if (formData.location.type === 'virtual' && !formData.location.virtualPlatform) {
          newErrors.virtualPlatform = 'Please select a platform';
        }
        if (formData.location.type === 'in-person' && !formData.location.city) {
          newErrors.city = 'Please enter a city';
        }
        break;

      case 4: // Capacity & Guidelines
        if (!formData.guidelines || formData.guidelines.length < 50) {
          newErrors.guidelines = 'Guidelines must be at least 50 characters';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      if (activeStep === STEPS.length - 1) {
        handleSubmit();
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    const newCircle = {
      id: Date.now(),
      ...formData,
      facilitator: currentUser,
      members: [currentUser],
      createdAt: new Date().toISOString(),
      status: 'active',
      stats: {
        totalMeetings: 0,
        memberCount: 1,
        avgAttendance: 0
      }
    };

    if (onSubmit) {
      onSubmit(newCircle);
    }
    handleClose();
  };

  const handleClose = () => {
    setActiveStep(0);
    setFormData({ ...DEFAULT_FORM_DATA, guidelines: DEFAULT_GUIDELINES });
    setErrors({});
    onClose();
  };

  const progress = ((activeStep + 1) / STEPS.length) * 100;

  const categoryLabels = {
    'psychedelic-integration': 'Psychedelic Integration',
    'preparation': 'Preparation',
    'harm-reduction': 'Harm Reduction',
    'clinical-practitioners': 'Clinical Practitioners',
    'researchers': 'Researchers',
    'spiritual-exploration': 'Spiritual Exploration'
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Circle Name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name || 'Give your circle a descriptive name'}
                  placeholder="e.g., Psilocybin Integration Circle - San Francisco"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  error={!!errors.description}
                  helperText={errors.description || `${formData.description.length}/500 characters`}
                  placeholder="Describe your circle's purpose, who it's for, and what participants can expect..."
                  inputProps={{ maxLength: 500 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    label="Category"
                    onChange={(e) => updateFormData('category', e.target.value)}
                  >
                    {CIRCLE_CATEGORIES.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {categoryLabels[cat]}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cover Image URL (optional)"
                  value={formData.imageUrl}
                  onChange={(e) => updateFormData('imageUrl', e.target.value)}
                  placeholder="https://..."
                  InputProps={{
                    startAdornment: <ImageIcon sx={{ mr: 1, color: 'action.active' }} />
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Experience Types & Topics
            </Typography>
            <FormControl component="fieldset" fullWidth sx={{ mb: 3 }} error={!!errors.experienceTypes}>
              <FormLabel sx={{ mb: 1 }}>Experience Types (select all that apply)</FormLabel>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {EXPERIENCE_TYPES.map((type) => (
                  <Chip
                    key={type}
                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                    onClick={() => toggleArrayItem('experienceTypes', type)}
                    color={formData.experienceTypes.includes(type) ? 'primary' : 'default'}
                    variant={formData.experienceTypes.includes(type) ? 'filled' : 'outlined'}
                  />
                ))}
              </Box>
              {errors.experienceTypes && (
                <FormHelperText error>{errors.experienceTypes}</FormHelperText>
              )}
            </FormControl>

            <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
              <FormLabel sx={{ mb: 1 }}>Topics</FormLabel>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  size="small"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  placeholder="Add a topic..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTopic())}
                />
                <Button variant="outlined" onClick={addTopic}>
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.topics.map((topic) => (
                  <Chip
                    key={topic}
                    label={topic}
                    onDelete={() => removeTopic(topic)}
                  />
                ))}
              </Box>
            </FormControl>

            <FormControl component="fieldset" fullWidth>
              <FormLabel sx={{ mb: 1 }}>Values & Approach</FormLabel>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {CIRCLE_VALUES.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onClick={() => toggleArrayItem('values', value)}
                    color={formData.values.includes(value) ? 'primary' : 'default'}
                    variant={formData.values.includes(value) ? 'filled' : 'outlined'}
                  />
                ))}
              </Box>
            </FormControl>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Meeting Schedule
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Frequency</InputLabel>
                  <Select
                    value={formData.meetingSchedule.frequency}
                    label="Frequency"
                    onChange={(e) => updateNestedFormData('meetingSchedule', 'frequency', e.target.value)}
                  >
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="biweekly">Biweekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.dayOfWeek}>
                  <InputLabel>Day of Week</InputLabel>
                  <Select
                    value={formData.meetingSchedule.dayOfWeek}
                    label="Day of Week"
                    onChange={(e) => updateNestedFormData('meetingSchedule', 'dayOfWeek', e.target.value)}
                  >
                    {DAYS_OF_WEEK.map((day) => (
                      <MenuItem key={day} value={day}>{day}</MenuItem>
                    ))}
                  </Select>
                  {errors.dayOfWeek && <FormHelperText>{errors.dayOfWeek}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="time"
                  label="Time"
                  value={formData.meetingSchedule.time}
                  onChange={(e) => updateNestedFormData('meetingSchedule', 'time', e.target.value)}
                  error={!!errors.time}
                  helperText={errors.time}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Timezone"
                  value={formData.meetingSchedule.timezone}
                  onChange={(e) => updateNestedFormData('meetingSchedule', 'timezone', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel sx={{ mb: 2 }}>
                    Duration: {formData.meetingSchedule.duration} minutes
                  </FormLabel>
                  <Slider
                    value={formData.meetingSchedule.duration}
                    onChange={(_, value) => updateNestedFormData('meetingSchedule', 'duration', value)}
                    min={60}
                    max={180}
                    step={15}
                    marks={[
                      { value: 60, label: '1 hr' },
                      { value: 90, label: '1.5 hrs' },
                      { value: 120, label: '2 hrs' },
                      { value: 150, label: '2.5 hrs' },
                      { value: 180, label: '3 hrs' }
                    ]}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Meeting Location
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Location Type</InputLabel>
                  <Select
                    value={formData.location.type}
                    label="Location Type"
                    onChange={(e) => updateNestedFormData('location', 'type', e.target.value)}
                  >
                    <MenuItem value="virtual">Virtual Only</MenuItem>
                    <MenuItem value="in-person">In-Person Only</MenuItem>
                    <MenuItem value="hybrid">Hybrid (Both)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {(formData.location.type === 'virtual' || formData.location.type === 'hybrid') && (
                <>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.virtualPlatform}>
                      <InputLabel>Video Platform</InputLabel>
                      <Select
                        value={formData.location.virtualPlatform}
                        label="Video Platform"
                        onChange={(e) => updateNestedFormData('location', 'virtualPlatform', e.target.value)}
                      >
                        {VIRTUAL_PLATFORMS.map((platform) => (
                          <MenuItem key={platform} value={platform}>{platform}</MenuItem>
                        ))}
                      </Select>
                      {errors.virtualPlatform && <FormHelperText>{errors.virtualPlatform}</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Meeting Link (optional)"
                      value={formData.location.virtualLink}
                      onChange={(e) => updateNestedFormData('location', 'virtualLink', e.target.value)}
                      placeholder="https://zoom.us/j/..."
                      helperText="You can add this later"
                    />
                  </Grid>
                </>
              )}

              {(formData.location.type === 'in-person' || formData.location.type === 'hybrid') && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address (optional)"
                      value={formData.location.address}
                      onChange={(e) => updateNestedFormData('location', 'address', e.target.value)}
                      placeholder="123 Main St, Suite 100"
                      helperText="Share with members only, not publicly displayed"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      value={formData.location.city}
                      onChange={(e) => updateNestedFormData('location', 'city', e.target.value)}
                      error={!!errors.city}
                      helperText={errors.city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="State"
                      value={formData.location.state}
                      onChange={(e) => updateNestedFormData('location', 'state', e.target.value)}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Privacy</InputLabel>
                  <Select
                    value={formData.privacy}
                    label="Privacy"
                    onChange={(e) => updateFormData('privacy', e.target.value)}
                  >
                    <MenuItem value="public">Public - Anyone can find and join</MenuItem>
                    <MenuItem value="private">Private - Approval required to join</MenuItem>
                    <MenuItem value="invite-only">Invite Only - By invitation only</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );

      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Capacity & Guidelines
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel sx={{ mb: 2 }}>
                    Maximum Members: {formData.capacity}
                  </FormLabel>
                  <Slider
                    value={formData.capacity}
                    onChange={(_, value) => updateFormData('capacity', value)}
                    min={5}
                    max={20}
                    step={1}
                    marks={[
                      { value: 5, label: '5' },
                      { value: 10, label: '10' },
                      { value: 15, label: '15' },
                      { value: 20, label: '20' }
                    ]}
                  />
                  <FormHelperText>
                    Smaller groups (5-8) allow for deeper sharing. Larger groups (12+) offer more diverse perspectives.
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={8}
                  label="Circle Guidelines"
                  value={formData.guidelines}
                  onChange={(e) => updateFormData('guidelines', e.target.value)}
                  error={!!errors.guidelines}
                  helperText={errors.guidelines || 'Set clear expectations for participants'}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 5:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Circle
            </Typography>
            <Paper elevation={0} sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom>
                    {formData.name || 'Untitled Circle'}
                  </Typography>
                  <Chip
                    label={categoryLabels[formData.category] || formData.category}
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {formData.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Experience Types
                  </Typography>
                  <Typography variant="body2">
                    {formData.experienceTypes.join(', ') || 'None selected'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Values
                  </Typography>
                  <Typography variant="body2">
                    {formData.values.join(', ') || 'None selected'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Schedule
                  </Typography>
                  <Typography variant="body2">
                    {formData.meetingSchedule.frequency} on {formData.meetingSchedule.dayOfWeek}s at {formData.meetingSchedule.time}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Duration
                  </Typography>
                  <Typography variant="body2">
                    {formData.meetingSchedule.duration} minutes
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body2">
                    {formData.location.type === 'virtual'
                      ? `Virtual (${formData.location.virtualPlatform})`
                      : formData.location.type === 'in-person'
                      ? `${formData.location.city}, ${formData.location.state}`
                      : `Hybrid - ${formData.location.city}, ${formData.location.state}`}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Capacity
                  </Typography>
                  <Typography variant="body2">
                    {formData.capacity} members max ({formData.privacy})
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          <Typography variant="h6">Create an Integration Circle</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ mt: 2, borderRadius: 1 }} />
        <Stepper activeStep={activeStep} sx={{ mt: 2 }} alternativeLabel>
          {STEPS.map((label, index) => (
            <Step key={label}>
              <StepLabel>
                <Typography
                  variant="caption"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    color: index <= activeStep ? 'text.primary' : 'text.secondary'
                  }}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3 }}>
        {renderStepContent()}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
          startIcon={<BackIcon />}
        >
          Back
        </Button>
        <Box sx={{ flex: 1 }} />
        <Button onClick={handleClose} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          endIcon={activeStep === STEPS.length - 1 ? <CheckIcon /> : <NextIcon />}
        >
          {activeStep === STEPS.length - 1 ? 'Create Circle' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCircleDialog;
