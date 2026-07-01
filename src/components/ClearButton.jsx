export default function ClearButton({ state = "default", label = "CLEAR ALL" }) {
  // states: default | hover | focus
  return (
    <button type="button" className={`clear-btn clear-btn--${state}`}>
      {label}
    </button>
  );
}
