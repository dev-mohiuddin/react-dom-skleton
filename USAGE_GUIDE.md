# How to Use react-dom-skeleton in Your React App

## 📦 Installation Methods

### Method 1: Local Development (From This Project)

If you want to use the local package:

```bash
# Terminal in your React app directory
npm install file:../path-to-react-dom-skeleton
```

Or add to `package.json`:
```json
{
  "dependencies": {
    "react-dom-skeleton": "file:../react-dom-skeleton"
  }
}
```

### Method 2: NPM Registry (When Published)

```bash
npm install react-dom-skeleton
```

---

## 🎯 Basic Usage

### Step 1: Import Component

```tsx
import { SkeletonOverlay } from 'react-dom-skeleton';
import { useState, useEffect } from 'react';
```

### Step 2: Wrap Your Content

```tsx
export default function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate API call
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  return (
    <SkeletonOverlay loading={loading}>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <img src={user.avatar} alt="Avatar" />
        </div>
      ) : null}
    </SkeletonOverlay>
  );
}
```

---

## ⚙️ Configuration Options

```tsx
<SkeletonOverlay
  loading={isLoading}              // Enable/disable skeleton
  animation="shimmer"              // 'shimmer' | 'pulse' | 'wave' | 'none'
  speed={1}                        // 0.5 to 2 (slower to faster)
  preserveStaticText={false}       // Keep labels visible
  theme="auto"                     // 'auto' | 'dark' | 'light'
  enabled={true}                   // Enable/disable feature
  className="custom-class"         // Add CSS class
  onScanComplete={(blocks) => {
    console.log(`Generated ${blocks.length} skeleton blocks`);
  }}
>
  {/* Your content */}
</SkeletonOverlay>
```

---

## 🎨 Animation Examples

### Shimmer (Default - Horizontal Sweep)
```tsx
<SkeletonOverlay loading={loading} animation="shimmer">
  {children}
</SkeletonOverlay>
```

### Pulse (Fade In/Out)
```tsx
<SkeletonOverlay loading={loading} animation="pulse">
  {children}
</SkeletonOverlay>
```

### Wave (Diagonal Sweep)
```tsx
<SkeletonOverlay loading={loading} animation="wave">
  {children}
</SkeletonOverlay>
```

### Static (No Animation)
```tsx
<SkeletonOverlay loading={loading} animation="none">
  {children}
</SkeletonOverlay>
```

---

## 📱 Responsive Example

```tsx
function ResponsiveLoader() {
  const [loading, setLoading] = useState(true);
  
  // Adjust speed based on device
  const speed = window.innerWidth < 768 ? 0.8 : 1;

  return (
    <SkeletonOverlay 
      loading={loading} 
      speed={speed}
      animation="pulse"
    >
      {/* Content here */}
    </SkeletonOverlay>
  );
}
```

---

## 🚫 Exclude Elements

Don't want to skeleton certain elements? Use the data attribute:

```tsx
<SkeletonOverlay loading={loading}>
  <header data-skeleton-ignore>
    {/* Navigation won't be skeletonized */}
  </header>
  
  <main>
    {/* This will be skeletonized */}
  </main>
</SkeletonOverlay>
```

---

## 🎬 Advanced: With Callback

```tsx
import { SkeletonOverlay, SkeletonBlock } from 'react-dom-skeleton';

function AdvancedExample() {
  const [loading, setLoading] = useState(true);
  const [blockCount, setBlockCount] = useState(0);

  const handleScanComplete = (blocks: SkeletonBlock[]) => {
    console.log(`Scanned ${blocks.length} blocks:`);
    blocks.forEach(block => {
      console.log(`  Block at (${block.x}, ${block.y}): ${block.width}x${block.height}`);
    });
    setBlockCount(blocks.length);
  };

  return (
    <SkeletonOverlay
      loading={loading}
      onScanComplete={handleScanComplete}
    >
      <div>
        {loading && <p>Skeleton blocks: {blockCount}</p>}
        {/* Content */}
      </div>
    </SkeletonOverlay>
  );
}
```

---

## 🔌 With Next.js 13+ App Router

```tsx
'use client';

import { SkeletonOverlay } from 'react-dom-skeleton';
import { Suspense, useState } from 'react';

async function fetchData() {
  const res = await fetch('/api/data');
  return res.json();
}

export default function Page() {
  const [loading, setLoading] = useState(true);

  return (
    <SkeletonOverlay loading={loading}>
      <Suspense fallback={<LoadingFallback />}>
        <Content onLoadComplete={() => setLoading(false)} />
      </Suspense>
    </SkeletonOverlay>
  );
}

async function Content({ onLoadComplete }: { onLoadComplete: () => void }) {
  const data = await fetchData();
  onLoadComplete?.();

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}

function LoadingFallback() {
  return <div>Loading...</div>;
}
```

---

## 🎨 Custom Styling (CSS)

```css
/* Override default skeleton color */
.skeleton-primitive {
  background-color: #f0f0f0 !important;
}

/* Adjust animation speed */
.skeleton-primitive[data-animation='shimmer'] {
  animation-duration: 1.2s !important;
}

/* Dark mode adjustments */
.dark-mode .skeleton-primitive {
  background-color: #333333 !important;
}
```

---

## 🧪 Testing with Different Sizes

```tsx
function DemoComponent() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);

  return (
    <div>
      <button onClick={() => setLoading(!loading)}>
        {loading ? 'Stop Loading' : 'Start Loading'}
      </button>

      <SkeletonOverlay 
        loading={loading}
        animation="shimmer"
      >
        <div style={{ maxWidth: 600 }}>
          <h1>Article Title</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <img 
            src="/placeholder.jpg" 
            alt="Featured" 
            style={{ width: '100%', height: 300 }}
          />
          <p>
            More content here that will be skeletonized while loading.
          </p>
        </div>
      </SkeletonOverlay>
    </div>
  );
}
```

---

## 📊 Performance Tips

1. **Use appropriate animation for your use case**
   - `shimmer` - Most visually appealing
   - `pulse` - Simpler, better for mobile
   - `wave` - Modern feel
   - `none` - Minimal overhead

2. **Exclude heavy components**
   ```tsx
   <div data-skeleton-ignore>
     {/* Complex component that doesn't need skeleton */}
   </div>
   ```

3. **Adjust speed for mobile**
   ```tsx
   const speed = window.innerWidth < 768 ? 0.8 : 1;
   ```

---

## 🐛 Common Issues

**Q: Skeleton not appearing?**  
A: Check that `loading={true}` and elements have height/width

**Q: Animation not smooth?**  
A: Try `animation="pulse"` instead for better mobile performance

**Q: Content jumping when loaded?**  
A: Use `animation="none"` for static layouts

---

## ✅ Checklist

- [ ] Install react-dom-skeleton
- [ ] Import SkeletonOverlay component
- [ ] Wrap your loading content
- [ ] Set `loading={isLoading}` state
- [ ] Choose animation mode
- [ ] Test on mobile
- [ ] Done! 🎉

---

**Next Steps**: Check out the examples in the `examples/` folder or read the full API docs in `README.md`
