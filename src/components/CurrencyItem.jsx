import Flag from "./Flag";
import Icon from "./Icon";

export default function CurrencyItem({ code, name, state = "default", selected = false }) {
  // states: default | hover
  return (
    <div className={`currency-item${state === "hover" ? " currency-item--hover" : ""}`}>
      <Flag code={code} size={20} />
      <span className="currency-item__code">{code}</span>
      <span className="currency-item__name">{name}</span>
      {selected && <Icon name="check" width={12} height={10} color="var(--neutral-50)" />}
    </div>
  );
}
