import { ActionReducer, Action } from '@ngrx/store';
import { WatchlistStateInterface, WatchlistInitialState } from './watchlist.state';
import { WatchlistActions } from './watchlist.actions';

const initialState:WatchlistStateInterface = new WatchlistInitialState() as WatchlistStateInterface;

export const watchlistReducer:ActionReducer<WatchlistStateInterface> =
  (state:WatchlistStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case WatchlistActions.FETCH_STOCKS_FULFILLED:
      return state.set('data', action.payload);
    case WatchlistActions.FETCH_STOCKS_SEARCH_FULFILLED:
      return state.set('search', action.payload);
    case WatchlistActions.DELETE_STOCKS:
      return state.set('symbols', state.symbols.filter(
        (symbol:string) => action.payload.indexOf(symbol) === -1)
      );
    case WatchlistActions.ADD_STOCK:
      return state.set('symbols', [action.payload, ...state.symbols]);
    default:
      return state;
  }
};
