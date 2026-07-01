import Flag from "./Flag";
import Icon from "./Icon";

export default function CompareItem({
  code,
  name,
  value,
  rate,
  state = "default",
  favorited = false,
}) {
  // states: default | hover | active
  const hover = state === "hover";
  return (
    <div className={`compare-item compare-item--${state}`}>
      <Flag code={code} size={24} />
      <div className="compare-item__main">
        <span className="compare-item__code">{code}</span>
        <span className="compare-item__name">{name}</span>
      </div>
      <div className="compare-item__values">
        <span className="compare-item__value">{value}</span>
        <span className="compare-item__rate">@ {rate}</span>
      </div>
      <button
        type="button"
        className={`icon-btn icon-btn--delete${hover ? " icon-btn--hover" : ""}`}
        aria-label="Favorite"
      >
        <Icon
          name={favorited ? "starFilled" : "starOutline"}
          width={16}
          height={15}
          color={favorited ? "var(--lime-500)" : "var(--neutral-50)"}
        />
      </button>
    </div>
  );
}
