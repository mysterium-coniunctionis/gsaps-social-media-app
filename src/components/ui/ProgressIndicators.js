import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  styled,
  alpha,
  useTheme
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';

/**
 * Custom styled connector for stepper
 */
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' 
      ? theme.palette.grey[800] 
      : theme.palette.grey[300],
    borderRadius: 1,
  },
}));

/**
 * Custom step icon component
 */
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300],
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
  }),
}));

function ColorlibStepIcon({ icon, active, completed }) {
  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }}>
      {completed ? (
        <CheckIcon />
      ) : (
        <Typography variant="body1" fontWeight={600}>
          {icon}
        </Typography>
      )}
    </ColorlibStepIconRoot>
  );
}

/**
 * Enhanced Progress Stepper
 * For multi-step processes like forms, onboarding, etc.
 */
export const ProgressStepper = ({
  steps,
  activeStep,
  alternativeLabel = true,
  showLabels = true
}) => {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel={alternativeLabel}
      connector={<ColorlibConnector />}
    >
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel
            StepIconComponent={ColorlibStepIcon}
            optional={
              !showLabels ? null : (
                <Typography variant="caption" color="text.secondary">
                  Step {index + 1}
                </Typography>
              )
            }
          >
            {showLabels && label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

/**
 * Progress Bar with Label
 * For showing completion percentage
 */
export const LabeledProgress = ({
  value,
  label,
  showPercentage = true,
  size = 'medium',
  color = 'primary',
  gradient = false
}) => {
  const theme = useTheme();
  const heights = { small: 6, medium: 10, large: 16 };

  return (
    <Box sx={{ width: '100%' }}>
      {(label || showPercentage) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          {label && (
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          )}
          {showPercentage && (
            <Typography variant="body2" fontWeight={600} color="primary">
              {Math.round(value)}%
            </Typography>
          )}
        </Box>
      )}
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: heights[size],
          borderRadius: heights[size] / 2,
          bgcolor: alpha(theme.palette[color].main, 0.1),
          '& .MuiLinearProgress-bar': {
            borderRadius: heights[size] / 2,
            ...(gradient && {
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
            })
          }
        }}
      />
    </Box>
  );
};

/**
 * Circular Progress with Stats
 * For showing completion in a circular format
 */
export const CircularProgressStats = ({
  value,
  total,
  size = 120,
  thickness = 8,
  label,
  sublabel
}) => {
  const theme = useTheme();
  const percentage = total > 0 ? (value / total) * 100 : 0;
  const circumference = 2 * Math.PI * ((size - thickness) / 2);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ position: 'relative', width: size, height: size }}>
        {/* Background circle */}
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - thickness) / 2}
            fill="none"
            stroke={alpha(theme.palette.primary.main, 0.1)}
            strokeWidth={thickness}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - thickness) / 2}
            fill="none"
            stroke={theme.palette.primary.main}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          />
        </svg>
        
        {/* Center content */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h4" fontWeight={700} color="primary">
            {value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            of {total}
          </Typography>
        </Box>
      </Box>
      
      {label && (
        <Typography variant="body2" fontWeight={600} sx={{ mt: 1 }}>
          {label}
        </Typography>
      )}
      {sublabel && (
        <Typography variant="caption" color="text.secondary">
          {sublabel}
        </Typography>
      )}
    </Box>
  );
};

/**
 * Milestone Progress
 * Shows progress with milestones marked
 */
export const MilestoneProgress = ({
  value,
  milestones = [],
  height = 8
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative', width: '100%', py: 2 }}>
      {/* Progress bar */}
      <Box
        sx={{
          height,
          borderRadius: height / 2,
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${value}%`,
            borderRadius: height / 2,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            transition: 'width 0.5s ease-in-out'
          }}
        />
      </Box>
      
      {/* Milestones */}
      {milestones.map((milestone, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            left: `${milestone.position}%`,
            top: -8,
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              bgcolor: value >= milestone.position 
                ? theme.palette.success.main 
                : theme.palette.grey[300],
              border: `3px solid ${theme.palette.background.paper}`,
              boxShadow: 1
            }}
          />
          <Typography 
            variant="caption" 
            sx={{ 
              mt: 0.5, 
              whiteSpace: 'nowrap',
              color: value >= milestone.position ? 'success.main' : 'text.secondary'
            }}
          >
            {milestone.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ProgressStepper;
