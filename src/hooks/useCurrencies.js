import { useState, useEffect } from 'react';
import { getCurrencies } from '../api/frankfurter';

export default function useCurrencies() {
  const [currencies, setCurrencies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getCurrencies()
      .then((data) => { if (!cancelled) { setCurrencies(data); setLoading(false); } })
      .catch((err) => { if (!cancelled) { setError(err); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  return { currencies, loading, error };
}
