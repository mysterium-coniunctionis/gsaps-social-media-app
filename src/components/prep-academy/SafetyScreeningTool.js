import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Alert,
  AlertTitle,
  alpha,
  useTheme,
  Collapse,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  Security as SecurityIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
  LocalHospital as MedicalIcon,
  Psychology as MentalIcon,
  Medication as MedsIcon,
  ArrowForward as NextIcon
} from '@mui/icons-material';
import { SAFETY_SCREENING_QUESTIONS } from '../../data/prepAcademyData';
import GlassCard from '../common/GlassCard';

/**
 * SafetyScreeningTool - Interactive safety screening questionnaire
 * Helps users identify potential contraindications and safety considerations
 */
const SafetyScreeningTool = ({ onComplete }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const sections = [
    { key: 'physical', label: 'Physical Health', icon: <MedicalIcon />, questions: SAFETY_SCREENING_QUESTIONS.physical },
    { key: 'mental', label: 'Mental Health', icon: <MentalIcon />, questions: SAFETY_SCREENING_QUESTIONS.mental },
    { key: 'medications', label: 'Medications', icon: <MedsIcon />, questions: SAFETY_SCREENING_QUESTIONS.medications }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (activeStep < sections.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setShowResults(true);
      if (onComplete) onComplete(getResults());
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const currentSection = sections[activeStep];
  const currentQuestions = currentSection?.questions || [];
  const allCurrentAnswered = currentQuestions.every(q => answers[q.id] !== undefined);

  // Calculate results
  const getResults = () => {
    const flaggedItems = [];
    const allQuestions = [
      ...SAFETY_SCREENING_QUESTIONS.physical,
      ...SAFETY_SCREENING_QUESTIONS.mental,
      ...SAFETY_SCREENING_QUESTIONS.medications
    ];

    allQuestions.forEach(q => {
      if (answers[q.id] === 'yes') {
        flaggedItems.push({
          ...q,
          section: q.id.includes('cardiac') || q.id.includes('liver') || q.id.includes('pregnancy') || q.id.includes('seizure')
            ? 'physical'
            : q.id.includes('ssri') || q.id.includes('maoi') || q.id.includes('lithium') || q.id.includes('other-meds')
            ? 'medications'
            : 'mental'
        });
      }
    });

    const highSeverityCount = flaggedItems.filter(i => i.severity === 'high').length;
    const mediumSeverityCount = flaggedItems.filter(i => i.severity === 'medium').length;

    let overallRisk = 'low';
    if (highSeverityCount > 0) overallRisk = 'high';
    else if (mediumSeverityCount > 1) overallRisk = 'medium';

    return { flaggedItems, overallRisk, highSeverityCount, mediumSeverityCount };
  };

  const results = getResults();
  const progress = (Object.keys(answers).length / 
    (SAFETY_SCREENING_QUESTIONS.physical.length + 
     SAFETY_SCREENING_QUESTIONS.mental.length + 
     SAFETY_SCREENING_QUESTIONS.medications.length)) * 100;

  if (showResults) {
    return (
      <Box>
        <GlassCard sx={{ mb: 4, p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <SecurityIcon color="primary" fontSize="large" />
            <Box>
              <Typography variant="h5" fontWeight={600}>
                Screening Results
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Review your results carefully and discuss with a healthcare provider.
              </Typography>
            </Box>
          </Box>
        </GlassCard>

        {/* Overall Assessment */}
        <Alert
          severity={results.overallRisk === 'high' ? 'error' : results.overallRisk === 'medium' ? 'warning' : 'success'}
          sx={{ mb: 3 }}
        >
          <AlertTitle>
            {results.overallRisk === 'high' && 'Important Considerations Identified'}
            {results.overallRisk === 'medium' && 'Some Considerations to Discuss'}
            {results.overallRisk === 'low' && 'No Major Concerns Identified'}
          </AlertTitle>
          {results.overallRisk === 'high' && (
            <Typography>
              Based on your responses, there are {results.highSeverityCount} significant factor(s) that 
              require consultation with a healthcare provider before proceeding with any psychedelic experience.
            </Typography>
          )}
          {results.overallRisk === 'medium' && (
            <Typography>
              Your responses indicate some factors that should be discussed with a qualified professional 
              to ensure your safety.
            </Typography>
          )}
          {results.overallRisk === 'low' && (
            <Typography>
              Based on your responses, you don&apos;t appear to have major contraindications. However, always 
              consult with a healthcare provider for personalized medical advice.
            </Typography>
          )}
        </Alert>

        {/* Flagged Items */}
        {results.flaggedItems.length > 0 && (
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Items Requiring Attention
            </Typography>
            {results.flaggedItems.map((item, idx) => (
              <Card
                key={idx}
                variant="outlined"
                sx={{
                  mb: 2,
                  borderColor: item.severity === 'high' 
                    ? theme.palette.error.main 
                    : theme.palette.warning.main
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <WarningIcon 
                      color={item.severity === 'high' ? 'error' : 'warning'} 
                    />
                    <Box>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Chip 
                          label={item.severity.toUpperCase()} 
                          size="small"
                          color={item.severity === 'high' ? 'error' : 'warning'}
                        />
                      </Box>
                      <Typography variant="body1" gutterBottom>
                        {item.question}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <InfoIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                        {item.info}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Paper>
        )}

        {/* Recommendations */}
        <Paper sx={{ p: 3, borderRadius: 3, bgcolor: alpha(theme.palette.info.main, 0.05) }}>
          <Typography variant="h6" gutterBottom>
            Next Steps
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" variant="body2" paragraph>
              <strong>Consult a healthcare provider</strong> to discuss your specific situation before proceeding 
              with any psychedelic experience.
            </Typography>
            <Typography component="li" variant="body2" paragraph>
              <strong>Be honest</strong> about your full medical history, including all medications and supplements.
            </Typography>
            <Typography component="li" variant="body2" paragraph>
              <strong>Work with qualified professionals</strong> who can properly screen and support you.
            </Typography>
            <Typography component="li" variant="body2">
              <strong>Remember</strong> this screening is educational only and not a substitute for medical advice.
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={() => { setShowResults(false); setActiveStep(0); setAnswers({}); }}>
            Retake Screening
          </Button>
          <Button variant="contained" onClick={() => window.print()}>
            Save Results
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <GlassCard sx={{ mb: 4, p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <SecurityIcon color="primary" fontSize="large" />
          <Box>
            <Typography variant="h5" fontWeight={600}>
              Safety Screening
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This questionnaire helps identify potential safety considerations. Answer honestly.
            </Typography>
          </Box>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ height: 8, borderRadius: 4 }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {Math.round(progress)}% complete
        </Typography>
      </GlassCard>

      {/* Disclaimer */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>Important Notice</AlertTitle>
        This screening is for educational purposes only and does not constitute medical advice. 
        Always consult with a qualified healthcare provider before considering any psychedelic experience.
      </Alert>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {sections.map((section, idx) => (
          <Step key={section.key}>
            <StepLabel>{section.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Current Section */}
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          {currentSection.icon}
          <Typography variant="h6">{currentSection.label}</Typography>
        </Box>

        {currentQuestions.map((question, idx) => (
          <Box key={question.id} sx={{ mb: 4 }}>
            <Typography variant="body1" fontWeight={500} gutterBottom>
              {idx + 1}. {question.question}
            </Typography>
            <RadioGroup
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              row
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            <Collapse in={answers[question.id] === 'yes'}>
              <Alert 
                severity={question.severity === 'high' ? 'warning' : 'info'} 
                sx={{ mt: 1 }}
              >
                {question.info}
              </Alert>
            </Collapse>
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            endIcon={activeStep === sections.length - 1 ? <CheckIcon /> : <NextIcon />}
            onClick={handleNext}
            disabled={!allCurrentAnswered}
          >
            {activeStep === sections.length - 1 ? 'View Results' : 'Continue'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SafetyScreeningTool;
