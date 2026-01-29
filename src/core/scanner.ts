import { getParentContentWidth } from '../utils/dom-utils';

/**
 * DOM Scanner - Recursive utility to extract dimensions, colors, and typography
 * from the DOM tree to generate skeleton overlays.
 */

export interface DOMElementInfo {
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

export interface ScannerOptions {
  parentElement: Element;
  preserveStaticText?: boolean;
  staticTextThreshold?: number; // Character count threshold to consider text "static"
}

/**
 * Helper function to get computed style safely (SSR-safe)
 */
function getComputedStyleSafe(
  element: Element
): Partial<CSSStyleDeclaration> {
  if (typeof window === 'undefined') {
    return {};
  }
  return window.getComputedStyle(element);
}

/**
 * Check if element is manually marked as dynamic via data-dynamic attribute
 */
function isManuallyMarkedDynamic(element: Element): boolean {
  return element.getAttribute('data-dynamic') === 'true';
}

/**
 * Determine element type based on tag and styles
 */
function determineElementType(
  element: Element,
  style: CSSStyleDeclaration,
  hasText: boolean
): 'text' | 'input' | 'button' | 'avatar' | 'block' | 'container' {
  const tagName = element.tagName.toLowerCase();
  
  // Form elements
  if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
    return 'input';
  }
  
  if (tagName === 'button') {
    return 'button';
  }
  
  // Circular elements (avatars)
  const borderRadius = style.borderRadius;
  if (borderRadius === '50%' || borderRadius === '9999px' || (tagName === 'img' && borderRadius.includes('50'))) {
    return 'avatar';
  }
  
  // Text elements
  if (hasText && !element.children.length) {
    return 'text';
  }
  
  // Container vs block
  const display = style.display;
  if (display === 'flex' || display === 'grid' || display === 'inline-flex') {
    return 'container';
  }
  
  return 'block';
}

/**
 * Determine if text is likely static (hardcoded label) vs dynamic (data)
 * Heuristic: Static text is typically short, consistent, and doesn't change
 */
function isLikelyStaticText(
  text: string,
  threshold: number = 3
): boolean {
  if (!text || text.trim().length === 0) return false;
  
  // Short text with punctuation or known labels are usually static
  const trimmed = text.trim();
  // Numeric content is usually dynamic
  if (/\d/.test(trimmed)) return false;
  if (trimmed.length <= threshold) return true;
  
  // Single words are usually static
  if (trimmed.split(/\s+/).length === 1) return true;
  
  // Text with special punctuation patterns (like "USD", "100%") is usually static
  if (/^[A-Z\s\$%()]+$/.test(trimmed)) return true;
  
  return false;
}

/**
 * Get bounding box relative to parent container
 */
function getBoundsRelativeToParent(
  element: Element,
  parentElement: Element
): DOMElementInfo['bounds'] {
  const elementRect = element.getBoundingClientRect();
  const parentRect = parentElement.getBoundingClientRect();

  return {
    x: elementRect.left - parentRect.left + parentElement.scrollLeft,
    y: elementRect.top - parentRect.top + parentElement.scrollTop,
    width: elementRect.width,
    height: elementRect.height,
  };
}

/**
 * Check if element should be skipped (hidden, display:none, data-skeleton-ignore)
 */
function shouldSkipElement(element: Element): boolean {
  // Check data attribute
  if (element.hasAttribute('data-skeleton-ignore')) {
    return true;
  }

  if (typeof window === 'undefined') {
    return false;
  }

  const style = window.getComputedStyle(element);

  // Skip hidden elements
  if (
    style.display === 'none' ||
    style.visibility === 'hidden' ||
    style.opacity === '0'
  ) {
    return true;
  }

  return false;
}

/**
 * Recursively scan DOM tree to extract skeleton information
 */
