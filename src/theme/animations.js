import { keyframes } from '@mui/material';

// Fade animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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

export const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Scale animations
export const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const scaleUp = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
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

// Bounce animations
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

// Shake animation
export const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
`;

// Rotate animations
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
    transform: rotate(-200deg);
  }
  to {
    opacity: 1;
    transform: rotate(0);
  }
`;

// Slide animations
export const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const slideInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const slideInUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const slideInDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

// Flip animations
export const flipInX = keyframes`
  from {
    opacity: 0;
    transform: perspective(400px) rotateX(90deg);
  }
  to {
    opacity: 1;
    transform: perspective(400px) rotateX(0);
  }
`;

export const flipInY = keyframes`
  from {
    opacity: 0;
    transform: perspective(400px) rotateY(90deg);
  }
  to {
    opacity: 1;
    transform: perspective(400px) rotateY(0);
  }
`;

// Shimmer animation (for loading states)
export const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

// Glow animation
export const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(33, 150, 243, 0.8);
  }
`;

// Heartbeat animation (for likes)
export const heartbeat = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  10%, 30% {
    transform: scale(0.9);
  }
  20%, 40%, 60%, 80% {
    transform: scale(1.1);
  }
  50%, 70% {
    transform: scale(1.05);
  }
`;

// Notification badge pulse
export const badgePulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.7);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 0 5px rgba(244, 67, 54, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(244, 67, 54, 0);
  }
`;

// Wave animation
export const wave = keyframes`
  0%, 60%, 100% {
    transform: rotate(0deg);
  }
  10%, 30% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
`;

// Typing indicator animation
export const typingDot = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
`;

// Progress bar animation
export const progressBar = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

// Skeleton loading animation
export const skeletonLoading = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Toast notification slide in
export const toastSlideIn = keyframes`
  from {
    transform: translateX(calc(100% + 16px));
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Toast notification slide out
export const toastSlideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(calc(100% + 16px));
    opacity: 0;
  }
`;

// Emoji burst animation for reactions
export const emojiBurst = keyframes`
  0% {
    transform: scale(0) translateY(0);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.5) translateY(-50px);
    opacity: 0;
  }
`;

// Emoji pop animation
export const emojiPop = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.4);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
`;

// Floating particles for burst effect
export const floatUp = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-60px) scale(0.5);
    opacity: 0;
  }
`;

export const floatUpLeft = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-30px, -50px) scale(0.5);
    opacity: 0;
  }
`;

export const floatUpRight = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(30px, -50px) scale(0.5);
    opacity: 0;
  }
`;

// Animation duration and easing constants
export const ANIMATION_DURATION = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '800ms',
};

export const ANIMATION_EASING = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};
