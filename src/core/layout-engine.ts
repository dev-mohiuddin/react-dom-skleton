/**
 * Layout Engine - Position & Z-index calculations for skeleton blocks
 * Handles nested flexboxes, absolute positioning, and stacking context.
 */

import { DOMElementInfo } from './scanner';

export interface SkeletonBlock {
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
 * Calculate z-index for skeleton block based on DOM hierarchy
 * Higher nesting = higher z-index to prevent overlap issues
 */
function calculateZIndex(depth: number): number {
  return Math.min(1000, 10 + depth * 10);
}

/**
 * Filter out blocks that are too small to be meaningful
 */
function isValidBlock(block: DOMElementInfo): boolean {
  const MIN_WIDTH = 4;
  const MIN_HEIGHT = 4;

  return block.bounds.width >= MIN_WIDTH && block.bounds.height >= MIN_HEIGHT;
}

/**
 * Merge overlapping blocks to reduce DOM nodes and improve performance
 * Returns a new array of non-overlapping blocks
 */
export function mergeOverlappingBlocks(blocks: SkeletonBlock[]): SkeletonBlock[] {
  if (blocks.length <= 1) {
    return blocks;
  }

  const sorted = [...blocks].sort((a, b) => {
    if (a.y !== b.y) return a.y - b.y;
    return a.x - b.x;
  });

  const merged: SkeletonBlock[] = [];

  for (const block of sorted) {
    // Try to merge with an existing block
    let merged_ = false;

    for (let i = 0; i < merged.length; i++) {
      const existing = merged[i];

      // Check if blocks are adjacent horizontally (same y, consecutive x)
      if (
        existing.y === block.y &&
        existing.height === block.height &&
        Math.abs(existing.x + existing.width - block.x) < 2 &&
        existing.backgroundColor === block.backgroundColor &&
        existing.borderRadius === '0px' &&
        block.borderRadius === '0px'
      ) {
        // Merge horizontally
        existing.width += block.width;
        merged_ = true;
        break;
      }

      // Check if blocks are adjacent vertically (same x, consecutive y)
      if (
        existing.x === block.x &&
        existing.width === block.width &&
        Math.abs(existing.y + existing.height - block.y) < 2 &&
        existing.backgroundColor === block.backgroundColor &&
        existing.borderRadius === '0px' &&
        block.borderRadius === '0px'
      ) {
        // Merge vertically
        existing.height += block.height;
        merged_ = true;
        break;
      }
    }

    if (!merged_) {
      merged.push(block);
    }
  }

  return merged;
}

/**
 * Check if a block is completely contained within another
 */
function isBlockContainedInAnother(
  block: SkeletonBlock,
  other: SkeletonBlock
): boolean {
  return (
    block.x >= other.x &&
    block.y >= other.y &&
    block.x + block.width <= other.x + other.width &&
    block.y + block.height <= other.y + other.height &&
    !(block.x === other.x && block.y === other.y && block.width === other.width && block.height === other.height)
  );
}

/**
 * Remove redundant blocks that are completely contained within others
 */
export function removeRedundantBlocks(blocks: SkeletonBlock[]): SkeletonBlock[] {
  return blocks.filter((block, index) => {
    for (let i = 0; i < blocks.length; i++) {
      if (i !== index && isBlockContainedInAnother(block, blocks[i])) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Convert DOM element info to skeleton blocks
 */
export function createSkeletonBlocks(
  domElements: DOMElementInfo[],
  skeletonColors: Map<string, string>,
  depth: number = 0
): SkeletonBlock[] {
  const blocks: SkeletonBlock[] = [];
  let blockId = 0;

  for (const elem of domElements) {
    if (!isValidBlock(elem)) {
      continue;
    }

    const bgColor = skeletonColors.get(elem.style.backgroundColor) || '#E5E7EB';
    const zIndex = calculateZIndex(depth);

    const baseWidth = Math.round(elem.bounds.width);
    const baseHeight = Math.round(elem.bounds.height);
    
    // Handle multi-line text elements
    if (elem.isMultiLine && elem.lineCount > 1) {
      const fontSize = parseFloat(elem.style.fontSize || '16');
      const lineHeight = parseFloat(elem.style.lineHeight || '1.5') * fontSize;
      const lineGap = 8; // Gap between lines
      
      for (let i = 0; i < elem.lineCount; i++) {
        const isLastLine = i === elem.lineCount - 1;
        const lineY = elem.bounds.y + (i * (lineHeight + lineGap));
        
        // Last line is random 40-60% width for realistic look
        let lineWidth = baseWidth * 0.9; // 90% for full lines
        if (isLastLine) {
          const randomFactor = 0.4 + Math.random() * 0.2; // 40-60%
          lineWidth = baseWidth * randomFactor;
        }
        
        blocks.push({
          id: `skeleton-${blockId++}`,
          x: Math.round(elem.bounds.x),
          y: Math.round(lineY),
          width: Math.round(lineWidth),
          height: Math.round(fontSize * 1.1),
          borderRadius: '4px',
          backgroundColor: bgColor,
          zIndex,
          opacity: 1,
          isText: true,
          elementType: 'text',
          isCircular: false,
          isLastLine,
          lineHeight: elem.style.lineHeight,
          fontSize: elem.style.fontSize,
        });
      }
      continue;
    }
    
    // Apply width rules based on element type
    let finalWidth = baseWidth;
    if (elem.elementType === 'text' && elem.isDynamic) {
      // Text elements at 90% if full width, 75% if not
      const parentWidth = elem.bounds.width;
      const isFullWidth = baseWidth >= parentWidth * 0.95;
      finalWidth = Math.max(12, Math.round(baseWidth * (isFullWidth ? 0.9 : 0.75)));
    }
    
    // Determine border radius based on element type
    let borderRadius = elem.style.borderRadius;
    if (elem.isCircular || elem.elementType === 'avatar') {
      borderRadius = '50%';
    } else if (elem.elementType === 'text') {
      borderRadius = '4px';
    } else if (elem.elementType === 'button') {
      // Keep original button border radius
      borderRadius = elem.style.borderRadius || '8px';
    }

    const block: SkeletonBlock = {
      id: `skeleton-${blockId++}`,
      x: Math.round(elem.bounds.x),
      y: Math.round(elem.bounds.y),
      width: Math.round(finalWidth),
      height: baseHeight,
      borderRadius,
      backgroundColor: bgColor,
      zIndex,
      opacity: 1,
      isText: elem.isTextNode,
      elementType: elem.elementType,
      isCircular: elem.isCircular,
      isLastLine: false,
      lineHeight: elem.style.lineHeight,
      fontSize: elem.style.fontSize,
    };

    blocks.push(block);
  }

  return blocks;
}

/**
 * Optimize skeleton blocks by merging and removing redundant ones
 */
export function optimizeSkeletonBlocks(blocks: SkeletonBlock[]): SkeletonBlock[] {
  let optimized = removeRedundantBlocks(blocks);
  optimized = mergeOverlappingBlocks(optimized);
  return optimized;
}

/**
 * Calculate total coverage of skeleton blocks (for stats/debugging)
 */
export function calculateBlocksCoverage(
  blocks: SkeletonBlock[],
  parentWidth: number,
  parentHeight: number
): number {
  if (parentWidth === 0 || parentHeight === 0) {
    return 0;
  }

  const totalArea = parentWidth * parentHeight;
  const coveredArea = blocks.reduce((sum, block) => sum + block.width * block.height, 0);

  return (coveredArea / totalArea) * 100;
}
