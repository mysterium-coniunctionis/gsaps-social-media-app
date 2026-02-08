import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  alpha,
  useTheme
} from '@mui/material';
import {
  LightbulbOutlined as IdeaIcon,
  Save as SaveIcon,
  Favorite as HeartIcon
} from '@mui/icons-material';
import { INTENTION_PROMPTS } from '../../data/prepAcademyData';
import GlassCard from '../common/GlassCard';

/**
 * IntentionSettingTool - Interactive tool for setting intentions before a psychedelic experience
 */
const IntentionSettingTool = ({ onSave }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [intention, setIntention] = useState('');
  const [reflections, setReflections] = useState({});
  const [savedIntentions, setSavedIntentions] = useState([]);

  const steps = [
    { label: 'Choose a Focus Area', description: 'Select what feels most important right now.' },
    { label: 'Reflect on Prompts', description: 'Let these questions guide your thinking.' },
    { label: 'Write Your Intention', description: 'Put your intention into words.' },
    { label: 'Review & Save', description: 'Finalize your intention for your journey.' }
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setActiveStep(1);
  };

  const handlePromptReflection = (prompt, reflection) => {
    setReflections({ ...reflections, [prompt]: reflection });
  };

  const handleSaveIntention = () => {
    const newIntention = {
      id: Date.now(),
      category: selectedCategory,
      intention,
      reflections,
      createdAt: new Date().toISOString()
    };
    setSavedIntentions([...savedIntentions, newIntention]);
    if (onSave) onSave(newIntention);
    
    // Reset for new intention
    setActiveStep(0);
    setSelectedCategory(null);
    setIntention('');
    setReflections({});
  };

  const selectedPrompts = selectedCategory
    ? INTENTION_PROMPTS.find(p => p.category === selectedCategory)?.prompts || []
    : [];

  return (
    <Box>
      {/* Header */}
      <GlassCard sx={{ mb: 4, p: 3, bgcolor: alpha(theme.palette.secondary.main, 0.05) }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <IdeaIcon color="secondary" fontSize="large" />
          <Box>
            <Typography variant="h5" fontWeight={600}>
              Intention Setting Tool
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A guided process to help you set meaningful intentions for your journey.
            </Typography>
          </Box>
        </Box>
      </GlassCard>

      <Grid container spacing={4}>
        {/* Main Tool Area */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {/* Step 1: Choose Focus Area */}
              <Step>
                <StepLabel>{steps[0].label}</StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {steps[0].description}
                  </Typography>
                  <Grid container spacing={2}>
                    {INTENTION_PROMPTS.map((category) => (
                      <Grid item xs={6} sm={4} key={category.category}>
                        <Card
                          variant="outlined"
                          sx={{
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            border: selectedCategory === category.category
                              ? `2px solid ${theme.palette.secondary.main}`
                              : undefined,
                            '&:hover': {
                              borderColor: theme.palette.secondary.main,
                              transform: 'translateY(-2px)'
                            }
                          }}
                          onClick={() => handleCategorySelect(category.category)}
                        >
                          <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <Typography variant="h6">{category.category}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </StepContent>
              </Step>

              {/* Step 2: Reflect on Prompts */}
              <Step>
                <StepLabel>{steps[1].label}</StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {steps[1].description} Take your time with each question.
                  </Typography>
                  {selectedPrompts.map((prompt, idx) => (
                    <Box key={idx} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                        {prompt}
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Reflect on this question..."
                        value={reflections[prompt] || ''}
                        onChange={(e) => handlePromptReflection(prompt, e.target.value)}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                  ))}
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button onClick={() => setActiveStep(0)}>Back</Button>
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep(2)}
                      disabled={Object.keys(reflections).length === 0}
                    >
                      Continue
                    </Button>
                  </Box>
                </StepContent>
              </Step>

              {/* Step 3: Write Intention */}
              <Step>
                <StepLabel>{steps[2].label}</StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {steps[2].description}
                  </Typography>
                  <Box sx={{ bgcolor: alpha(theme.palette.info.main, 0.05), p: 2, borderRadius: 2, mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Tips for writing intentions:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Use positive language (what you want, not what you don&apos;t want)<br />
                      • Be specific but open to unexpected insights<br />
                      • Focus on your inner experience, not external outcomes<br />
                      • Keep it short enough to remember
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="My intention for this experience is..."
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button onClick={() => setActiveStep(1)}>Back</Button>
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep(3)}
                      disabled={!intention.trim()}
                    >
                      Continue
                    </Button>
                  </Box>
                </StepContent>
              </Step>

              {/* Step 4: Review & Save */}
              <Step>
                <StepLabel>{steps[3].label}</StepLabel>
                <StepContent>
                  <Card sx={{ mb: 3, bgcolor: alpha(theme.palette.secondary.main, 0.05) }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <HeartIcon color="secondary" />
                        <Chip label={selectedCategory} color="secondary" size="small" />
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        Your Intention
                      </Typography>
                      <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                        &quot;{intention}&quot;
                      </Typography>
                    </CardContent>
                  </Card>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button onClick={() => setActiveStep(2)}>Edit</Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<SaveIcon />}
                      onClick={handleSaveIntention}
                    >
                      Save Intention
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </Paper>
        </Grid>

        {/* Saved Intentions Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Intentions
            </Typography>
            {savedIntentions.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Your saved intentions will appear here.
              </Typography>
            ) : (
              savedIntentions.map((saved, idx) => (
                <Card key={saved.id} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Chip label={saved.category} size="small" sx={{ mb: 1 }} />
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                      &quot;{saved.intention}&quot;
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(saved.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </Paper>

          {/* Guidance Card */}
          <Paper sx={{ p: 3, borderRadius: 3, mt: 3, bgcolor: alpha(theme.palette.info.main, 0.05) }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              About Intentions
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Intentions are different from expectations. An intention is a direction you&apos;d like 
              to explore, while remaining open to whatever the experience reveals.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Common intention themes:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {['Healing', 'Self-discovery', 'Letting go', 'Connection', 'Clarity', 'Growth'].map(tag => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IntentionSettingTool;
