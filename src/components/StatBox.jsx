export default function StatBox({ label, value, tone }) {
  const toneClass = tone ? ` stat-box__value--${tone}` : '';
  return (
    <div className="stat-box">
      <span className="stat-box__label">{label}</span>
      <span className={`stat-box__value${toneClass}`}>{value}</span>
    </div>
  );
}
