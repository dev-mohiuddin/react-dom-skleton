'use client';

/**
 * SkeletonOverlay - Main entry point component for the skeleton loading system
 * This is a client component that manages the skeleton overlay and communicates
 * with the layout engine to generate pixel-perfect skeletons.
 */

import React, {
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  ReactNode,
  CSSProperties,
} from 'react';
import { scanComponentTree, DOMElementInfo } from '../core/scanner';
import { generateSkeletonColor } from '../core/color-logic';
import { createSkeletonBlocks, optimizeSkeletonBlocks, SkeletonBlock } from '../core/layout-engine';
import { useDomObserver } from '../hooks/useDomObserver';
import { SkeletonRenderer } from './SkeletonRenderer';

const SKELETON_STYLE_ID = 'react-dom-skeleton-styles';
const SKELETON_CSS = `
.skeleton-container{position:relative;display:inline-block;width:100%}
.skeleton-renderer{position:absolute;inset:0;pointer-events:none;z-index:9999;overflow:hidden}
.skeleton-primitive{position:absolute;will-change:transform,opacity;backface-visibility:hidden;border-radius:4px}
@keyframes skeleton-shimmer{0%{background-position:-1000px 0}100%{background-position:1000px 0}}
@keyframes skeleton-pulse{0%{opacity:1}50%{opacity:.5}100%{opacity:1}}
@keyframes skeleton-wave{0%{background-position:-1000px 0}100%{background-position:1000px 0}}
.skeleton-primitive[data-animation='shimmer']{animation:skeleton-shimmer 1.8s linear infinite;background-size:200% 100%;transform:translate3d(0,0,0)}
.skeleton-primitive[data-animation='pulse']{animation:skeleton-pulse 1.5s ease-in-out infinite;transform:translate3d(0,0,0)}
.skeleton-primitive[data-animation='wave']{animation:skeleton-wave 1.8s ease-in-out infinite;background-size:200% 100%;transform:translate3d(0,0,0)}
@media (prefers-reduced-motion: reduce){.skeleton-primitive{animation:none;opacity:.6}}
`;

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
export const SkeletonOverlay = React.forwardRef<HTMLDivElement, SkeletonConfig>(
  (
    {
      loading,
      children,
      animation = 'pulse',
      speed = 1,
      preserveStaticText = false,
      hideTextDuringLoading = true,
      theme = 'auto',
      enabled = true,
      className = '',
      onScanComplete,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [skeletonBlocks, setSkeletonBlocks] = useState<SkeletonBlock[]>([]);
    const [isSSRHydrated, setIsSSRHydrated] = useState(false);

    // Ensure this only runs on the client (SSR safety)
    useLayoutEffect(() => {
      setIsSSRHydrated(true);
    }, []);

    // Inject skeleton CSS once (avoid build-time CSS issues)
    useLayoutEffect(() => {
      if (typeof window === 'undefined') {
        return;
      }
      if (!document.getElementById(SKELETON_STYLE_ID)) {
        const style = document.createElement('style');
        style.id = SKELETON_STYLE_ID;
        style.textContent = SKELETON_CSS;
        document.head.appendChild(style);
      }
    }, []);

    /**
     * Scan the DOM and generate skeleton blocks
     */
    const scanAndGenerateSkeletons = useCallback(() => {
      if (!isSSRHydrated || !containerRef.current || !loading || !enabled) {
        return;
      }

      // Get all children content
      const childrenContainer = containerRef.current.querySelector('[data-skeleton-content]');
      if (!childrenContainer) {
        return;
      }

      try {
        // Scan DOM for elements that need skeletons
        const domElements = scanComponentTree(childrenContainer as Element, {
          preserveStaticText,
        });

        // Create a map of background colors to skeleton colors with element type context
        const colorMap = new Map<string, string>();
        for (const elem of domElements) {
          const key = `${elem.style.backgroundColor}-${elem.elementType}`;
          if (!colorMap.has(key)) {
            colorMap.set(
              key,
              generateSkeletonColor(elem.style.backgroundColor, elem.elementType)
            );
          }
        }
        
        // Remap to use in createSkeletonBlocks (backwards compatible)
        const simpleColorMap = new Map<string, string>();
        for (const elem of domElements) {
          const key = `${elem.style.backgroundColor}-${elem.elementType}`;
          simpleColorMap.set(elem.style.backgroundColor, colorMap.get(key) || '#E5E7EB');
        }

        // Create and optimize skeleton blocks
        let blocks = createSkeletonBlocks(domElements, simpleColorMap);
        blocks = optimizeSkeletonBlocks(blocks);

        setSkeletonBlocks(blocks);
        onScanComplete?.(blocks);
      } catch (error) {
        console.error('[SkeletonOverlay] Error scanning DOM:', error);
      }
    }, [isSSRHydrated, loading, enabled, preserveStaticText, onScanComplete]);

    /**
     * Rescan when DOM changes
     */
    useDomObserver(containerRef, {
      onResize: scanAndGenerateSkeletons,
      onMutate: scanAndGenerateSkeletons,
      debounceMs: 300,
      observeResize: true,
      observeMutation: loading && enabled,
    });

    /**
     * Initial scan after SSR hydration
     */
    useLayoutEffect(() => {
      if (isSSRHydrated && loading && enabled) {
        // Use requestAnimationFrame to ensure DOM is painted
        const frameId = requestAnimationFrame(() => {
          scanAndGenerateSkeletons();
        });

        return () => cancelAnimationFrame(frameId);
      }
    }, [isSSRHydrated, loading, enabled, scanAndGenerateSkeletons]);

    if (!enabled) {
      return <>{children}</>;
    }

    const containerStyle: CSSProperties = {
      position: 'relative',
      display: 'inline-block',
      width: '100%',
    };

    return (
      <div
        ref={ref || containerRef}
        className={`skeleton-container ${className}`}
        style={containerStyle}
        data-skeleton-enabled={loading && isSSRHydrated}
      >
        {/* Content wrapper */}
        <div
          data-skeleton-content
          style={{
            position: 'relative',
            pointerEvents: loading ? 'none' : 'auto',
            transition: 'opacity 0.2s ease-in-out',
            ...(loading && hideTextDuringLoading
              ? {
                  color: 'transparent',
                  textShadow: 'none',
                  WebkitTextFillColor: 'transparent',
                  caretColor: 'transparent',
                }
              : null),
          }}
        >
          {children}
        </div>

        {/* Skeleton overlay */}
        {loading && isSSRHydrated && (
          <SkeletonRenderer
            blocks={skeletonBlocks}
            animation={animation}
            speed={speed}
            theme={theme}
          />
        )}
      </div>
    );
  }
);

SkeletonOverlay.displayName = 'SkeletonOverlay';

/**
 * HOC for easier integration with class components or custom wrappers
 */
export function withSkeleton<P extends SkeletonConfig>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return (props: P) => (
    <SkeletonOverlay {...props} />
  );
}
