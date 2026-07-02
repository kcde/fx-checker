import { useState, useEffect } from 'react';
import { getLatestRates } from '../api/frankfurter';

export default function useRates(base, quotes = []) {
  const [rates, setRates] = useState(null);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const quotesKey = quotes.join(',');

  useEffect(() => {
    if (!base) return;
    let cancelled = false;
    getLatestRates(base, quotes)
      .then(({ rates: r, date: d }) => {
        if (!cancelled) { setRates(r); setDate(d); setLoading(false); }
      })
      .catch((err) => { if (!cancelled) { setError(err); setLoading(false); } });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, quotesKey]);

  return { rates, date, loading, error };
}
