/**
 * SkeletonPrimitive - Individual animated skeleton block
 * Renders a single skeleton block with the specified animation
 */
import React from 'react';
import { SkeletonBlock } from '../core/layout-engine';
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
export declare const SkeletonPrimitive: React.FC<SkeletonPrimitiveProps>;
//# sourceMappingURL=SkeletonPrimitive.d.ts.map