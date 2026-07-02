import Icon from "./Icon";

export default function LoggedItem({ time, base, quote, from, to, state = "default", onDelete }) {
  // states: default | hover
  return (
    <div className={`logged-item logged-item--${state}`}>
      <span className="logged-item__time">{time}</span>
      <div className="logged-item__pair">
        <span className="logged-item__code">{base}</span>
        <Icon name="arrowRight" width={11} height={11} color="var(--neutral-200)" />
        <span className="logged-item__code">{quote}</span>
      </div>
      <div className="logged-item__amounts">
        <span className="logged-item__from">{from}</span>
        <span className="logged-item__to">{to}</span>
      </div>
      <button type="button" className="icon-btn icon-btn--delete" aria-label="Delete" onClick={onDelete}>
        <Icon name="trash" width={14} height={16} color="var(--neutral-50)" />
      </button>
    </div>
  );
}
