import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useAccessibility } from '../../context/AccessibilityContext';

/**
 * Compatibility Radar Chart Component
 * Visual representation of match compatibility across multiple dimensions
 */
const CompatibilityRadar = ({ breakdown, size = 280, animated = true }) => {
  const canvasRef = useRef(null);
  const [hoveredAxis, setHoveredAxis] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const { preferences } = useAccessibility();

  const axes = useMemo(() => [
    { key: 'expertise', label: 'Research Interests', angle: 0 },
    { key: 'experience', label: 'Experience Level', angle: 60 },
    { key: 'availability', label: 'Availability', angle: 120 },
    { key: 'communication', label: 'Communication Style', angle: 180 },
    { key: 'goals', label: 'Goals Alignment', angle: 240 },
    { key: 'mutualConnections', label: 'Network', angle: 300 }
  ], []);

  const shouldAnimate = animated && !preferences.reduceMotion;

  // Animation effect
  useEffect(() => {
    if (!shouldAnimate) {
      setAnimationProgress(1);
      return;
    }

    let startTime = null;
    const duration = 1000; // 1 second animation

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setAnimationProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [shouldAnimate]);

  // Draw radar chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !breakdown) return;

    const ctx = canvas.getContext('2d');
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw background circles (grid)
    const levels = 5;
    for (let i = 1; i <= levels; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius / levels) * i, 0, 2 * Math.PI);
      ctx.strokeStyle = i === levels ? '#e0e0e0' : '#f5f5f5';
      ctx.lineWidth = i === levels ? 2 : 1;
      ctx.stroke();
    }

    // Draw axes
    axes.forEach((axis, index) => {
      const angle = (axis.angle * Math.PI) / 180;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Axis line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#e0e0e0';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Axis label
      const labelRadius = radius + 25;
      const labelX = centerX + labelRadius * Math.cos(angle);
      const labelY = centerY + labelRadius * Math.sin(angle);

      ctx.fillStyle = hoveredAxis === index ? '#1976d2' : '#666';
      ctx.font = hoveredAxis === index ? 'bold 11px Arial' : '10px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(axis.label.split(' ')[0], labelX, labelY);
      if (axis.label.split(' ').length > 1) {
        ctx.fillText(axis.label.split(' ').slice(1).join(' '), labelX, labelY + 12);
      }
    });

    // Draw data polygon
    ctx.beginPath();
    axes.forEach((axis, index) => {
      const value = (breakdown[axis.key] || 0) / 100;
      const animatedValue = value * animationProgress;
      const angle = (axis.angle * Math.PI) / 180;
      const distance = radius * animatedValue;
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();

    // Fill
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(25, 118, 210, 0.3)');
    gradient.addColorStop(1, 'rgba(25, 118, 210, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Stroke
    ctx.strokeStyle = '#1976d2';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw data points
    axes.forEach((axis) => {
      const value = (breakdown[axis.key] || 0) / 100;
      const animatedValue = value * animationProgress;
      const angle = (axis.angle * Math.PI) / 180;
      const distance = radius * animatedValue;
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#1976d2';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [breakdown, size, hoveredAxis, animationProgress, axes]);

  // Handle mouse move for tooltips
  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = size / 2;
    const centerY = size / 2;
    const labelRadius = size * 0.35 + 25;

    let foundAxis = null;

    axes.forEach((axis, index) => {
      const angle = (axis.angle * Math.PI) / 180;
      const labelX = centerX + labelRadius * Math.cos(angle);
      const labelY = centerY + labelRadius * Math.sin(angle);

      const distance = Math.sqrt((x - labelX) ** 2 + (y - labelY) ** 2);

      if (distance < 30) {
        foundAxis = index;
      }
    });

    setHoveredAxis(foundAxis);
  };

  const handleMouseLeave = () => {
    setHoveredAxis(null);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Compatibility Analysis
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <canvas
            ref={canvasRef}
            width={size}
            height={size}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: hoveredAxis !== null ? 'pointer' : 'default' }}
          />
        </Box>

        {/* Legend with scores */}
        <Box sx={{ mt: 3 }}>
          {axes.map((axis, index) => (
            <Box
              key={axis.key}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 0.5,
                px: 1,
                borderRadius: 1,
                bgcolor: hoveredAxis === index ? 'action.hover' : 'transparent',
                transition: 'background-color 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredAxis(index)}
              onMouseLeave={() => setHoveredAxis(null)}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: hoveredAxis === index ? 'bold' : 'normal',
                  color: hoveredAxis === index ? 'primary.main' : 'text.primary'
                }}
              >
                {axis.label}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 4,
                    bgcolor: 'action.hover',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    sx={{
                      width: `${breakdown?.[axis.key] || 0}%`,
                      height: '100%',
                      bgcolor: 'primary.main',
                      transition: 'width 0.3s'
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 'bold',
                    minWidth: 35,
                    textAlign: 'right',
                    color: hoveredAxis === index ? 'primary.main' : 'text.secondary'
                  }}
                >
                  {breakdown?.[axis.key] || 0}%
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Overall Score */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            Overall Compatibility
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {breakdown
              ? Math.round(
                  Object.values(breakdown).reduce((sum, val) => sum + val, 0) /
                    Object.values(breakdown).length
                )
              : 0}
            %
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompatibilityRadar;
