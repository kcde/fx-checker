import { useContext } from 'react';
import { FxStateContext, FxDispatchContext } from './fxContext';

export function useFxState() {
  const state = useContext(FxStateContext);
  if (state === null) throw new Error('useFxState must be used inside <FxProvider>');
  return state;
}

export function useFxDispatch() {
  const dispatch = useContext(FxDispatchContext);
  if (dispatch === null) throw new Error('useFxDispatch must be used inside <FxProvider>');
  return dispatch;
}
