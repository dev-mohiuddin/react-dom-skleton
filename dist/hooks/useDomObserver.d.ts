/**
 * useDomObserver - React hook for observing DOM changes and dimensions
 * Uses ResizeObserver and MutationObserver to recalculate skeletons
 * when the layout changes (responsive, content updates, etc.)
 */
import React from 'react';
export interface ObserverConfig {
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
export declare function useDomObserver(targetRef: React.RefObject<HTMLElement>, config?: ObserverConfig): void;
/**
 * Hook to measure element dimensions and position
 */
export declare function useMeasureElement(elementRef: React.RefObject<HTMLElement>): {
    width: number;
    height: number;
    x: number;
    y: number;
};
//# sourceMappingURL=useDomObserver.d.ts.map