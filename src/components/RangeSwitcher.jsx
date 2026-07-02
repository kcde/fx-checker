import { RANGES } from '../hooks/useRateHistory';

export default function RangeSwitcher({ value, onChange }) {
  return (
    <div className="range-switcher" role="group" aria-label="Chart range">
      {RANGES.map((range) => (
        <button
          key={range}
          type="button"
          className={`range-switcher__btn${value === range ? ' range-switcher__btn--active' : ''}`}
          aria-pressed={value === range}
          onClick={() => onChange(range)}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
