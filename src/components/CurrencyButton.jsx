import Flag from "./Flag";
import Icon from "./Icon";

export default function CurrencyButton({ state = "default", code = "USD", onClick, open = false, label }) {
  // states: default | hover | focus. `onClick`/`open` drive the picker trigger.
  return (
    <button
      type="button"
      className={`currency-btn currency-btn--${state}${open ? " currency-btn--open" : ""}`}
      onClick={onClick}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-label={label}
    >
      <Flag code={code} size={20} />
      <span>{code}</span>
      <Icon name="chevronDown" size={12} color="var(--neutral-50)" />
    </button>
  );
}
