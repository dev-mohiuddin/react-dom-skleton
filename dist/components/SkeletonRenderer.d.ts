/**
 * SkeletonRenderer - Generates the SVG or div-based overlay for skeleton visualization
 * Renders optimized skeleton blocks with animations
 */
import React from 'react';
import { SkeletonBlock } from '../core/layout-engine';
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
export declare const SkeletonRenderer: React.FC<SkeletonRendererProps>;
//# sourceMappingURL=SkeletonRenderer.d.ts.map