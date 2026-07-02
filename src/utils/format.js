/* Pure conversion + formatting helpers. No React, no side effects. */

export function convert(amount, rate) {
  if (!Number.isFinite(amount) || !Number.isFinite(rate)) return null;
  return amount * rate;
}

const amountFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatAmount(n) {
  if (!Number.isFinite(n)) return '';
  return amountFormatter.format(n);
}

export function formatRate(n) {
  if (!Number.isFinite(n)) return '—';
  return n < 10 ? n.toFixed(4) : n.toFixed(2);
}

export function relativeTime(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'JUST NOW';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} MIN AGO`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} HR AGO`;
  const days = Math.floor(hours / 24);
  return days === 1 ? '1 DAY AGO' : `${days} DAYS AGO`;
}

/* Range stats over a rate-history series [{date, rate}, ...] (oldest first). */
export function historyStats(points) {
  if (!points || points.length === 0) return null;
  const open = points[0].rate;
  const last = points[points.length - 1].rate;
  const change = last - open;
  const pct = open !== 0 ? (change / open) * 100 : 0;
  return { open, last, change, pct };
}
