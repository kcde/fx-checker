import { useEffect, useRef, useState } from 'react';
import CurrencyButton from './CurrencyButton';
import CurrencyPicker from './CurrencyPicker';

export default function CurrencySelect({ code, onSelect, currencies, loading, label }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // close on outside click or Escape while open
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e) {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  function handleSelect(next) {
    onSelect(next);
    setOpen(false);
  }

  return (
    <div className="currency-select" ref={containerRef}>
      <CurrencyButton
        code={code}
        open={open}
        onClick={() => setOpen((v) => !v)}
        label={label}
      />
      {open && (
        <CurrencyPicker
          currencies={currencies}
          selected={code}
          onSelect={handleSelect}
          loading={loading}
        />
      )}
    </div>
  );
}
