'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'air_screen_user_id';

const createGuestId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export const useGuestUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const existing = window.localStorage.getItem(STORAGE_KEY);

      if (existing) {
        setUserId(existing);
        return;
      }

      const id = createGuestId();
      window.localStorage.setItem(STORAGE_KEY, id);
      setUserId(id);
    } catch {
      // Fallback to an in-memory id if localStorage is unavailable
      if (!userId) {
        setUserId(createGuestId());
      }
    }
  }, [userId]);

  return userId;
};

