/**
 * Utility functions for working with the skeleton system
 */
/**
 * Check if running in browser environment (SSR-safe)
 */
export declare function isBrowser(): boolean;
/**
 * Get device pixel ratio (for high-DPI screens)
 */
export declare function getDevicePixelRatio(): number;
/**
 * Throttle function execution
 */
export declare function throttle<T extends (...args: any[]) => any>(fn: T, limit: number): T;
/**
 * Debounce function execution
 */
export declare function debounce<T extends (...args: any[]) => any>(fn: T, limit: number): T;
/**
 * Clamp value between min and max
 */
export declare function clamp(value: number, min: number, max: number): number;
/**
 * Check if element is visible in viewport
 */
export declare function isElementInViewport(element: Element): boolean;
/**
 * Calculate contrast ratio between two colors (for accessibility)
 */
export declare function getContrastRatio(color1: [number, number, number], color2: [number, number, number]): number;
/**
 * Get parent content width (excluding padding and borders)
 */
export declare function getParentContentWidth(element: Element): number;
//# sourceMappingURL=dom-utils.d.ts.map