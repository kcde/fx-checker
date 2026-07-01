import Icon from "./Icon";

export default function LogConversionButton({ state = "default", label = "LOG CONVERSION" }) {
  const pressed = state === "pressed";
  return (
    <button
      type="button"
      className={`log-btn log-btn--${state}`}
      disabled={state === "disabled"}
    >
      {pressed && <Icon name="check" size={12} color="var(--neutral-900)" />}
      <span>{pressed ? "Logged" : label}</span>
    </button>
  );
}
