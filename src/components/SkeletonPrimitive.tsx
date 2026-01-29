'use client';

/**
 * SkeletonPrimitive - Individual animated skeleton block
 * Renders a single skeleton block with the specified animation
 */

import React, { CSSProperties, useMemo } from 'react';
import { SkeletonBlock } from '../core/layout-engine';
import { generateShimmerGradient, generateWaveGradient, generatePulseColors } from '../core/color-logic';

export interface SkeletonPrimitiveProps {
  block: SkeletonBlock;
  animation?: 'shimmer' | 'pulse' | 'wave' | 'none';
  speed?: number;
  theme?: 'auto' | 'dark' | 'light';
}

/**
 * SkeletonPrimitive Component
 * Renders a single skeleton block with animation
 */
export const SkeletonPrimitive: React.FC<SkeletonPrimitiveProps> = ({
  block,
  animation = 'shimmer',
  speed = 1,
  theme = 'auto',
}) => {
  const { backgroundColor, borderRadius, x, y, width, height, lineHeight, fontSize } = block;

  // Generate animation styles
  const animationStyles = useMemo(() => {
    const animationDuration = `${0.6 / speed}s`;
    const baseAnimation = {
      animationDuration,
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
    };

    switch (animation) {
      case 'shimmer': {
        const gradient = generateShimmerGradient(backgroundColor);
        const gradientStr = gradient
          .map(([pos, color]) => `${color} ${pos}%`)
          .join(', ');

        return {
          ...baseAnimation,
          animation: `skeleton-shimmer ${animationDuration} linear infinite`,
          background: `linear-gradient(90deg, ${gradientStr})`,
          backgroundSize: '200% 100%',
        };
      }

      case 'pulse': {
        const colors = generatePulseColors(backgroundColor);
        return {
          ...baseAnimation,
          animation: `skeleton-pulse-color ${animationDuration} ease-in-out infinite`,
          backgroundColor: colors.base,
          '--skeleton-base-color': colors.base,
          '--skeleton-highlight-color': colors.highlight,
        } as React.CSSProperties;
      }

      case 'wave': {
        const waveGradient = generateWaveGradient(backgroundColor);
        return {
          ...baseAnimation,
          animation: `skeleton-wave ${animationDuration} ease-in-out infinite`,
          background: waveGradient,
          backgroundSize: '200% 100%',
        };
      }

      case 'none':
      default:
        return {
          backgroundColor,
        };
    }
  }, [animation, speed, backgroundColor]);

  const blockStyle: CSSProperties = {
    position: 'absolute',
    top: y,
    left: x,
    width,
    height,
    borderRadius: borderRadius === '0px' ? 0 : borderRadius,
    opacity: block.opacity,
    zIndex: block.zIndex,
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    ...animationStyles,
  };

  // For text nodes, apply text-specific styling
  if (block.isText && lineHeight) {
    const lh = parseInt(lineHeight);
    blockStyle.height = !isNaN(lh) ? lh : height;
  }

  return (
    <div
      className="skeleton-primitive"
      style={blockStyle}
      data-animation={animation}
      aria-hidden="true"
      role="presentation"
    />
  );
};

SkeletonPrimitive.displayName = 'SkeletonPrimitive';
