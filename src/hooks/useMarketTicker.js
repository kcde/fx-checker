import { useState, useEffect } from 'react';
import { getRateSeries } from '../api/frankfurter';

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

/* ECB publishes one fixing per working day, so we fetch a ~5-day window to
   guarantee at least two fixings across weekends/holidays. "24h change" is then
   the latest fixing vs the previous one. */
function recentWindow() {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 5);
  return { from: isoDate(from), to: isoDate(to) };
}

/* Rows come back flat and oldest-first; take the last two fixings per quote and
   turn them into { rate, pct, direction }. */
function computeItems(rows, quotes) {
  const byQuote = new Map();
  for (const row of rows) {
    if (!byQuote.has(row.quote)) byQuote.set(row.quote, []);
    byQuote.get(row.quote).push(row);
  }

  return quotes.map((quote) => {
    const series = byQuote.get(quote) ?? [];
    const rate = series.length ? series[series.length - 1].rate : null;
    const prev = series.length > 1 ? series[series.length - 2].rate : null;
    const pct = prev ? ((rate - prev) / prev) * 100 : 0;
    return { quote, rate, pct, direction: pct >= 0 ? 'up' : 'down' };
  });
}

export default function useMarketTicker(base, quotes = []) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const quotesKey = quotes.join(',');

  useEffect(() => {
    if (!base || quotes.length === 0) return;
    let cancelled = false;

    const { from, to } = recentWindow();
    getRateSeries(base, quotes, from, to)
      .then((rows) => {
        if (cancelled) return;
        setItems(computeItems(rows, quotes));
        setLoading(false);
      })
      .catch((err) => { if (!cancelled) { setError(err); setLoading(false); } });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, quotesKey]);

  return { items, loading, error };
}
