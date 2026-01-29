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
export declare function generateSkeletonColor(backgroundColor: string, elementType?: 'text' | 'input' | 'button' | 'avatar' | 'block' | 'container'): string;
/**
 * Generate high-contrast color for critical elements (buttons, inputs)
 */
export declare function generateHighContrastColor(backgroundColor: string, isDark?: boolean): string;
/**
 * Generate shimmer gradient stops (left, center, right)
 * Returns array of [position%, color] tuples for CSS linear-gradient
 */
export declare function generateShimmerGradient(skeletonColor: string): [number, string][];
/**
 * Extract and validate border-radius value
 */
export declare function extractBorderRadius(borderRadiusStr: string): string;
/**
 * Detect if color is light or dark
 */
export declare function isLightColor(backgroundColor: string): boolean;
/**
 * Generate wave animation gradient
 * Creates a moving wave effect
 */
export declare function generateWaveGradient(skeletonColor: string): string;
/**
 * Generate colors for pulse animation
 * Returns base and highlight colors
 */
export declare function generatePulseColors(backgroundColor: string): {
    base: string;
    highlight: string;
};
//# sourceMappingURL=color-logic.d.ts.map