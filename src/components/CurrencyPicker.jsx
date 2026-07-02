import { useEffect, useMemo, useRef, useState } from 'react';
import SearchInput from './SearchInput';
import CurrencyItem from './CurrencyItem';

const POPULAR = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];

export default function CurrencyPicker({ currencies, selected, onSelect, loading }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // autofocus the search when the popover opens
  useEffect(() => { inputRef.current?.focus(); }, []);

  // full list as [{ code, name }]
  const all = useMemo(
    () => Object.entries(currencies ?? {}).map(([code, meta]) => ({ code, name: meta.name })),
    [currencies],
  );

  const q = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!q) return all;
    return all.filter((c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
  }, [all, q]);

  // query empty → Popular / Other groups; query present → flat results
  const popular = useMemo(
    () => POPULAR.map((code) => matches.find((c) => c.code === code)).filter(Boolean),
    [matches],
  );
  const other = useMemo(
    () => matches.filter((c) => !POPULAR.includes(c.code)).sort((a, b) => a.code.localeCompare(b.code)),
    [matches],
  );

  const renderRow = (c) => (
    <CurrencyItem
      key={c.code}
      code={c.code}
      name={c.name}
      selected={c.code === selected}
      onClick={() => onSelect(c.code)}
    />
  );

  return (
    <div className="currency-picker">
      <div className="currency-picker__search">
        <SearchInput inputRef={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="currency-picker__list" role="listbox" aria-label="Select a currency">
        {loading && <p className="currency-picker__note">Loading currencies…</p>}

        {!loading && matches.length === 0 && (
          <p className="currency-picker__note">No currencies match “{query}”.</p>
        )}

        {!loading && matches.length > 0 && (
          q ? (
            matches.map(renderRow)
          ) : (
            <>
              {popular.length > 0 && (
                <div className="currency-picker__group" role="group" aria-label="Popular">
                  <p className="currency-picker__group-label">POPULAR</p>
                  {popular.map(renderRow)}
                </div>
              )}
              {other.length > 0 && (
                <div className="currency-picker__group" role="group" aria-label="Other currencies">
                  <p className="currency-picker__group-label">OTHER CURRENCIES</p>
                  {other.map(renderRow)}
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}
