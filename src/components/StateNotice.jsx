import Icon from './Icon';

/* Two friendly non-data states:
   - tone="empty" (default): the boxed icon + title + desc empty state.
   - tone="error": a compact inline notice (mirrors the chart's error text) for a
     panel whose data failed to load. */
export default function StateNotice({ title, desc, icon = 'trash', tone = 'empty' }) {
  if (tone === 'error') {
    return (
      <div className="panel-notice">
        <span className="panel-notice__title">{title}</span>
        {desc && <span className="panel-notice__desc">{desc}</span>}
      </div>
    );
  }
  return (
    <div className="empty-state">
      <div className="empty-state__icon-box">
        <Icon name={icon} size={13} color="var(--neutral-200)" style={{ opacity: 0.4 }} />
      </div>
      <div className="empty-state__text">
        <span className="empty-state__title">{title}</span>
        <span className="empty-state__desc">{desc}</span>
      </div>
    </div>
  );
}
