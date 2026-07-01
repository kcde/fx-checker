import Icon from "./Icon";

const LINKS = [
  { id: "design", label: "Design System", href: "#/" },
  { id: "components", label: "Components", href: "#/components" },
];

export default function TopBar({ current = "design" }) {
  return (
    <header className="topbar">
      <a className="topbar__brand" href="#/" style={{ textDecoration: "none" }}>
        <Icon name="logo" size={26} color="var(--lime-500)" />
        <span className="topbar__wordmark">FX_CHECKER</span>
      </a>
      <nav className="topbar__nav">
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={l.href}
            className={`topbar__link${current === l.id ? " topbar__link--active" : ""}`}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
