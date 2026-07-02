export default function ClearButton({ state = "default", label = "CLEAR ALL", onClick }) {
  // states: default | hover | focus
  return (
    <button type="button" className={`clear-btn clear-btn--${state}`} onClick={onClick}>
      {label}
    </button>
  );
}
