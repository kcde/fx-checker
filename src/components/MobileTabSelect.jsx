import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

/* Mobile replacement for the horizontal tab bar: a button showing the active tab
   that opens a dropdown of all tabs. Escape + click-outside close it. */
export default function MobileTabSelect({ tabs, activeTab, counts = {}, onSelect }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

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
        <div className="mobile-tabs__menu" role="listbox">
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
