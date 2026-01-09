import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { floatUp, floatUpLeft, floatUpRight, emojiPop } from '../../theme/animations';

/**
 * EmojiReactionBurst Component
 * Creates a burst of emoji particles when a reaction is triggered
 */
const EmojiReactionBurst = ({ emoji, trigger, onComplete }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger && emoji) {
      // Create burst particles
      const newParticles = [
        { id: 1, animation: floatUp, delay: 0 },
        { id: 2, animation: floatUpLeft, delay: 50 },
        { id: 3, animation: floatUpRight, delay: 50 },
        { id: 4, animation: floatUpLeft, delay: 100 },
        { id: 5, animation: floatUpRight, delay: 100 },
      ];
      setParticles(newParticles);

      // Clear particles after animation
      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [trigger, emoji, onComplete]);

  if (particles.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      {/* Main emoji pop */}
      <Box
        sx={{
          position: 'absolute',
          fontSize: '2rem',
          animation: `${emojiPop} 0.4s ease-out forwards`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {emoji}
      </Box>

      {/* Burst particles */}
      {particles.map((particle) => (
        <Box
          key={particle.id}
          sx={{
            position: 'absolute',
            fontSize: '1rem',
            animation: `${particle.animation} 0.6s ease-out ${particle.delay}ms forwards`,
            opacity: 0.8,
          }}
        >
          {emoji}
        </Box>
      ))}
    </Box>
  );
};

export default EmojiReactionBurst;
