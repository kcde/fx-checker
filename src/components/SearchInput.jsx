import Icon from "./Icon";

export default function SearchInput({
  state = "default",
  value,
  onChange,
  placeholder = "Search currencies...",
  inputRef,
}) {
  // states: default | active. `value`/`onChange` make it a real controlled input;
  // `state` is kept for the design-system gallery (renders an empty input).
  const active = state === "active";
  return (
    <div className={`search-input search-input--${state}`}>
      <Icon
        name="search"
        size={14}
        color={active ? "var(--neutral-50)" : "var(--neutral-100)"}
      />
      <input
        ref={inputRef}
        type="text"
        className="search-input__field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
