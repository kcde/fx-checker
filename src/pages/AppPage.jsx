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
  const { rates: pairRates } = useRates(base, [quote]);
  const { currencies, loading: currenciesLoading } = useCurrencies();

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
    clearTimeout(loggedTimer.current);
    loggedTimer.current = setTimeout(() => setLogged(false), 1500);
  }, [canLog, dispatch, base, quote, amount, converted, pairRate]);

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

  return (
    <div className="app">

      {/* ─── Navbar ─── */}
      <header className="app-nav">
        <div className="app-nav__brand">
          <Icon name="logo" size={20} color="var(--lime-500)" />
          <span className="app-nav__wordmark">FX_CHECKER</span>
        </div>
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
      </header>

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
                  {pairRate != null ? `1 ${base} = ${formatRate(pairRate)} ${quote}` : '—'}
                </span>
              </div>
              <div className="converter__actions">
                <FavoriteButton
                  active={isFavorited}
                  onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', base, quote })}
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
          <div className="mobile-selector">
            <span className="mobile-selector__label">{activeTab.toUpperCase()}</span>
            <Icon name="chevronDown" size={12} color="var(--neutral-200)" />
          </div>
        </div>
      </div>

      {/* ─── Tab panels ─── */}
      <div className="tab-content">
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
        {activeTab === 'compare' && (
          <TabEmptyState
            title="COMPARE COMING SOON"
            desc="Compare your send amount across several currencies at once."
          />
        )}
        {activeTab === 'favorites' && (
          <TabEmptyState
            title="NO FAVORITES YET"
            desc="Pin a currency pair with the FAVORITE button to track it here."
          />
        )}
        {activeTab === 'log' && (
          <TabEmptyState
            title="NO CONVERSIONS YET"
            desc="Enter an amount above and press LOG CONVERSION to save it here."
          />
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
  return (
    <div className="tabbar" role="tablist">
      {TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          className="tabbar__tab"
          role="tab"
          aria-selected={activeTab === t.id}
          onClick={() => onSelect(t.id)}
        >
          <span className="tabbar__inner">
            <span className="tabbar__label">{t.label}</span>
            {counts[t.id] != null && <span className="tabbar__count">{counts[t.id]}</span>}
          </span>
          {activeTab === t.id && <span className="tabbar__underline" />}
        </button>
      ))}
    </div>
  );
}

function TabEmptyState({ title, desc, icon = 'trash' }) {
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
