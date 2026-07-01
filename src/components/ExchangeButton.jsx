import Icon from "./Icon";

export default function ExchangeButton({ state = "default" }) {
  // states: default | hover | focus
  return (
    <button
      type="button"
      className={`icon-btn icon-btn--exchange icon-btn--${state}`}
      aria-label="Swap currencies"
    >
      <Icon name="exchange" width={18} height={20} color="var(--neutral-50)" />
    </button>
  );
}
