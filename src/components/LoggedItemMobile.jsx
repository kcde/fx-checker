import Icon from "./Icon";

export default function LoggedItemMobile({ time, base, quote, from, to }) {
  return (
    <div className="logged-item-m">
      <div className="logged-item-m__info">
        <span className="logged-item-m__time">{time}</span>
        <div className="logged-item-m__pair">
          <span className="logged-item-m__code">{base}</span>
          <Icon name="arrowRight" width={10} height={10} color="var(--neutral-200)" />
          <span className="logged-item-m__code">{quote}</span>
        </div>
      </div>
      <div className="logged-item-m__amounts">
        <span className="logged-item__from">{from}</span>
        <span className="logged-item__to">{to}</span>
      </div>
      <button type="button" className="icon-btn icon-btn--delete" aria-label="Delete">
        <Icon name="trash" width={14} height={16} color="var(--neutral-50)" />
      </button>
    </div>
  );
}
