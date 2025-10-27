import { keyframes } from '@mui/material';

/**
 * Animation System for GSAPS Social Media App
 * Modern micro-interactions and smooth animations
 */

// ===== FADE ANIMATIONS =====
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ===== SLIDE ANIMATIONS =====
export const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

// ===== SCALE ANIMATIONS =====
export const scaleIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const scaleOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.9);
    opacity: 0;
  }
`;

export const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

export const heartbeat = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  10%, 30% {
    transform: scale(1.1);
  }
  20%, 40% {
    transform: scale(1);
  }
`;

// ===== BOUNCE ANIMATIONS =====
export const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
`;

// ===== SHAKE ANIMATIONS (for errors) =====
export const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
`;

export const shakeY = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateY(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateY(10px);
  }
`;

// ===== ROTATE ANIMATIONS =====
export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const rotateIn = keyframes`
  from {
    opacity: 0;
    transform: rotate(-200deg) scale(0);
  }
  to {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
`;

// ===== RIPPLE EFFECT =====
export const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

// ===== SHIMMER/LOADING =====
export const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const skeletonLoading = keyframes`
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
`;

// ===== FLOAT ANIMATION =====
export const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// ===== GLOW ANIMATION =====
export const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(106, 82, 179, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(106, 82, 179, 0.8);
  }
`;

// ===== NOTIFICATION BADGE =====
export const badgePulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 112, 67, 0.7);
  }
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(255, 112, 67, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 112, 67, 0);
  }
`;

// ===== TYPING INDICATOR =====
export const typing = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
`;

// ===== SUCCESS CHECKMARK =====
export const checkmark = keyframes`
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

// ===== WAVE ANIMATION =====
export const wave = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  10%, 30% {
    transform: rotate(14deg);
  }
  20%, 40% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(14deg);
  }
  60% {
    transform: rotate(-4deg);
  }
  70% {
    transform: rotate(10deg);
  }
`;

// ===== GRADIENT ANIMATION =====
export const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// ===== EXPORT ALL ANIMATIONS =====
export const animations = {
  fadeIn,
  fadeOut,
  fadeInUp,
  fadeInDown,
  slideInRight,
  slideInLeft,
  slideUp,
  scaleIn,
  scaleOut,
  pulse,
  heartbeat,
  bounce,
  bounceIn,
  shake,
  shakeY,
  rotate,
  rotateIn,
  ripple,
  shimmer,
  skeletonLoading,
  float,
  glow,
  badgePulse,
  typing,
  checkmark,
  wave,
  gradientShift
};

// ===== ANIMATION UTILITIES =====
export const animationDurations = {
  fast: '0.15s',
  normal: '0.3s',
  slow: '0.5s',
  verySlow: '0.8s'
};

export const easings = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

/**
 * Helper function to create animation styles
 * @param {string} animationName - Name of the animation keyframe
 * @param {string} duration - Animation duration
 * @param {string} easing - Animation easing function
 * @param {string} fillMode - Animation fill mode
 * @returns {Object} Animation style object
 */
export const createAnimation = (
  animationName,
  duration = animationDurations.normal,
  easing = easings.easeInOut,
  fillMode = 'both'
) => ({
  animation: `${animationName} ${duration} ${easing} ${fillMode}`
});

export default animations;
