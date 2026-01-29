/**
 * Type definitions for react-dom-skeleton
 */

import { ReactNode, CSSProperties } from 'react';

/**
 * Animation types supported by the skeleton system
 */
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'wave' | 'none';

/**
 * Theme options for skeleton colors
 */
export type SkeletonTheme = 'auto' | 'dark' | 'light';

/**
 * Skeleton block configuration
 */
export interface SkeletonBlockConfig {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius?: string;
  backgroundColor?: string;
  zIndex?: number;
  opacity?: number;
}

/**
 * Observer callback types
 */
export type ResizeCallback = (entry: ResizeObserverEntry) => void;
export type MutationCallback = (mutations: MutationRecord[]) => void;

/**
 * Extended CSS properties with custom animation vars
 */
export interface SkeletonStyle extends CSSProperties {
  '--animation-duration'?: string;
  '--animation-delay'?: string;
  '--skeleton-color'?: string;
}
