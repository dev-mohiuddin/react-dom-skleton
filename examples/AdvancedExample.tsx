/**
 * Example: Advanced Features
 * Demonstrates advanced features like custom colors, callbacks, and observers
 */

import React, { useState, useRef, useCallback } from 'react';
import { SkeletonOverlay, SkeletonBlock } from 'react-dom-skeleton';

export function AdvancedExample() {
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState<'shimmer' | 'pulse' | 'wave' | 'none'>('shimmer');
  const [speed, setSpeed] = useState(1);
  const [blocks, setBlocks] = useState<SkeletonBlock[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScanComplete = useCallback((skeletonBlocks: SkeletonBlock[]) => {
    console.log(`Scanned ${skeletonBlocks.length} skeleton blocks`);
    setBlocks(skeletonBlocks);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {/* Controls */}
      <div style={{ marginBottom: 20, padding: 15, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
        <h3>Controls</h3>
        
        <div style={{ marginBottom: 10 }}>
          <label>
            Animation:
            <select value={animation} onChange={(e) => setAnimation(e.target.value as any)}>
              <option value="shimmer">Shimmer</option>
              <option value="pulse">Pulse</option>
              <option value="wave">Wave</option>
              <option value="none">None</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>
            Speed: {speed.toFixed(1)}x
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
            />
          </label>
        </div>

        <button onClick={() => setLoading(!loading)}>
          {loading ? 'Stop Loading' : 'Start Loading'}
        </button>

        <p style={{ marginTop: 10, fontSize: 12, color: '#666' }}>
          Skeleton blocks detected: {blocks.length}
        </p>
      </div>

      {/* Content with skeleton */}
      <div ref={containerRef}>
        <SkeletonOverlay
          loading={loading}
          animation={animation}
          speed={speed}
          onScanComplete={handleScanComplete}
        >
          <div style={{ maxWidth: 600, padding: 20 }}>
            <h1>Blog Post Title</h1>
            <p>By Author Name • Published 2 days ago</p>
            
            <img
              src="https://via.placeholder.com/600x300"
              alt="Cover"
              style={{ width: '100%', height: 300, objectFit: 'cover', marginBottom: 20 }}
            />

            <p>
              This is a sample blog post content. The skeleton overlay will automatically
              detect and replace all text content and media elements while loading.
            </p>

            <h2>Section 1</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <h2>Section 2</h2>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquip ex ea commodo consequat.
            </p>

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button>Like</button>
              <button>Share</button>
              <button>Comment</button>
            </div>
          </div>
        </SkeletonOverlay>
      </div>
    </div>
  );
}
