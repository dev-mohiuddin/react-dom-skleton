/**
 * react-dom-skeleton
 * Enterprise-ready React package for automatic pixel-perfect loading skeletons
 * 
 * Main entry point - exports all public APIs
 */

// Components
export { SkeletonOverlay, withSkeleton } from './components/SkeletonOverlay';
export type { SkeletonConfig } from './components/SkeletonOverlay';

export { SkeletonRenderer } from './components/SkeletonRenderer';
export type { SkeletonRendererProps } from './components/SkeletonRenderer';

export { SkeletonPrimitive } from './components/SkeletonPrimitive';
export type { SkeletonPrimitiveProps } from './components/SkeletonPrimitive';

// Hooks
export { useDomObserver, useMeasureElement } from './hooks/useDomObserver';
export type { ObserverConfig } from './hooks/useDomObserver';

// Core utilities (for advanced use cases)
export { scanComponentTree, scanDOMElement } from './core/scanner';
export type { DOMElementInfo, ScannerOptions } from './core/scanner';

export {
  generateSkeletonColor,
  generateShimmerGradient,
  generateWaveGradient,
  extractBorderRadius,
  isLightColor,
} from './core/color-logic';

export {
  mergeOverlappingBlocks,
  removeRedundantBlocks,
  createSkeletonBlocks,
  optimizeSkeletonBlocks,
  calculateBlocksCoverage,
} from './core/layout-engine';
export type { SkeletonBlock } from './core/layout-engine';

// Package version (can be updated via build process)
export const VERSION = '1.0.0';
