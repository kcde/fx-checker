import Icon from "./Icon";

export default function SearchInput({ state = "default", value }) {
  // states: default | active
  const active = state === "active";
  const text = value ?? (active ? "Euro" : "Search currencies...");
  return (
    <div className={`search-input search-input--${state}`}>
      <Icon
        name="search"
        size={14}
        color={active ? "var(--neutral-50)" : "var(--neutral-100)"}
      />
      <span className="search-input__text">{text}</span>
    </div>
  );
}
