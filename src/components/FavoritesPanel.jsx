import { useFxState, useFxDispatch } from '../state/useFx';
import useFavoriteRates from '../hooks/useFavoriteRates';
import { formatRate } from '../utils/format';
import FavoritesItem from './FavoritesItem';
import StateNotice from './StateNotice';

export default function FavoritesPanel() {
  const { favorites } = useFxState();
  const dispatch = useFxDispatch();
  const { rateMap, error } = useFavoriteRates(favorites);

  return (
    <div className="favorites-panel">
      <div className="favorites-panel__header">
        <span className="favorites-panel__title">PINNED PAIRS</span>
        <span className="favorites-panel__count">{favorites.length} FAVORITES</span>
      </div>

      {error && (
        <StateNotice tone="error" title="LIVE RATES UNAVAILABLE" />
      )}

      <div className="favorites-panel__list">
        {favorites.map((f) => {
          const r = rateMap[`${f.base}/${f.quote}`];
          return (
            <FavoritesItem
              key={`${f.base}/${f.quote}`}
              base={f.base}
              quote={f.quote}
              rate={r ? formatRate(r.rate) : '—'}
              change={r ? `${r.pct >= 0 ? '+' : ''}${r.pct.toFixed(2)}%` : '—'}
              direction={r ? r.direction : 'up'}
              onSelect={() => dispatch({ type: 'SET_PAIR', base: f.base, quote: f.quote })}
              onUnpin={() => dispatch({ type: 'TOGGLE_FAVORITE', base: f.base, quote: f.quote })}
            />
          );
        })}
      </div>
    </div>
  );
}
