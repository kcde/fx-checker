import Flag from "./Flag";
import Icon from "./Icon";

export default function CurrencyButton({ state = "default", code = "USD" }) {
  // states: default | hover | focus
  return (
    <button type="button" className={`currency-btn currency-btn--${state}`}>
      <Flag code={code} size={20} />
      <span>{code}</span>
      <Icon name="chevronDown" size={12} color="var(--neutral-50)" />
    </button>
  );
}
