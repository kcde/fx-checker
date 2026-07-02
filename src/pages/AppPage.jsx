import { useCallback, useEffect, useRef, useState } from 'react';
import useRates from '../hooks/useRates';
import useMarketTicker from '../hooks/useMarketTicker';
import useCurrencies from '../hooks/useCurrencies';
import { useFxState, useFxDispatch } from '../state/useFx';
import { convert, formatAmount, formatRate } from '../utils/format';
import CurrencySelect from '../components/CurrencySelect';
import ExchangeButton from '../components/ExchangeButton';
import FavoriteButton from '../components/FavoriteButton';
import LogConversionButton from '../components/LogConversionButton';
import HistoryPanel from '../components/HistoryPanel';
import ComparePanel from '../components/ComparePanel';
import FavoritesPanel from '../components/FavoritesPanel';
import LogPanel from '../components/LogPanel';
import MobileTabSelect from '../components/MobileTabSelect';
import StateNotice from '../components/StateNotice';
import Icon from '../components/Icon';
import './app.css';

const TICKER_QUOTES = [
  'EUR','GBP','JPY','AUD','CAD','CHF','CNY','HKD',
  'SGD','NZD','MXN','BRL','INR','KRW','SEK','TRY',
  'NOK','DKK','PLN',
];

export default function AppPage() {
  const { base, quote, amount, activeTab, favorites, log } = useFxState();
  const dispatch = useFxDispatch();

  const { items: tickerData, loading } = useMarketTicker('USD', TICKER_QUOTES);
  // separate call for the active pair; fetchCached dedupes when base is USD
  const { rates: pairRates, error: pairError } = useRates(base, [quote]);
  const { currencies, loading: currenciesLoading, error: currenciesError } = useCurrencies();

  const pairRate = pairRates?.[quote] ?? null;
  const converted = convert(parseFloat(amount), pairRate);
  // history reflects the user's activity: no live conversion, no chart
  const hasConversion = parseFloat(amount) > 0;

  const isFavorited = favorites.some((f) => f.base === base && f.quote === quote);
  const canLog = pairRate != null && parseFloat(amount) > 0;

  // transient "Logged ✓" confirmation on the log button
  const [logged, setLogged] = useState(false);
  const loggedTimer = useRef(null);
  useEffect(() => () => clearTimeout(loggedTimer.current), []);

  // polite screen-reader announcement for discrete actions (pin / log)
  const [announce, setAnnounce] = useState('');

  const handleLog = useCallback(() => {
    if (!canLog) return;
    dispatch({
      type: 'ADD_LOG',
      entry: {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        base,
        quote,
        sendAmount: parseFloat(amount),
        receiveAmount: converted,
        rate: pairRate,
      },
    });
    setLogged(true);
    setAnnounce(`Conversion logged: ${amount} ${base} to ${quote}`);
    clearTimeout(loggedTimer.current);
    loggedTimer.current = setTimeout(() => setLogged(false), 1500);
  }, [canLog, dispatch, base, quote, amount, converted, pairRate]);

  const handleToggleFavorite = useCallback(() => {
    setAnnounce(
      isFavorited
        ? `${base} to ${quote} removed from favorites`
        : `${base} to ${quote} pinned to favorites`,
    );
    dispatch({ type: 'TOGGLE_FAVORITE', base, quote });
  }, [dispatch, isFavorited, base, quote]);

  const tickerItems = tickerData.map((it) => {
    const up = it.direction === 'up';
    return {
      pair: `USD/${it.quote}`,
      rate: it.rate != null ? formatRate(it.rate) : '—',
      up,
      change: `${up ? '+' : ''}${it.pct.toFixed(2)}%`,
    };
  });

  const doubled = [...tickerItems, ...tickerItems];

  const currencyCount = Object.keys(currencies ?? {}).length;
  const navMeta = currencyCount
    ? `${currencyCount} CURRENCIES · EOD · ECB DATA`
    : 'EOD · ECB DATA';

  return (
    <div className="app">

      {/* ─── Navbar ─── */}
      <header className="app-nav">
        <div className="app-nav__top">
          <div className="app-nav__brand">
            <Icon name="logo" size={20} color="var(--lime-500)" />
            <span className="app-nav__wordmark">FX_CHECKER</span>
          </div>
          <span className="app-nav__meta">{navMeta}</span>
        </div>
        <div className="app-nav__markets">
          <span className="app-nav__live">
            <span className="app-nav__dot" /> LIVE MARKETS
          </span>
          <div className="app-nav__ticker-wrap">
            <div className={`app-nav__ticker${loading ? ' app-nav__ticker--paused' : ''}`}>
              {doubled.map((item, i) => (
                <div key={i} className="ticker-chip">
                  <span className="ticker-chip__pair">{item.pair}</span>
                  <span className="ticker-chip__rate">{item.rate}</span>
                  <span className={`ticker-chip__change--${item.up ? 'up' : 'down'}`}>
                    {item.up ? '▲' : '▼'} {item.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {currenciesError && (
        <div className="app-offline" role="alert">
          Couldn&apos;t reach the rates service — showing what&apos;s available.
        </div>
      )}

      {/* live regions: settled conversion result + discrete action confirmations */}
      <span className="sr-only" aria-live="polite">
        {converted != null ? `${amount} ${base} equals ${formatAmount(converted)} ${quote}` : ''}
      </span>
      <div className="sr-only" role="status" aria-live="polite">{announce}</div>

      <div className="app-body">

      {/* ─── Converter ─── */}
      <section className="converter">
        <div className="converter__inner">
          <p className="converter__heading">CHECK THE RATE</p>
          <div className="conv-group">
            <div className="conv-group__top">
              <div className="converter__row">

                {/* SEND */}
                <div className="conv-card">
                  <span className="conv-card__label">SEND</span>
                  <div className="conv-card__bottom">
                    <input
                      className="conv-card__input"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      value={amount}
                      onChange={(e) => dispatch({ type: 'SET_AMOUNT', amount: e.target.value })}
                    />
                    <CurrencySelect
                      code={base}
                      currencies={currencies}
                      loading={currenciesLoading}
                      onSelect={(c) => dispatch({ type: 'SET_BASE', code: c })}
                      label="Send currency"
                    />
                  </div>
                </div>

                <ExchangeButton onClick={() => dispatch({ type: 'SWAP' })} />

                {/* RECEIVE */}
                <div className="conv-card">
                  <span className="conv-card__label">RECEIVE</span>
                  <div className="conv-card__bottom">
                    <input
                      className="conv-card__input conv-card__input--result"
                      type="text"
                      placeholder="0.00"
                      readOnly
                      value={converted != null ? formatAmount(converted) : ''}
                    />
                    <CurrencySelect
                      code={quote}
                      currencies={currencies}
                      loading={currenciesLoading}
                      onSelect={(c) => dispatch({ type: 'SET_QUOTE', code: c })}
                      label="Receive currency"
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="conv-divider" />

            {/* Rate row */}
            <div className="converter__rate-row">
              <div className="converter__rate-info">
                <span className="converter__rate-label">
                  {pairError
                    ? 'RATE UNAVAILABLE'
                    : pairRate != null
                      ? `1 ${base} = ${formatRate(pairRate)} ${quote}`
                      : '—'}
                </span>
              </div>
              <div className="converter__actions">
                <FavoriteButton
                  active={isFavorited}
                  onClick={handleToggleFavorite}
                />
                <LogConversionButton
                  state={logged ? 'pressed' : 'default'}
                  disabled={!canLog}
                  onClick={handleLog}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tab bar ─── */}
      <div className="app-tabbar">
        <AppTabBar
          activeTab={activeTab}
          favoritesCount={favorites.length}
          logCount={log.length}
          onSelect={(tab) => dispatch({ type: 'SET_TAB', tab })}
        />
        <div className="app-tabbar__mobile">
          <MobileTabSelect
            tabs={TABS}
            activeTab={activeTab}
            counts={{ favorites: favorites.length, log: log.length }}
            onSelect={(tab) => dispatch({ type: 'SET_TAB', tab })}
          />
        </div>
      </div>

      {/* ─── Tab panels ─── */}
      <div
        className="tab-content"
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTab === 'history' && (
          hasConversion ? (
            <HistoryPanel />
          ) : (
            <TabEmptyState
              icon="exchange"
              title="NO CONVERSION YET"
              desc="Enter an amount above to check a rate — its history will show here."
            />
          )
        )}
        {activeTab === 'compare' && <ComparePanel />}
        {activeTab === 'favorites' && (
          favorites.length ? (
            <FavoritesPanel />
          ) : (
            <TabEmptyState
              title="NO FAVORITES YET"
              desc="Pin a currency pair with the FAVORITE button to track it here."
            />
          )
        )}
        {activeTab === 'log' && (
          log.length ? (
            <LogPanel />
          ) : (
            <TabEmptyState
              title="NO CONVERSIONS YET"
              desc="Enter an amount above and press LOG CONVERSION to save it here."
            />
          )
        )}
      </div>

      </div> {/* end app-body */}
    </div>
  );
}

const TABS = [
  { id: 'history', label: 'HISTORY' },
  { id: 'compare', label: 'COMPARE' },
  { id: 'favorites', label: 'FAVORITES' },
  { id: 'log', label: 'LOG' },
];

function AppTabBar({ activeTab, favoritesCount, logCount, onSelect }) {
  const counts = { favorites: favoritesCount, log: logCount };

  // Manual-activation tabs (WAI-ARIA): arrows only MOVE focus; the panel switches
  // when the user presses Enter/Space (native button onClick). This avoids kicking
  // off each panel's data fetch just by arrowing past it.
  const onKeyDown = (e) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const focusedId = document.activeElement?.id?.startsWith('tab-')
      ? document.activeElement.id.slice(4)
      : activeTab;
    const from = TABS.findIndex((t) => t.id === focusedId);
    let next;
    if (e.key === 'ArrowRight') next = (from + 1) % TABS.length;
    else if (e.key === 'ArrowLeft') next = (from - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') next = 0;
    else next = TABS.length - 1;
    document.getElementById(`tab-${TABS[next].id}`)?.focus();
  };

  return (
    <div className="tabbar" role="tablist" onKeyDown={onKeyDown}>
      {TABS.map((t) => {
        const selected = activeTab === t.id;
        return (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            type="button"
            className="tabbar__tab"
            role="tab"
            aria-selected={selected}
            aria-controls={`panel-${t.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(t.id)}
          >
            <span className="tabbar__inner">
              <span className="tabbar__label">{t.label}</span>
              {counts[t.id] != null && <span className="tabbar__count">{counts[t.id]}</span>}
            </span>
            {selected && <span className="tabbar__underline" />}
          </button>
        );
      })}
    </div>
  );
}

function TabEmptyState({ title, desc, icon = 'trash' }) {
  return <StateNotice tone="empty" title={title} desc={desc} icon={icon} />;
}
