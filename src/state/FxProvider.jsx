import { useReducer } from 'react';
import { fxReducer, initFxState, STORAGE_KEYS } from './fxReducer';
import { FxStateContext, FxDispatchContext } from './fxContext';
import { useSyncToLocalStorage } from '../hooks/useLocalStorage';

export default function FxProvider({ children }) {
  const [state, dispatch] = useReducer(fxReducer, undefined, initFxState);

  useSyncToLocalStorage(STORAGE_KEYS.favorites, state.favorites);
  useSyncToLocalStorage(STORAGE_KEYS.log, state.log);
  useSyncToLocalStorage(STORAGE_KEYS.tab, state.activeTab);

  return (
    <FxStateContext.Provider value={state}>
      <FxDispatchContext.Provider value={dispatch}>
        {children}
      </FxDispatchContext.Provider>
    </FxStateContext.Provider>
  );
}
