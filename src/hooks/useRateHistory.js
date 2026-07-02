import { useState, useEffect } from 'react';
import { getRateHistory } from '../api/frankfurter';

export const RANGES = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

/* ECB publishes one rate per working day, so "1D" fetches a few calendar days
   to guarantee two points across weekends/holidays, then keeps the last two. */
function rangeToDates(range) {
  const to = new Date();
  const from = new Date();
  switch (range) {
    case '1D': from.setDate(from.getDate() - 5); break;
    case '1W': from.setDate(from.getDate() - 7); break;
    case '1M': from.setMonth(from.getMonth() - 1); break;
    case '3M': from.setMonth(from.getMonth() - 3); break;
    case '1Y': from.setFullYear(from.getFullYear() - 1); break;
    case '5Y': from.setFullYear(from.getFullYear() - 5); break;
    default: from.setMonth(from.getMonth() - 1);
  }
  return { from: isoDate(from), to: isoDate(to) };
}

const MAX_POINTS = 400;

/* Thin long series for rendering; always keeps the first and last points so
   open/last stats stay exact. */
function thin(points) {
  if (points.length <= MAX_POINTS) return points;
  const step = Math.ceil(points.length / MAX_POINTS);
  const out = points.filter((_, i) => i % step === 0);
  if (out[out.length - 1] !== points[points.length - 1]) {
    out.push(points[points.length - 1]);
  }
  return out;
}

export default function useRateHistory(base, quote, range) {
  // points/error are stored with the request key they answer; "loading" is
  // derived by comparing keys instead of being its own state
  const [result, setResult] = useState({ key: null, points: null, error: null });
  const key = `${base}/${quote}/${range}`;

  useEffect(() => {
    if (!base || !quote) return;
    let cancelled = false;

    const { from, to } = rangeToDates(range);
    getRateHistory(base, quote, from, to)
      .then((data) => {
        if (cancelled) return;
        const sliced = range === '1D' ? data.slice(-2) : data;
        setResult({ key, points: thin(sliced), error: null });
      })
      .catch((error) => {
        if (cancelled) return;
        setResult({ key, points: null, error });
      });

    return () => { cancelled = true; };
  }, [base, quote, range, key]);

  const isCurrent = result.key === key;
  return {
    points: isCurrent ? result.points : null,
    loading: !isCurrent,
    error: isCurrent ? result.error : null,
  };
}
