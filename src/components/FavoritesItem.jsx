import Icon from "./Icon";

export default function FavoritesItem({
  base,
  quote,
  rate,
  change,
  direction = "up",
  state = "default",
  onSelect,
  onUnpin,
}) {
  // states: default | hover
  const hover = state === "hover";
  const up = direction === "up";
  return (
    <div
      className={`fav-item fav-item--${state}`}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-label={onSelect ? `Load ${base} to ${quote} into the converter` : undefined}
      onClick={onSelect}
      onKeyDown={
        onSelect
          ? (e) => {
              // ignore keys bubbling up from the star button so its own
              // Enter/Space activation isn't hijacked by the row
              if (e.target !== e.currentTarget) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
    >
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
        className={`icon-btn icon-btn--delete icon-btn--favorited${hover ? " icon-btn--hover" : ""}`}
        aria-label="Unpin favorite"
        onClick={(e) => {
          e.stopPropagation();
          onUnpin?.();
        }}
      >
        <Icon name="starFilled" width={16} height={15} color="var(--lime-500)" />
      </button>
    </div>
  );
}
