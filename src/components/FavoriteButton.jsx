import Icon from "./Icon";

export default function FavoriteButton({ state = "default" }) {
  // states: default | active | icon
  if (state === "icon") {
    return (
      <button type="button" className="fav-btn fav-btn--icon" aria-label="Favorite">
        <Icon name="starOutline" size={16} color="var(--neutral-50)" />
      </button>
    );
  }
  const active = state === "active";
  return (
    <button type="button" className="fav-btn">
      <Icon
        name={active ? "starFilled" : "starOutline"}
        size={16}
        color={active ? "var(--lime-500)" : "var(--neutral-200)"}
      />
      <span>{active ? "FAVORITED" : "FAVORITE"}</span>
    </button>
  );
}
