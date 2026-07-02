import Icon from "./Icon";

export default function FavoriteButton({ state = "default", active, onClick }) {
  // states: default | active | icon. `active`/`onClick` drive live behavior;
  // `state` is kept for the design-system gallery.
  if (state === "icon") {
    return (
      <button type="button" className="fav-btn fav-btn--icon" aria-label="Favorite">
        <Icon name="starOutline" size={16} color="var(--neutral-50)" />
      </button>
    );
  }
  const isActive = active ?? state === "active";
  return (
    <button type="button" className="fav-btn" onClick={onClick} aria-pressed={isActive}>
      <Icon
        name={isActive ? "starFilled" : "starOutline"}
        size={16}
        color={isActive ? "var(--lime-500)" : "var(--neutral-200)"}
      />
      <span>{isActive ? "FAVORITED" : "FAVORITE"}</span>
    </button>
  );
}
