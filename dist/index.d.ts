import React, { ReactNode } from 'react';

/**
 * DOM Scanner - Recursive utility to extract dimensions, colors, and typography
 * from the DOM tree to generate skeleton overlays.
 */
interface DOMElementInfo {
    tagName: string;
    text: string;
    isTextNode: boolean;
    isDynamic: boolean;
    hasElementChildren: boolean;
    hasVisibleBackground: boolean;
    hasVisibleBorder: boolean;
    isReplacedElement: boolean;
    elementType: 'text' | 'input' | 'button' | 'avatar' | 'block' | 'container';
    isMultiLine: boolean;
    lineCount: number;
    isCircular: boolean;
    parentBackgroundColor: string;
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    style: {
        fontSize: string;
        lineHeight: string;
        fontWeight: string;
        color: string;
        backgroundColor: string;
        borderRadius: string;
    };
    children: DOMElementInfo[];
    skipSkeleton: boolean;
}
interface ScannerOptions {
    parentElement: Element;
    preserveStaticText?: boolean;
    staticTextThreshold?: number;
}
/**
 * Recursively scan DOM tree to extract skeleton information
 */
declare function scanDOMElement(element: Element | Node, parentElement: Element, options?: Omit<ScannerOptions, 'parentElement'>): DOMElementInfo | null;
/**
 * Scan entire component tree and return flattened list of skeleton blocks
 */
declare function scanComponentTree(parentElement: Element, options?: Omit<ScannerOptions, 'parentElement'>): DOMElementInfo[];

/**
 * Layout Engine - Position & Z-index calculations for skeleton blocks
 * Handles nested flexboxes, absolute positioning, and stacking context.
 */

interface SkeletonBlock {
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
declare function mergeOverlappingBlocks(blocks: SkeletonBlock[]): SkeletonBlock[];
/**
 * Remove redundant blocks that are completely contained within others
 */
declare function removeRedundantBlocks(blocks: SkeletonBlock[]): SkeletonBlock[];
/**
 * Convert DOM element info to skeleton blocks
 */
declare function createSkeletonBlocks(domElements: DOMElementInfo[], skeletonColors: Map<string, string>, depth?: number): SkeletonBlock[];
/**
 * Optimize skeleton blocks by merging and removing redundant ones
 */
declare function optimizeSkeletonBlocks(blocks: SkeletonBlock[]): SkeletonBlock[];
/**
 * Calculate total coverage of skeleton blocks (for stats/debugging)
 */
declare function calculateBlocksCoverage(blocks: SkeletonBlock[], parentWidth: number, parentHeight: number): number;

/**
 * SkeletonOverlay - Main entry point component for the skeleton loading system
 * This is a client component that manages the skeleton overlay and communicates
 * with the layout engine to generate pixel-perfect skeletons.
 */

interface SkeletonConfig {
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
declare const SkeletonOverlay: React.ForwardRefExoticComponent<SkeletonConfig & React.RefAttributes<HTMLDivElement>>;
/**
 * HOC for easier integration with class components or custom wrappers
 */
declare function withSkeleton<P extends SkeletonConfig>(Component: React.ComponentType<P>): React.ComponentType<P>;

/**
 * SkeletonRenderer - Generates the SVG or div-based overlay for skeleton visualization
 * Renders optimized skeleton blocks with animations
 */

interface SkeletonRendererProps {
    blocks: SkeletonBlock[];
    animation?: 'shimmer' | 'pulse' | 'wave' | 'none';
    speed?: number;
    theme?: 'auto' | 'dark' | 'light';
}
/**
 * SkeletonRenderer Component
 * Renders skeleton blocks as an overlay
 */
declare const SkeletonRenderer: React.FC<SkeletonRendererProps>;

/**
 * SkeletonPrimitive - Individual animated skeleton block
 * Renders a single skeleton block with the specified animation
 */

interface SkeletonPrimitiveProps {
    block: SkeletonBlock;
    animation?: 'shimmer' | 'pulse' | 'wave' | 'none';
    speed?: number;
    theme?: 'auto' | 'dark' | 'light';
}
/**
 * SkeletonPrimitive Component
 * Renders a single skeleton block with animation
 */
declare const SkeletonPrimitive: React.FC<SkeletonPrimitiveProps>;

/**
 * useDomObserver - React hook for observing DOM changes and dimensions
 * Uses ResizeObserver and MutationObserver to recalculate skeletons
 * when the layout changes (responsive, content updates, etc.)
 */

interface ObserverConfig {
    onResize?: (entry: ResizeObserverEntry) => void;
    onMutate?: (mutations: MutationRecord[]) => void;
    debounceMs?: number;
    observeResize?: boolean;
    observeMutation?: boolean;
    observeAttributes?: boolean;
}
/**
 * Hook to observe DOM changes with ResizeObserver and MutationObserver
 */
declare function useDomObserver(targetRef: React.RefObject<HTMLElement>, config?: ObserverConfig): void;
/**
 * Hook to measure element dimensions and position
 */
declare function useMeasureElement(elementRef: React.RefObject<HTMLElement>): {
    width: number;
    height: number;
    x: number;
    y: number;
};

/**
 * Color Logic - Smart color matching and skeleton color generation
 * Generates skeleton colors based on parent background and implements
 * shimmer animation color stops.
 */
/**
 * Generate skeleton color based on background with enhanced contrast rules
 * Light backgrounds: darken by 6%
 * Dark backgrounds: lighten by 8%
 */
declare function generateSkeletonColor(backgroundColor: string, elementType?: 'text' | 'input' | 'button' | 'avatar' | 'block' | 'container'): string;
/**
 * Generate shimmer gradient stops (left, center, right)
 * Returns array of [position%, color] tuples for CSS linear-gradient
 */
declare function generateShimmerGradient(skeletonColor: string): [number, string][];
/**
 * Extract and validate border-radius value
 */
declare function extractBorderRadius(borderRadiusStr: string): string;
/**
 * Detect if color is light or dark
 */
declare function isLightColor(backgroundColor: string): boolean;
/**
 * Generate wave animation gradient
 * Creates a moving wave effect
 */
declare function generateWaveGradient(skeletonColor: string): string;

/**
 * react-dom-skeleton
 * Enterprise-ready React package for automatic pixel-perfect loading skeletons
 *
 * Main entry point - exports all public APIs
 */

declare const VERSION = "1.0.0";

export { SkeletonOverlay, SkeletonPrimitive, SkeletonRenderer, VERSION, calculateBlocksCoverage, createSkeletonBlocks, extractBorderRadius, generateShimmerGradient, generateSkeletonColor, generateWaveGradient, isLightColor, mergeOverlappingBlocks, optimizeSkeletonBlocks, removeRedundantBlocks, scanComponentTree, scanDOMElement, useDomObserver, useMeasureElement, withSkeleton };
export type { DOMElementInfo, ObserverConfig, ScannerOptions, SkeletonBlock, SkeletonConfig, SkeletonPrimitiveProps, SkeletonRendererProps };
