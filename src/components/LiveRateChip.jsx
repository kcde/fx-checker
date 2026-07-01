export default function LiveRateChip({ pair, rate, change, direction = "up" }) {
  const up = direction === "up";
  return (
    <div className="chip">
      <span className="chip__text">{pair}</span>
      <span className="chip__text">{rate}</span>
      <span className={`chip__change chip__change--${up ? "up" : "down"}`}>
        {up ? "▲" : "▼"} {change}
      </span>
    </div>
  );
}
