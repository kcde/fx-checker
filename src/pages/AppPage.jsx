import useRates from '../hooks/useRates';
import CurrencyButton from '../components/CurrencyButton';
import ExchangeButton from '../components/ExchangeButton';
import FavoriteButton from '../components/FavoriteButton';
import LogConversionButton from '../components/LogConversionButton';
import Icon from '../components/Icon';
import './app.css';

const TICKER_QUOTES = [
  'EUR','GBP','JPY','AUD','CAD','CHF','CNY','HKD',
  'SGD','NZD','MXN','BRL','INR','KRW','SEK','TRY',
  'NOK','DKK','PLN',
];

function formatRate(val) {
  if (val == null) return '—';
  return val < 10 ? val.toFixed(4) : val.toFixed(2);
}

export default function AppPage() {
  const { rates, loading } = useRates('USD', TICKER_QUOTES);

  const tickerItems = TICKER_QUOTES.map((quote) => ({
    pair: `USD/${quote}`,
    rate: rates ? formatRate(rates[quote]) : '—',
    up: true,
  }));

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
                  {item.up ? '▲' : '▼'}
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
                    />
                    <CurrencyButton code="USD" />
                  </div>
                </div>

                <ExchangeButton />

                {/* RECEIVE */}
                <div className="conv-card">
                  <span className="conv-card__label">RECEIVE</span>
                  <div className="conv-card__bottom">
                    <input
                      className="conv-card__input conv-card__input--result"
                      type="number"
                      placeholder="0.00"
                      readOnly
                    />
                    <CurrencyButton code="EUR" />
                  </div>
                </div>

              </div>
            </div>

            <div className="conv-divider" />

            {/* Rate row */}
            <div className="converter__rate-row">
              <div className="converter__rate-info">
                <span className="converter__rate-label">
                  {rates?.EUR ? `1 USD = ${formatRate(rates.EUR)} EUR` : '—'}
                </span>
              </div>
              <div className="converter__actions">
                <FavoriteButton />
                <LogConversionButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tab bar ─── */}
      <div className="app-tabbar">
        <AppTabBar />
        <div className="app-tabbar__mobile">
          <div className="mobile-selector">
            <span className="mobile-selector__label">HISTORY</span>
            <Icon name="chevronDown" size={12} color="var(--neutral-200)" />
          </div>
        </div>
      </div>

      {/* ─── History (default) ─── */}
      <div className="tab-content">
        <div className="history-header">
          <span className="history-header__count">0 CONVERSIONS</span>
          <button type="button" className="history-header__clear">CLEAR ALL</button>
        </div>
        <div className="empty-state">
          <div className="empty-state__icon-box">
            <Icon name="trash" size={13} color="var(--neutral-200)" style={{ opacity: 0.4 }} />
          </div>
          <div className="empty-state__text">
            <span className="empty-state__title">NO CONVERSIONS YET</span>
            <span className="empty-state__desc">
              Enter an amount above and press LOG CONVERSION to save it here.
            </span>
          </div>
        </div>
      </div>

      </div> {/* end app-body */}
    </div>
  );
}

function AppTabBar() {
  const tabs = [
    { label: 'HISTORY', count: 0 },
    { label: 'COMPARE' },
    { label: 'FAVORITES', count: 0 },
    { label: 'LOG', count: 0 },
  ];
  return (
    <div className="tabbar">
      {tabs.map((t, i) => (
        <button key={t.label} type="button" className="tabbar__tab">
          <span className="tabbar__inner">
            <span className="tabbar__label">{t.label}</span>
            {t.count != null && <span className="tabbar__count">{t.count}</span>}
          </span>
          {i === 0 && <span className="tabbar__underline" />}
        </button>
      ))}
    </div>
  );
}
