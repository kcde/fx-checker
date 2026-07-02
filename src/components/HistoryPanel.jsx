import { useState } from 'react';
import { useFxState } from '../state/useFx';
import useRateHistory from '../hooks/useRateHistory';
import { formatRate, historyStats } from '../utils/format';
import StatBox from './StatBox';
import RangeSwitcher from './RangeSwitcher';
import RateHistoryChart from './RateHistoryChart';

function fmtMeta(points) {
  const last = points[points.length - 1];
  const date = new Date(last.date)
    .toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
    .toUpperCase();
  // ECB fixing is published around 16:00 CET each working day
  return `${formatRate(last.rate)} · ${date} 16:00 CET`;
}

export default function HistoryPanel() {
  const { base, quote } = useFxState();
  const [range, setRange] = useState('1M');
  const { points, loading, error } = useRateHistory(base, quote, range);

  const stats = historyStats(points);
  const up = stats ? stats.change >= 0 : true;
  const sign = up ? '+' : '';

  return (
    <div className="history-panel">
      <div className="history-panel__top">
        <div className="stat-row">
          <StatBox label="OPEN" value={stats ? formatRate(stats.open) : '—'} />
          <StatBox label="LAST" value={stats ? formatRate(stats.last) : '—'} />
          <StatBox
            label="CHANGE"
            value={stats ? `${sign}${stats.change.toFixed(4)}` : '—'}
            tone={stats ? (up ? 'up' : 'down') : undefined}
          />
          <StatBox
            label="% CHANGE"
            value={stats ? `${up ? '▲' : '▼'} ${sign}${stats.pct.toFixed(2)}%` : '—'}
            tone={stats ? (up ? 'up' : 'down') : undefined}
          />
        </div>
        <RangeSwitcher value={range} onChange={setRange} />
      </div>

      <div className="chart-card">
        <div className="chart-card__header">
          <span className="chart-card__pair">{base}/{quote}</span>
          <span className="chart-card__meta">
            {points?.length ? fmtMeta(points) : ''}
          </span>
        </div>
        {error ? (
          <div className="chart-card__notice">COULD NOT LOAD RATE HISTORY</div>
        ) : loading && !points ? (
          <div className="chart-card__notice">LOADING…</div>
        ) : (
          <RateHistoryChart data={points} />
        )}
      </div>
    </div>
  );
}
