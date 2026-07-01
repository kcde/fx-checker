import Icon from "./Icon";

export function MobileSelector({ label = "HISTORY" }) {
  return (
    <div className="mobile-selector">
      <span className="mobile-selector__label">{label}</span>
      <Icon name="chevronDown" width={12} height={8} color="var(--neutral-50)" />
    </div>
  );
}

export function MobileDropdownItem({ label = "HISTORY", count }) {
  return (
    <div className="mobile-dropdown-item">
      <span className="mobile-dropdown-item__label">{label}</span>
      {count != null && <span className="tab__count">{count}</span>}
    </div>
  );
}
