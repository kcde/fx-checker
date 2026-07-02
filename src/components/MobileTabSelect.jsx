import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

/* Mobile replacement for the horizontal tab bar: a button showing the active tab
   that opens a dropdown of all tabs. Escape + click-outside close it. */
export default function MobileTabSelect({ tabs, activeTab, counts = {}, onSelect }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    // move focus to the selected option when the menu opens
    menuRef.current?.querySelector('[aria-selected="true"]')?.focus();
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // roving focus over the option buttons
  const onMenuKeyDown = (e) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const opts = Array.from(menuRef.current?.querySelectorAll('[role="option"]') ?? []);
    if (opts.length === 0) return;
    e.preventDefault();
    const idx = opts.indexOf(document.activeElement);
    let next;
    if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = opts.length - 1;
    else if (e.key === 'ArrowDown') next = idx < 0 ? 0 : (idx + 1) % opts.length;
    else next = idx <= 0 ? opts.length - 1 : idx - 1;
    opts[next]?.focus();
  };

  const active = tabs.find((t) => t.id === activeTab);

  return (
    <div className="mobile-tabs" ref={containerRef}>
      <button
        type="button"
        className={`mobile-selector${open ? ' mobile-selector--open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="mobile-selector__label">{active?.label}</span>
        {counts[activeTab] != null && (
          <span className="tabbar__count">{counts[activeTab]}</span>
        )}
        <Icon name="chevronDown" size={12} color="var(--neutral-200)" />
      </button>

      {open && (
        <div className="mobile-tabs__menu" role="listbox" ref={menuRef} onKeyDown={onMenuKeyDown}>
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="option"
              aria-selected={t.id === activeTab}
              className={`mobile-tabs__option${t.id === activeTab ? ' mobile-tabs__option--active' : ''}`}
              onClick={() => { onSelect(t.id); setOpen(false); }}
            >
              <span>{t.label}</span>
              {counts[t.id] != null && <span className="tabbar__count">{counts[t.id]}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
