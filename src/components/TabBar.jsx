import { useState } from "react";

const TABS = [
  { label: "HISTORY", count: 4 },
  { label: "COMPARE" },
  { label: "FAVORITES", count: 10 },
  { label: "LOG", count: 8 },
];

export default function TabBar() {
  const [active, setActive] = useState(0);
  return (
    <div className="tabbar">
      {TABS.map((t, i) => (
        <button
          key={t.label}
          type="button"
          className="tabbar__tab"
          onClick={() => setActive(i)}
        >
          <span className="tabbar__inner">
            <span className="tabbar__label">{t.label}</span>
            {t.count != null && <span className="tabbar__count">{t.count}</span>}
          </span>
          {active === i && <span className="tabbar__underline" />}
        </button>
      ))}
    </div>
  );
}
