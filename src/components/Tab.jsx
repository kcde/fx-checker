export default function Tab({ state = "default", label = "HISTORY", count }) {
  // states: default | active | focus
  return (
    <button type="button" className={`tab tab--${state}`}>
      <span className="tab__inner">
        <span className="tab__label">{label}</span>
        {count != null && <span className="tab__count">{count}</span>}
      </span>
      {state === "active" && <span className="tab__underline" />}
    </button>
  );
}
