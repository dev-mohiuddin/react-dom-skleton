/**
 * useDomObserver - React hook for observing DOM changes and dimensions
 * Uses ResizeObserver and MutationObserver to recalculate skeletons
 * when the layout changes (responsive, content updates, etc.)
 */

import React, { useEffect, useRef, useCallback } from 'react';

export interface ObserverConfig {
  onResize?: (entry: ResizeObserverEntry) => void;
  onMutate?: (mutations: MutationRecord[]) => void;
  debounceMs?: number;
  observeResize?: boolean;
  observeMutation?: boolean;
  observeAttributes?: boolean;
}

/**
 * Debounce helper function
 */
function createDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delayMs: number
): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return ((...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
      timeoutId = null;
    }, delayMs);
  }) as T;
}

/**
 * Hook to observe DOM changes with ResizeObserver and MutationObserver
 */
export function useDomObserver(
  targetRef: React.RefObject<HTMLElement>,
  config: ObserverConfig = {}
): void {
  const {
    onResize,
    onMutate,
    debounceMs = 300,
    observeResize = true,
    observeMutation = true,
    observeAttributes = true,
  } = config;

  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  // Create debounced callbacks
  const debouncedResize = useCallback(
    createDebouncedCallback((entry: ResizeObserverEntry) => {
      onResize?.(entry);
    }, debounceMs),
    [onResize, debounceMs]
  );

  const debouncedMutate = useCallback(
    createDebouncedCallback((mutations: MutationRecord[]) => {
      onMutate?.(mutations);
    }, debounceMs),
    [onMutate, debounceMs]
  );

  useEffect(() => {
    const target = targetRef.current;
    if (!target) {
      return;
    }

    // Set up ResizeObserver
    if (observeResize && typeof ResizeObserver !== 'undefined') {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          debouncedResize(entry);
        }
      });
      resizeObserverRef.current.observe(target);
    }

    // Set up MutationObserver
    if (observeMutation && typeof MutationObserver !== 'undefined') {
      mutationObserverRef.current = new MutationObserver((mutations) => {
        debouncedMutate(mutations);
      });

      mutationObserverRef.current.observe(target, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: observeAttributes,
        attributeFilter: [
          'class',
          'style',
          'data-theme',
          'data-loading',
          'data-skeleton-ignore',
          'data-skeleton-content',
          'aria-busy',
          'aria-hidden',
        ],
      });
    }

    // Cleanup
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
        mutationObserverRef.current = null;
      }
    };
  }, [targetRef, observeResize, observeMutation, observeAttributes, debouncedResize, debouncedMutate]);
}

/**
 * Hook to measure element dimensions and position
 */
export function useMeasureElement(
  elementRef: React.RefObject<HTMLElement>
): { width: number; height: number; x: number; y: number } {
  const [measurements, setMeasurements] = React.useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const measure = () => {
      const rect = elementRef.current?.getBoundingClientRect();
      if (rect) {
        setMeasurements({
          width: rect.width,
          height: rect.height,
          x: rect.x,
          y: rect.y,
        });
      }
    };

    measure();

    // Re-measure on resize
    const handleResize = () => measure();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [elementRef]);

  return measurements;
}
