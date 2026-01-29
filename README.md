# react-dom-skeleton 💀

> Enterprise-ready React package that automatically generates **pixel-perfect loading skeletons** by scanning the DOM structure with **zero configuration**.

[![npm version](https://img.shields.io/npm/v/react-dom-skeleton.svg?style=flat-square)](https://www.npmjs.com/package/react-dom-skeleton)
[![npm downloads](https://img.shields.io/npm/dm/react-dom-skeleton.svg?style=flat-square)](https://www.npmjs.com/package/react-dom-skeleton)
[![MIT License](https://img.shields.io/npm/l/react-dom-skeleton.svg?style=flat-square)](LICENSE)

## Features ✨

- 🚀 **Zero Configuration** - No manual skeleton setup required
- 📱 **Responsive** - Automatically adapts to layout changes via `ResizeObserver`
- 🎨 **Smart Color Matching** - Auto-generates skeleton colors based on background
- ♿ **Accessible** - Built with accessibility first (ARIA labels, motion preferences)
- 🔄 **SSR Ready** - Full Next.js and Server Component support
- 🎬 **4 Animation Modes** - Shimmer, pulse, wave, and static
- ⚡ **60fps Performance** - GPU-accelerated with `will-change` optimization
- 📦 **Tiny Bundle** - Minimal dependencies, optimized for production
- 🧩 **TypeScript** - Full type safety and IDE support
- 🔌 **Extensible** - Expose core scanner and color utilities for advanced use cases

## Installation

```bash
npm install react-dom-skeleton
# or
yarn add react-dom-skeleton
# or
pnpm add react-dom-skeleton
```

### Requirements

- React 16.8.0 or higher
- React DOM 16.8.0 or higher

## Quick Start

### Basic Usage

Wrap your loading content with `<SkeletonOverlay>`:

```tsx
import { SkeletonOverlay } from 'react-dom-skeleton';

export function MyComponent() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <SkeletonOverlay loading={loading}>
      {data ? (
        <div>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <img src={data.imageUrl} alt="thumbnail" />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </SkeletonOverlay>
  );
}
```

### With Next.js 13+ (App Router)

```tsx
'use client';

import { SkeletonOverlay } from 'react-dom-skeleton';
import { Suspense } from 'react';

async function getData() {
  const res = await fetch('/api/data');
  return res.json();
}

export default function Page() {
  const [loading, setLoading] = React.useState(true);

  return (
    <SkeletonOverlay loading={loading}>
      <Suspense fallback={<div>Loading...</div>}>
        <Content onLoadComplete={() => setLoading(false)} />
      </Suspense>
    </SkeletonOverlay>
  );
}

async function Content({ onLoadComplete }) {
  const data = await getData();
  onLoadComplete?.();

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}
```

## API Reference

### `<SkeletonOverlay />`

Main component for displaying skeleton loading states.

```tsx
interface SkeletonConfig {
  loading: boolean;              // Enable/disable skeleton overlay
  children: React.ReactNode;    // Your content
  animation?: 'shimmer' | 'pulse' | 'wave' | 'none';  // Animation style
  speed?: number;               // Animation speed multiplier (0.5-2)
  preserveStaticText?: boolean; // Keep hardcoded labels visible
  theme?: 'auto' | 'dark' | 'light';  // Color theme
  enabled?: boolean;            // Completely disable skeleton system
  className?: string;           // Additional CSS class
  onScanComplete?: (blocks: SkeletonBlock[]) => void; // Callback after scan
}
```

### `<SkeletonRenderer />`

Low-level component for rendering skeleton blocks (usually not needed directly).

```tsx
<SkeletonRenderer
  blocks={blocks}
  animation="shimmer"
  speed={1}
  theme="auto"
/>
```

### `useDomObserver`

Hook to observe DOM changes and dimensions:

```tsx
const { useDomObserver } = require('react-dom-skeleton');

useDomObserver(containerRef, {
  onResize: (entry) => console.log('Resized!'),
  onMutate: (mutations) => console.log('DOM changed!'),
  debounceMs: 300,
  observeResize: true,
  observeMutation: true,
});
```

### `withSkeleton` HOC

Higher-order component for easier integration:

```tsx
const MyComponentWithSkeleton = withSkeleton(MyComponent);

// Use it
<MyComponentWithSkeleton
  loading={isLoading}
  animation="pulse"
  speed={1.5}
/>
```

## Advanced Usage

### Exclude Elements from Skeleton

Add `data-skeleton-ignore` attribute to exclude elements:

```tsx
<SkeletonOverlay loading={loading}>
  <div>
    <h1>Title</h1>
    <p>This will be skeletonized</p>
    <div data-skeleton-ignore>
      This won't be skeletonized
    </div>
  </div>
</SkeletonOverlay>
```

### Custom Color Matching

Use the core utilities for custom skeleton logic:

```tsx
import {
  scanComponentTree,
  generateSkeletonColor,
  createSkeletonBlocks,
} from 'react-dom-skeleton';

const elements = scanComponentTree(containerElement);
const color = generateSkeletonColor('#f5f5f5'); // Returns darker shade
```

### Responsive Animations

Adjust animation speed based on device:

```tsx
const speed = window.innerWidth < 768 ? 0.8 : 1; // Slower on mobile

<SkeletonOverlay loading={loading} speed={speed}>
  {children}
</SkeletonOverlay>
```

## How It Works 🔧

1. **DOM Scanning** - Recursively walks the DOM tree to find content elements
2. **Text Detection** - Distinguishes between static labels and dynamic data
3. **Color Matching** - Extracts computed background colors and generates appropriate skeleton shades
4. **Layout Calculation** - Uses `getBoundingClientRect()` to determine element positions
5. **Optimization** - Merges adjacent blocks to reduce DOM nodes
6. **Rendering** - Creates animated overlay with GPU-accelerated CSS
7. **Observation** - `ResizeObserver` and `MutationObserver` keep skeletons in sync

## Performance Considerations ⚡

- **GPU Acceleration** - Uses `will-change: transform` for 60fps animations
- **Debouncing** - DOM changes are debounced (default 300ms) to avoid excessive rescans
- **Block Merging** - Adjacent skeleton blocks are merged to reduce DOM complexity
- **Lazy Observation** - Only observes DOM when `loading={true}`
- **SSR Safe** - No issues with server-side rendering or hydration

## Browser Support 🌍

| Browser | Version |
|---------|---------|
| Chrome  | Latest  |
| Firefox | Latest  |
| Safari  | Latest  |
| Edge    | Latest  |
| IE      | Not supported |

ResizeObserver and MutationObserver are required. Use polyfills for older browsers if needed.

## Accessibility ♿

- Skeleton primitives have `aria-hidden="true"` to hide from screen readers
- Respects `prefers-reduced-motion` for animations
- High contrast mode support
- Does not block content interaction

## Customization 🎨

### Custom CSS

Override default styles:

```css
/* Change default skeleton color */
.skeleton-primitive {
  background-color: #f0f0f0 !important;
}

/* Adjust animation speed */
.skeleton-primitive[data-animation='shimmer'] {
  animation-duration: 1s !important;
}
```

### Custom Theme

Pass custom theme prop:

```tsx
<SkeletonOverlay loading={loading} theme="dark">
  {children}
</SkeletonOverlay>
```

## Troubleshooting 🐛

### Skeletons not appearing?
- Ensure `loading={true}`
- Check that content is inside the container
- Verify elements have `height` and `width`

### Skeletons jumping when content loads?
- Use `animation="none"` for static skeletons
- Ensure content dimensions don't change unexpectedly

### Performance issues?
- Increase `debounceMs` in observer options
- Reduce number of elements being scanned
- Use `data-skeleton-ignore` on complex subtrees

## Contributing 🤝

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License 📄

MIT © 2024 react-dom-skeleton

## Roadmap 🗺️

- [ ] Storybook integration
- [ ] Figma plugin for skeleton design
- [ ] Custom skeleton shapes (circles, lines)
- [ ] Built-in analytics
- [ ] WebAssembly optimizations

---

Made with ❤️ for React developers
