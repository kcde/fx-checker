import { useFxState, useFxDispatch } from '../state/useFx';
import { formatAmount, formatLogTime } from '../utils/format';
import LoggedItem from './LoggedItem';
import LoggedItemMobile from './LoggedItemMobile';
import ClearButton from './ClearButton';

export default function LogPanel() {
  const { log } = useFxState();
  const dispatch = useFxDispatch();

  // shared per-entry props for the desktop + mobile row variants
  const rowProps = (e) => ({
    time: formatLogTime(e.timestamp),
    base: e.base,
    quote: e.quote,
    from: formatAmount(e.sendAmount),
    to: formatAmount(e.receiveAmount),
    onDelete: () => dispatch({ type: 'DELETE_LOG', id: e.id }),
  });

  return (
    <div className="log-panel">
      <div className="log-header">
        <span className="log-header__title">CONVERSION LOG</span>
        <div className="log-header__meta">
          <span className="log-header__count">{log.length} LOGGED</span>
          <ClearButton onClick={() => dispatch({ type: 'CLEAR_LOG' })} />
        </div>
      </div>

      <div className="log-list log-list--desktop">
        {log.map((e) => (
          <LoggedItem key={e.id} {...rowProps(e)} />
        ))}
      </div>
      <div className="log-list log-list--mobile">
        {log.map((e) => (
          <LoggedItemMobile key={e.id} {...rowProps(e)} />
        ))}
      </div>
    </div>
  );
}
