import { loadJSON } from '../hooks/useLocalStorage';

export const TABS = ['history', 'compare', 'favorites', 'log'];

export const STORAGE_KEYS = {
  favorites: 'fx:favorites',
  log: 'fx:log',
  tab: 'fx:tab',
};

export const initialState = {
  base: 'USD',
  quote: 'GBP',
  amount: '1',
  activeTab: 'history',
  favorites: [], // [{ base, quote }] — directional pairs
  log: [],       // [{ id, timestamp, base, quote, sendAmount, receiveAmount, rate }]
};

/* Lazy initializer for useReducer: runs once on mount, hydrating only the
   persisted slices. Amount and currencies always start fresh. */
export function initFxState() {
  const tab = loadJSON(STORAGE_KEYS.tab, initialState.activeTab);
  return {
    ...initialState,
    activeTab: TABS.includes(tab) ? tab : initialState.activeTab,
    favorites: loadJSON(STORAGE_KEYS.favorites, initialState.favorites),
    log: loadJSON(STORAGE_KEYS.log, initialState.log),
  };
}

function isSamePair(a, b) {
  return a.base === b.base && a.quote === b.quote;
}

export function fxReducer(state, action) {
  switch (action.type) {
    case 'SET_BASE':
      // picking the currency already on the other side swaps instead (no USD/USD)
      if (action.code === state.quote) {
        return { ...state, base: state.quote, quote: state.base };
      }
      return { ...state, base: action.code };

    case 'SET_QUOTE':
      if (action.code === state.base) {
        return { ...state, base: state.quote, quote: state.base };
      }
      return { ...state, quote: action.code };

    case 'SET_AMOUNT':
      // reject negatives; empty string stays allowed so the field can be cleared
      if (action.amount.startsWith('-')) return state;
      return { ...state, amount: action.amount };

    case 'SET_PAIR':
      // load both currencies at once (e.g. selecting a favorite) — no collision swap
      return { ...state, base: action.base, quote: action.quote };

    case 'SWAP':
      return { ...state, base: state.quote, quote: state.base };

    case 'SET_TAB':
      return { ...state, activeTab: action.tab };

    case 'TOGGLE_FAVORITE': {
      const pair = { base: action.base, quote: action.quote };
      const exists = state.favorites.some((f) => isSamePair(f, pair));
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((f) => !isSamePair(f, pair))
          : [...state.favorites, pair],
      };
    }

    case 'ADD_LOG':
      return { ...state, log: [action.entry, ...state.log] };

    case 'DELETE_LOG':
      return { ...state, log: state.log.filter((e) => e.id !== action.id) };

    case 'CLEAR_LOG':
      return { ...state, log: [] };

    default:
      return state;
  }
}
