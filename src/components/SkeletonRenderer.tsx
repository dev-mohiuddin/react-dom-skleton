'use client';

/**
 * SkeletonRenderer - Generates the SVG or div-based overlay for skeleton visualization
 * Renders optimized skeleton blocks with animations
 */

import React, { useMemo, CSSProperties } from 'react';
import { SkeletonBlock } from '../core/layout-engine';
import { SkeletonPrimitive } from './SkeletonPrimitive';

export interface SkeletonRendererProps {
  blocks: SkeletonBlock[];
  animation?: 'shimmer' | 'pulse' | 'wave' | 'none';
  speed?: number;
  theme?: 'auto' | 'dark' | 'light';
}

/**
 * SkeletonRenderer Component
 * Renders skeleton blocks as an overlay
 */
export const SkeletonRenderer: React.FC<SkeletonRendererProps> = ({
  blocks,
  animation = 'shimmer',
  speed = 1,
  theme = 'auto',
}) => {
  // Calculate container dimensions based on blocks
  const containerDimensions = useMemo(() => {
    if (blocks.length === 0) {
      return { maxWidth: 0, maxHeight: 0 };
    }

    let maxX = 0;
    let maxY = 0;

    for (const block of blocks) {
      maxX = Math.max(maxX, block.x + block.width);
      maxY = Math.max(maxY, block.y + block.height);
    }

    return {
      maxWidth: maxX,
      maxHeight: maxY,
    };
  }, [blocks]);

  const overlayStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 9999,
    overflow: 'hidden',
  };

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div
      className="skeleton-renderer"
      style={overlayStyle}
      data-animation={animation}
      data-speed={speed}
      data-theme={theme}
    >
      {blocks.map((block) => (
        <SkeletonPrimitive
          key={block.id}
          block={block}
          animation={animation}
          speed={speed}
          theme={theme}
        />
      ))}
    </div>
  );
};

SkeletonRenderer.displayName = 'SkeletonRenderer';
