/**
 * Example: Next.js Integration
 * Demonstrates usage with Next.js 13+ App Router
 */

'use client';

import React, { useState, Suspense } from 'react';
import { SkeletonOverlay } from 'react-dom-skeleton';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
}

// Simulate async data fetching
async function fetchProduct(id: number): Promise<Product> {
  const response = await fetch(`/api/products/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  return response.json();
}

// Async component that fetches data
async function ProductContent({ productId }: { productId: number }) {
  const product = await fetchProduct(productId);

  return (
    <div style={{ maxWidth: 500 }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', height: 300, objectFit: 'cover' }}
      />
      <h1>{product.name}</h1>
      <p style={{ fontSize: 24, fontWeight: 'bold', color: '#2ecc71' }}>
        ${product.price.toFixed(2)}
      </p>
      <p>Rating: {product.rating}/5</p>
      <p>{product.description}</p>
      <button style={{ padding: '10px 20px', marginTop: 10 }}>
        Add to Cart
      </button>
    </div>
  );
}

// Fallback skeleton content
function ProductSkeleton() {
  return (
    <div style={{ maxWidth: 500 }}>
      <div style={{ width: '100%', height: 300, backgroundColor: '#e0e0e0' }} />
      <div style={{ height: 32, backgroundColor: '#e0e0e0', marginTop: 16 }} />
      <div style={{ height: 28, backgroundColor: '#e0e0e0', marginTop: 12, width: 150 }} />
      <div style={{ height: 20, backgroundColor: '#e0e0e0', marginTop: 12 }} />
      <div style={{ height: 80, backgroundColor: '#e0e0e0', marginTop: 12 }} />
    </div>
  );
}

// Main component
export function NextJsExample({ productId }: { productId: number }) {
  const [loading, setLoading] = useState(true);

  // In a real Next.js app, you'd handle loading state differently
  // This is a simplified example
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SkeletonOverlay loading={loading}>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent productId={productId} />
      </Suspense>
    </SkeletonOverlay>
  );
}

// Usage in page.tsx:
// export default function ProductPage({ params }: { params: { id: string } }) {
//   return <NextJsExample productId={parseInt(params.id)} />;
// }
