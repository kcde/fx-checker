import Icon from "./Icon";

export default function FavoritesItem({
  base,
  quote,
  rate,
  change,
  direction = "up",
  state = "default",
}) {
  // states: default | hover
  const hover = state === "hover";
  const up = direction === "up";
  return (
    <div className={`fav-item fav-item--${state}`}>
      <div className="fav-item__pair">
        <span className="fav-item__base">{base}</span>
        <Icon name="arrowRight" width={11} height={11} color="var(--neutral-200)" />
        <span className="fav-item__quote">{quote}</span>
      </div>
      <div className="fav-item__values">
        <span className="fav-item__rate">{rate}</span>
        <span className={`fav-item__change fav-item__change--${up ? "up" : "down"}`}>
          {up ? "▲" : "▼"} {change}
        </span>
      </div>
      <button
        type="button"
        className={`icon-btn icon-btn--delete${hover ? " icon-btn--hover" : ""}`}
        aria-label="Favorite"
      >
        <Icon name="starFilled" width={16} height={15} color="var(--lime-500)" />
      </button>
    </div>
  );
}
