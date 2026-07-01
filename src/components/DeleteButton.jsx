import Icon from "./Icon";

export default function DeleteButton({ state = "default" }) {
  // states: default | hover | focus
  return (
    <button
      type="button"
      className={`icon-btn icon-btn--delete icon-btn--${state}`}
      aria-label="Delete"
    >
      <Icon name="trash" width={14} height={16} color="var(--neutral-50)" />
    </button>
  );
}
