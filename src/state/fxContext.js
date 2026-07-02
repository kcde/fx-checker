import { createContext } from 'react';

/* State and dispatch live in separate contexts: components that only dispatch
   (buttons) subscribe to FxDispatchContext and never re-render on state changes
   (dispatch identity is stable across renders). */
export const FxStateContext = createContext(null);
export const FxDispatchContext = createContext(null);
