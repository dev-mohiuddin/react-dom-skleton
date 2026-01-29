/**
 * Example: Basic Skeleton Loading
 * Demonstrates the simplest usage of SkeletonOverlay
 */

import React, { useState, useEffect } from 'react';
import { SkeletonOverlay } from 'react-dom-skeleton';

interface UserData {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
}

export function BasicExample() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setUser({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://via.placeholder.com/100',
        bio: 'Software engineer and open source enthusiast',
      });
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SkeletonOverlay loading={loading} animation="shimmer">
      <div style={{ maxWidth: 400, padding: 20, border: '1px solid #eee', borderRadius: 8 }}>
        {user ? (
          <>
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: 100, height: 100, borderRadius: '50%' }}
            />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.bio}</p>
            <p>User ID: {user.id}</p>
          </>
        ) : (
          <>
            <div style={{ width: 100, height: 100, backgroundColor: '#f0f0f0' }} />
            <div style={{ height: 20, backgroundColor: '#f0f0f0', marginTop: 10 }} />
            <div style={{ height: 16, backgroundColor: '#f0f0f0', marginTop: 8 }} />
            <div style={{ height: 16, backgroundColor: '#f0f0f0', marginTop: 8 }} />
            <div style={{ height: 16, backgroundColor: '#f0f0f0', marginTop: 8 }} />
          </>
        )}
      </div>
    </SkeletonOverlay>
  );
}
