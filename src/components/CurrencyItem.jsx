import Flag from "./Flag";
import Icon from "./Icon";

export default function CurrencyItem({ code, name, state = "default", selected = false, onClick }) {
  // states: default | hover. With `onClick` the row becomes a selectable
  // listbox option (button); without it, the static gallery div.
  const className = `currency-item${state === "hover" ? " currency-item--hover" : ""}${onClick ? " currency-item--btn" : ""}`;
  const content = (
    <>
      <Flag code={code} size={20} />
      <span className="currency-item__code">{code}</span>
      <span className="currency-item__name">{name}</span>
      {selected && <Icon name="check" width={12} height={10} color="var(--neutral-50)" />}
    </>
  );
  if (onClick) {
    return (
      <button type="button" role="option" aria-selected={selected} className={className} onClick={onClick}>
        {content}
      </button>
    );
  }
  return <div className={className}>{content}</div>;
}
