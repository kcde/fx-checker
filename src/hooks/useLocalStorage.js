import { useEffect } from 'react';

/* Read a JSON value once (used by the reducer's lazy initializer).
   Falls back on missing keys, corrupt JSON, or blocked storage access. */
export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/* Write a value back whenever it changes. Persistence lives here, in an
   effect, so the reducer stays pure. */
export function useSyncToLocalStorage(key, value) {
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or blocked — the app still works, it just won't persist
    }
  }, [key, value]);
}
