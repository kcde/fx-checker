import { useEffect, useMemo, useRef, useState } from 'react';
import SearchInput from './SearchInput';
import CurrencyItem from './CurrencyItem';

const POPULAR = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];

export default function CurrencyPicker({ currencies, selected, onSelect, loading }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // autofocus the search when the popover opens
  useEffect(() => { inputRef.current?.focus(); }, []);

  // roving focus over the visible option buttons via arrow keys
  const onKeyDown = (e) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const opts = Array.from(listRef.current?.querySelectorAll('button[role="option"]') ?? []);
    if (opts.length === 0) return;
    e.preventDefault();
    const idx = opts.indexOf(document.activeElement);
    if (e.key === 'ArrowUp' && idx <= 0) { inputRef.current?.focus(); return; }
    let next;
    if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = opts.length - 1;
    else if (e.key === 'ArrowDown') next = idx < 0 ? 0 : Math.min(idx + 1, opts.length - 1);
    else next = idx - 1;
    opts[next]?.focus();
  };

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
    <div className="currency-picker" onKeyDown={onKeyDown}>
      <div className="currency-picker__search">
        <SearchInput inputRef={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="currency-picker__list" role="listbox" aria-label="Select a currency" ref={listRef}>
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
                  <p className="currency-picker__group-label">
                    <span>POPULAR</span>
                    <span className="currency-picker__group-count">{popular.length}</span>
                  </p>
                  {popular.map(renderRow)}
                </div>
              )}
              {other.length > 0 && (
                <div className="currency-picker__group" role="group" aria-label="Other currencies">
                  <p className="currency-picker__group-label">
                    <span>OTHER CURRENCIES</span>
                    <span className="currency-picker__group-count">{other.length}</span>
                  </p>
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
