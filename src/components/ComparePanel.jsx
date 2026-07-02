import { useFxState, useFxDispatch } from '../state/useFx';
import useRates from '../hooks/useRates';
import useCurrencies from '../hooks/useCurrencies';
import { convert, formatAmount, formatRate } from '../utils/format';
import CompareItem from './CompareItem';

// Fixed set of majors to compare against (matches the design). The current base is
// filtered out so a pair never compares a currency with itself.
const COMPARE_QUOTES = ['GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'INR', 'CNY', 'BDT'];

export default function ComparePanel() {
  const { base, amount, favorites } = useFxState();
  const dispatch = useFxDispatch();

  const quotes = COMPARE_QUOTES.filter((c) => c !== base);
  const { rates } = useRates(base, quotes);
  const { currencies } = useCurrencies();

  const amt = parseFloat(amount);

  return (
    <div className="compare-panel">
      <div className="compare-panel__header">
        <span className="compare-panel__title">
          MULTI-CURRENCY{' '}
          <strong>{Number.isFinite(amt) ? formatAmount(amt) : '0.00'}</strong>{' '}
          FROM {base}
        </span>
        <span className="compare-panel__count">{quotes.length} PAIRS</span>
      </div>

      <div className="compare-panel__list">
        {quotes.map((code) => {
          const rate = rates?.[code] ?? null;
          const value = convert(amt, rate);
          const favorited = favorites.some((f) => f.base === base && f.quote === code);
          return (
            <CompareItem
              key={code}
              code={code}
              name={currencies?.[code]?.name ?? ''}
              value={value != null ? formatAmount(value) : '—'}
              rate={rate != null ? formatRate(rate) : '—'}
              favorited={favorited}
              onFavorite={() => dispatch({ type: 'TOGGLE_FAVORITE', base, quote: code })}
            />
          );
        })}
      </div>
    </div>
  );
}
