const BASE = 'https://api.frankfurter.dev';

const cache = new Map();

async function fetchCached(url, ttlMs) {
  const cached = cache.get(url);
  if (cached && Date.now() < cached.expires) return cached.data;

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw { message: body.message ?? res.statusText, status: res.status };
  }
  const data = await res.json();
  cache.set(url, { data, expires: Date.now() + ttlMs });
  return data;
}

export async function getCurrencies() {
  const url = `${BASE}/v2/currencies`;
  const raw = await fetchCached(url, 24 * 60 * 60 * 1000);
  return Object.fromEntries(raw.map((c) => [c.iso_code, { name: c.name, symbol: c.symbol }]));
}

export async function getLatestRates(base, quotes = []) {
  const qs = quotes.length ? `&quotes=${quotes.join(',')}` : '';
  const url = `${BASE}/v2/rates?base=${base}${qs}`;
  const raw = await fetchCached(url, 5 * 60 * 1000);
  const rates = Object.fromEntries(raw.map((r) => [r.quote, r.rate]));
  const date = raw[0]?.date ?? null;
  return { rates, date };
}

export async function getRateHistory(base, quote, from, to) {
  const url = `${BASE}/v2/rates?from=${from}&to=${to}&base=${base}&quotes=${quote}`;
  // past rates are immutable; 1h TTL only bounds how late today's fixing appears
  const raw = await fetchCached(url, 60 * 60 * 1000);
  return raw.map((r) => ({ date: r.date, rate: r.rate }));
}

// Historical range for several quotes at once. The API returns flat rows
// ({ date, quote, rate }) spanning every day × quote, so one call yields both the
// latest fixing and the prior day's for the whole ticker.
export async function getRateSeries(base, quotes, from, to) {
  const url = `${BASE}/v2/rates?from=${from}&to=${to}&base=${base}&quotes=${quotes.join(',')}`;
  const raw = await fetchCached(url, 60 * 60 * 1000);
  return raw.map((r) => ({ date: r.date, quote: r.quote, rate: r.rate }));
}
