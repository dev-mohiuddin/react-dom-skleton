/**
 * SkeletonOverlay - Main entry point component for the skeleton loading system
 * This is a client component that manages the skeleton overlay and communicates
 * with the layout engine to generate pixel-perfect skeletons.
 */
import React, { ReactNode } from 'react';
import { SkeletonBlock } from '../core/layout-engine';
export interface SkeletonConfig {
    loading: boolean;
    children: ReactNode;
    animation?: 'shimmer' | 'pulse' | 'wave' | 'none';
    speed?: number;
    preserveStaticText?: boolean;
    hideTextDuringLoading?: boolean;
    theme?: 'auto' | 'dark' | 'light';
    enabled?: boolean;
    className?: string;
    onScanComplete?: (blocks: SkeletonBlock[]) => void;
}
/**
 * SkeletonOverlay Component
 * Wraps children and displays an animated skeleton overlay while loading
 */
export declare const SkeletonOverlay: React.ForwardRefExoticComponent<SkeletonConfig & React.RefAttributes<HTMLDivElement>>;
/**
 * HOC for easier integration with class components or custom wrappers
 */
export declare function withSkeleton<P extends SkeletonConfig>(Component: React.ComponentType<P>): React.ComponentType<P>;
//# sourceMappingURL=SkeletonOverlay.d.ts.map