export function scanDOMElement(
  element: Element | Node,
  parentElement: Element,
  options: Omit<ScannerOptions, 'parentElement'> = {}
): DOMElementInfo | null {
  const { preserveStaticText = false, staticTextThreshold = 3 } = options;

  // Handle text nodes
  if (element.nodeType === Node.TEXT_NODE) {
    const text = element.textContent || '';
    const trimmedText = text.trim();

    if (!trimmedText) {
      return null;
    }

    const parentElement_ = (element.parentElement as Element) || parentElement;
    const isManualDynamic = isManuallyMarkedDynamic(parentElement_);
    const isStatic = !isManualDynamic && isLikelyStaticText(trimmedText, staticTextThreshold);
    const isDynamic = isManualDynamic || !isStatic;

    // If we're preserving static text and this is static, skip it
    if (preserveStaticText && isStatic) {
      return null;
    }

    // Return text node info with improved bounds
    const bounds = getBoundsRelativeToParent(parentElement_, parentElement);
    
    // Apply 80-90% width rule for dynamic text
    if (isDynamic) {
        const parentWidth = getParentContentWidth(parentElement_);
        if (parentWidth > 0) {
            // We set it to full content width here. The layout engine will typically
            // scale it down to ~90% for visual breathing room.
            bounds.width = parentWidth;
        }
    }

    const style = getComputedStyleSafe(parentElement_) as CSSStyleDeclaration;
    const parentStyle = getComputedStyleSafe(parentElement_.parentElement || parentElement_) as CSSStyleDeclaration;

    // Calculate actual text height (not full line-height)
    const fontSize = parseFloat(style.fontSize || '16');
    const lineHeightValue = style.lineHeight === 'normal' ? fontSize * 1.2 : parseFloat(style.lineHeight || String(fontSize * 1.2));
    const actualTextHeight = Math.min(bounds.height, fontSize * 1.1);
    
    // Detect multi-line text
    const lineCount = Math.max(1, Math.floor(bounds.height / lineHeightValue));
    const isMultiLine = lineCount > 1;

    return {
      tagName: '#text',
      text: trimmedText,
      isTextNode: true,
      isDynamic,
      hasElementChildren: false,
      hasVisibleBackground: false,
      hasVisibleBorder: false,
      isReplacedElement: false,
      elementType: 'text',
      isMultiLine,
      lineCount,
      isCircular: false,
      parentBackgroundColor: parentStyle.backgroundColor || 'transparent',
      bounds: {
        ...bounds,
        height: actualTextHeight,
        y: bounds.y + (bounds.height - actualTextHeight) / 2,
      },
      style: {
        fontSize: style.fontSize || '16px',
        lineHeight: style.lineHeight || '1.5',
        fontWeight: style.fontWeight || '400',
        color: style.color || '#000000',
        backgroundColor: style.backgroundColor || 'transparent',
        borderRadius: '4px',
      },
      children: [],
      skipSkeleton: false,
    };
  }

  // Handle element nodes
  if (element.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const elem = element as Element;

  // Skip elements that should be ignored
  if (shouldSkipElement(elem)) {
    return null;
  }

  const style = getComputedStyleSafe(elem) as CSSStyleDeclaration;
  const bounds = getBoundsRelativeToParent(elem, parentElement);
  const hasElementChildren = elem.children.length > 0;
  const hasVisibleBackground =
    !!style.backgroundColor &&
    style.backgroundColor !== 'transparent' &&
    style.backgroundColor !== 'rgba(0, 0, 0, 0)';
  const hasVisibleBorder =
    style.borderStyle !== 'none' &&
    style.borderWidth !== '0px' &&
    style.borderColor !== 'transparent';
  const tagName = elem.tagName.toLowerCase();
  const isReplacedElement =
    tagName === 'img' ||
    tagName === 'svg' ||
    tagName === 'canvas' ||
    tagName === 'video' ||
    tagName === 'input' ||
    tagName === 'textarea' ||
    tagName === 'select' ||
    tagName === 'button';

  // Skip elements with zero dimensions
  if (bounds.width === 0 || bounds.height === 0) {
    return null;
  }

  // Extract text content
  const text = elem.textContent?.trim() || '';
  const hasText = text.length > 0 && elem.children.length === 0;
  const isManualDynamic = isManuallyMarkedDynamic(elem);
  const isStatic = !isManualDynamic && text.length > 0 && isLikelyStaticText(text, staticTextThreshold);
  
  // Determine element type
  const elementType = determineElementType(elem, style, hasText);
  const isCircular = elementType === 'avatar';
  
  // Get parent background for contrast
  const parentStyle = getComputedStyleSafe(elem.parentElement || parentElement) as CSSStyleDeclaration;
  const parentBackgroundColor = parentStyle.backgroundColor || 'transparent';

  // Recursively scan children
  const children: DOMElementInfo[] = [];
  for (let i = 0; i < elem.childNodes.length; i++) {
    const child = scanDOMElement(elem.childNodes[i], parentElement, options);
    if (child) {
      children.push(child);
    }
  }

  return {
    tagName: elem.tagName.toLowerCase(),
    text,
    isTextNode: false,
    isDynamic: isManualDynamic || !isStatic,
    hasElementChildren,
    hasVisibleBackground,
    hasVisibleBorder,
    isReplacedElement,
    elementType,
    isMultiLine: false,
    lineCount: 1,
    isCircular,
    parentBackgroundColor,
    bounds,
    style: {
      fontSize: style.fontSize || '16px',
      lineHeight: style.lineHeight || '1.5',
      fontWeight: style.fontWeight || '400',
      color: style.color || '#000000',
      backgroundColor: style.backgroundColor || 'transparent',
      borderRadius: style.borderRadius || '0px',
    },
    children,
    skipSkeleton: preserveStaticText && isStatic,
  };
}

/**
 * Scan entire component tree and return flattened list of skeleton blocks
 */
export function scanComponentTree(
  parentElement: Element,
  options: Omit<ScannerOptions, 'parentElement'> = {}
): DOMElementInfo[] {
  const result: DOMElementInfo[] = [];

  const rootInfo = scanDOMElement(parentElement, parentElement, options);

  function flatten(info: DOMElementInfo) {
    if (
      !info.skipSkeleton &&
      (
        info.isTextNode ||
        info.isReplacedElement ||
        info.hasVisibleBackground ||
        info.hasVisibleBorder ||
        (!info.hasElementChildren && info.isDynamic)
      )
    ) {
      result.push(info);
    }
    for (const child of info.children) {
      flatten(child);
    }
  }

  if (rootInfo) {
    flatten(rootInfo);
  }

  return result;
}
