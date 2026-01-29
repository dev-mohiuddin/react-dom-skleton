/**
 * Color Logic - Smart color matching and skeleton color generation
 * Generates skeleton colors based on parent background and implements
 * shimmer animation color stops.
 */

/**
 * Parse RGB color string to components
 * Handles rgb(), rgba(), hex, and named colors
 */
function parseRGBColor(colorString: string): [number, number, number, number] | null {
  if (!colorString || colorString === 'transparent') {
    return [255, 255, 255, 0]; // White transparent
  }

  // Handle rgba/rgb format
  const rgbMatch = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbMatch) {
    return [
      parseInt(rgbMatch[1], 10),
      parseInt(rgbMatch[2], 10),
      parseInt(rgbMatch[3], 10),
      rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1,
    ];
  }

  // Handle hex format (#RRGGBB or #RGB)
  const hexMatch = colorString.match(/#([0-9a-f]{3}){1,2}/i);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
      1,
    ];
  }

  // Handle named colors (basic set)
  const namedColors: Record<string, [number, number, number]> = {
    white: [255, 255, 255],
    black: [0, 0, 0],
    red: [255, 0, 0],
    green: [0, 128, 0],
    blue: [0, 0, 255],
    gray: [128, 128, 128],
    grey: [128, 128, 128],
  };

  const lower = colorString.toLowerCase();
  if (lower in namedColors) {
    const [r, g, b] = namedColors[lower];
    return [r, g, b, 1];
  }

  return null;
}

/**
 * Convert RGB to hex string
 */
function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }).join('')}`.toUpperCase();
}

/**
 * Calculate perceived brightness (luminance) of a color
 * Uses relative luminance formula from WCAG
 */
function getColorBrightness(r: number, g: number, b: number): number {
  // Convert to sRGB
  const [rs, gs, bs] = [r, g, b].map(c => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  // Calculate relative luminance
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Lighten a color by a percentage
 */
function lightenColor(
  r: number,
  g: number,
  b: number,
  percent: number
): [number, number, number] {
  const factor = 1 + percent / 100;
  return [
    Math.min(255, Math.round(r * factor)),
    Math.min(255, Math.round(g * factor)),
    Math.min(255, Math.round(b * factor)),
  ];
}

/**
 * Darken a color by a percentage
 */
function darkenColor(
  r: number,
  g: number,
  b: number,
  percent: number
): [number, number, number] {
  const factor = 1 - percent / 100;
  return [
    Math.max(0, Math.round(r * factor)),
    Math.max(0, Math.round(g * factor)),
    Math.max(0, Math.round(b * factor)),
  ];
}

/**
 * Generate skeleton color based on background with enhanced contrast rules
 * Light backgrounds: darken by 6%
 * Dark backgrounds: lighten by 8%
 */
export function generateSkeletonColor(
  backgroundColor: string,
  elementType: 'text' | 'input' | 'button' | 'avatar' | 'block' | 'container' = 'text'
): string {
  if (!backgroundColor || backgroundColor === 'transparent') {
    // Default: light gray
    return '#E5E7EB';
  }

  const rgba = parseRGBColor(backgroundColor);
  if (!rgba) {
    return '#E5E7EB'; // Fallback
  }

  const [r, g, b] = rgba;
  const brightness = getColorBrightness(r, g, b);

  let newColor: [number, number, number];
  
  // High-contrast for buttons
  if (elementType === 'button') {
    if (brightness > 0.5) {
      newColor = darkenColor(r, g, b, 12); // More contrast for buttons
    } else {
      newColor = lightenColor(r, g, b, 15);
    }
  } else if (brightness > 0.5) {
    // Light background: darken
    newColor = darkenColor(r, g, b, 6);
  } else {
    // Dark background: lighten
    newColor = lightenColor(r, g, b, 8);
  }

  return rgbToHex(...newColor);
}

/**
 * Generate high-contrast color for critical elements (buttons, inputs)
 */
export function generateHighContrastColor(backgroundColor: string, isDark: boolean = false): string {
  if (isDark) {
    // Dark mode: lighter gray
    return '#374151'; // Gray 700
  }
  // Light mode: visible but not too dark
  return '#D1D5DB'; // Gray 300
}

/**
 * Generate shimmer gradient stops (left, center, right)
 * Returns array of [position%, color] tuples for CSS linear-gradient
 */
export function generateShimmerGradient(skeletonColor: string): [number, string][] {
  const rgba = parseRGBColor(skeletonColor);
  if (!rgba) {
    return [
      [0, '#E8E8E8'],
      [50, '#F5F5F5'],
      [100, '#E8E8E8'],
    ];
  }

  const [r, g, b] = rgba;
  
  // Calculate highlight (20% lighter version)
  const [hr, hg, hb] = lightenColor(r, g, b, 20);
  const highlightColor = rgbToHex(hr, hg, hb);
  const baseColor = rgbToHex(r, g, b);

  return [
    [0, baseColor],
    [50, highlightColor],
    [100, baseColor],
  ];
}

/**
 * Extract and validate border-radius value
 */
export function extractBorderRadius(borderRadiusStr: string): string {
  if (!borderRadiusStr || borderRadiusStr === '0px' || borderRadiusStr === '0') {
    return '0px';
  }
  return borderRadiusStr;
}

/**
 * Detect if color is light or dark
 */
export function isLightColor(backgroundColor: string): boolean {
  if (!backgroundColor || backgroundColor === 'transparent') {
    return true; // Assume light by default
  }

  const rgba = parseRGBColor(backgroundColor);
  if (!rgba) {
    return true;
  }

  const [r, g, b] = rgba;
  const brightness = getColorBrightness(r, g, b);
  return brightness > 0.5;
}

/**
 * Generate wave animation gradient
 * Creates a moving wave effect
 */
export function generateWaveGradient(skeletonColor: string): string {
  const rgba = parseRGBColor(skeletonColor);
  if (!rgba) {
    return '#E8E8E8';
  }

  const [r, g, b] = rgba;
  const [lr, lg, lb] = lightenColor(r, g, b, 15);
  const lightColor = rgbToHex(lr, lg, lb);
  const baseColor = rgbToHex(r, g, b);

  return `linear-gradient(90deg, ${baseColor} 0%, ${lightColor} 50%, ${baseColor} 100%)`;
}

/**
 * Generate colors for pulse animation
 * Returns base and highlight colors
 */
export function generatePulseColors(backgroundColor: string): { base: string, highlight: string } {
  const rgba = parseRGBColor(backgroundColor);
  if (!rgba) {
    return { base: '#E5E7EB', highlight: '#F3F4F6' };
  }

  const [r, g, b] = rgba;
  const brightness = getColorBrightness(r, g, b);
  const baseColor = rgbToHex(r, g, b);
  
  let highlight: [number, number, number];
  
  if (brightness > 0.5) {
    // Light background: pulse to slightly darker
    highlight = darkenColor(r, g, b, 10);
  } else {
    // Dark background: pulse to slightly lighter
    highlight = lightenColor(r, g, b, 15);
  }
  
  return {
    base: baseColor,
    highlight: rgbToHex(...highlight)
  };
}
