import {
  ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis,
} from 'recharts';

/* SVG tick/stroke props can't read CSS custom properties reliably, so token
   values from tokens.css are inlined here: lime-500, neutral-400, neutral-200. */
const LIME = 'rgb(206, 247, 57)';
const GRID = 'rgb(61, 61, 61)';
const TICK = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 10,
  fill: 'rgb(157, 157, 157)',
};

function fmtDateTick(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function RateHistoryChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 8 }}>
        <defs>
          <linearGradient id="rateFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={LIME} stopOpacity={0.28} />
            <stop offset="100%" stopColor={LIME} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid horizontal vertical={false} strokeDasharray="4 4" stroke={GRID} />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={TICK}
          tickFormatter={fmtDateTick}
          minTickGap={64}
          tickMargin={10}
        />
        <YAxis
          orientation="left"
          domain={['dataMin', 'dataMax']}
          tickCount={3}
          axisLine={false}
          tickLine={false}
          width={56}
          tick={TICK}
          tickFormatter={(v) => v.toFixed(4)}
        />
        <Area
          type="monotone"
          dataKey="rate"
          stroke={LIME}
          strokeWidth={1.5}
          fill="url(#rateFill)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
