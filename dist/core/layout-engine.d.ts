/**
 * Layout Engine - Position & Z-index calculations for skeleton blocks
 * Handles nested flexboxes, absolute positioning, and stacking context.
 */
import { DOMElementInfo } from './scanner';
export interface SkeletonBlock {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    borderRadius: string;
    backgroundColor: string;
    zIndex: number;
    opacity: number;
    isText: boolean;
    elementType: 'text' | 'input' | 'button' | 'avatar' | 'block' | 'container';
    isCircular: boolean;
    isLastLine: boolean;
    lineHeight: string;
    fontSize: string;
}
/**
 * Merge overlapping blocks to reduce DOM nodes and improve performance
 * Returns a new array of non-overlapping blocks
 */
export declare function mergeOverlappingBlocks(blocks: SkeletonBlock[]): SkeletonBlock[];
/**
 * Remove redundant blocks that are completely contained within others
 */
export declare function removeRedundantBlocks(blocks: SkeletonBlock[]): SkeletonBlock[];
/**
 * Convert DOM element info to skeleton blocks
 */
export declare function createSkeletonBlocks(domElements: DOMElementInfo[], skeletonColors: Map<string, string>, depth?: number): SkeletonBlock[];
/**
 * Optimize skeleton blocks by merging and removing redundant ones
 */
export declare function optimizeSkeletonBlocks(blocks: SkeletonBlock[]): SkeletonBlock[];
/**
 * Calculate total coverage of skeleton blocks (for stats/debugging)
 */
export declare function calculateBlocksCoverage(blocks: SkeletonBlock[], parentWidth: number, parentHeight: number): number;
//# sourceMappingURL=layout-engine.d.ts.map