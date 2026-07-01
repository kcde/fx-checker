import Icon from "./Icon";

export default function Footer({ meta = "DESIGN SYSTEM · v1.0" }) {
  return (
    <footer className="footer">
      <div className="topbar__brand">
        <Icon name="logo" size={20} color="var(--lime-500)" />
        <span className="topbar__wordmark" style={{ fontSize: 14 }}>
          FX_CHECKER
        </span>
      </div>
      <span className="footer__meta">{meta}</span>
    </footer>
  );
}
