import Icon from "./Icon";

export default function LogConversionButton({ state = "default", label = "LOG CONVERSION", onClick, disabled = false }) {
  const pressed = state === "pressed";
  const isDisabled = disabled || state === "disabled";
  return (
    <button
      type="button"
      className={`log-btn log-btn--${state}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {pressed && <Icon name="check" size={12} color="var(--neutral-900)" />}
      <span>{pressed ? "Logged" : label}</span>
    </button>
  );
}
