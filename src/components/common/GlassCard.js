import React from 'react';
import { Card } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * GlassCard component with glassmorphism effect
 * Creates a modern frosted glass appearance with blur and transparency
 *
 * Props:
 * - children: Card content
 * - sx: Additional styles to merge
 * - variant: 'default' | 'strong' | 'subtle' (controls blur and opacity)
 * - hover: boolean - enable hover effect
 * - All other Card props
 */
const GlassCard = ({
  children,
  sx = {},
  variant = 'default',
  hover = false,
  ...props
}) => {
  const variants = {
    default: {
      blur: 10,
      bgOpacity: 0.7,
      borderOpacity: 0.2,
    },
    strong: {
      blur: 15,
      bgOpacity: 0.8,
      borderOpacity: 0.3,
    },
    subtle: {
      blur: 5,
      bgOpacity: 0.5,
      borderOpacity: 0.1,
    }
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <Card
      {...props}
      sx={{
        background: (theme) =>
          alpha(
            theme.palette.mode === 'dark'
              ? theme.palette.background.paper
              : theme.palette.background.default,
            selectedVariant.bgOpacity
          ),
        backdropFilter: `blur(${selectedVariant.blur}px)`,
        WebkitBackdropFilter: `blur(${selectedVariant.blur}px)`, // Safari support
        border: (theme) =>
          `1px solid ${alpha(
            theme.palette.mode === 'dark'
              ? theme.palette.common.white
              : theme.palette.common.black,
            selectedVariant.borderOpacity
          )}`,
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            : '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...(hover && {
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 12px 40px 0 rgba(0, 0, 0, 0.5)'
                : '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
            borderColor: (theme) =>
              alpha(
                theme.palette.primary.main,
                0.5
              ),
          }
        }),
        ...sx,
      }}
    >
      {children}
    </Card>
  );
};

export default React.memo(GlassCard);
