import { useState, useEffect } from 'react';
import { getRateSeries } from '../api/frankfurter';

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

/* ~5-day window guarantees two ECB fixings across weekends/holidays. */
function recentWindow() {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 5);
  return { from: isoDate(from), to: isoDate(to) };
}

/* Live rate + 24h change for a set of directional pairs. Pairs are grouped by base
   so each distinct base is one API call; results are keyed `${base}/${quote}`.
   Loading is derived by comparing keys (like useRateHistory) so no setState runs
   synchronously in the effect. */
export default function useFavoriteRates(favorites = []) {
  const key = favorites.map((f) => `${f.base}/${f.quote}`).join(',');
  const [result, setResult] = useState({ key: '', rateMap: {} });

  useEffect(() => {
    if (favorites.length === 0) return;
    let cancelled = false;

    // base -> [quotes]
    const byBase = new Map();
    for (const { base, quote } of favorites) {
      if (!byBase.has(base)) byBase.set(base, []);
      byBase.get(base).push(quote);
    }

    const { from, to } = recentWindow();
    const bases = [...byBase.keys()];

    Promise.all(bases.map((base) => getRateSeries(base, byBase.get(base), from, to)))
      .then((results) => {
        if (cancelled) return;
        const map = {};
        results.forEach((rows, i) => {
          const base = bases[i];
          const seriesByQuote = new Map();
          for (const row of rows) {
            if (!seriesByQuote.has(row.quote)) seriesByQuote.set(row.quote, []);
            seriesByQuote.get(row.quote).push(row);
          }
          for (const [quote, series] of seriesByQuote) {
            const rate = series[series.length - 1].rate;
            const prev = series.length > 1 ? series[series.length - 2].rate : null;
            const pct = prev ? ((rate - prev) / prev) * 100 : 0;
            map[`${base}/${quote}`] = { rate, pct, direction: pct >= 0 ? 'up' : 'down' };
          }
        });
        setResult({ key, rateMap: map });
      })
      .catch(() => { if (!cancelled) setResult({ key, rateMap: {} }); });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const isCurrent = result.key === key;
  return {
    rateMap: isCurrent ? result.rateMap : {},
    loading: favorites.length > 0 && !isCurrent,
  };
}
