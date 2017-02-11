import { ActionReducer, Action } from '@ngrx/store';
import { WatchlistInitialState } from './watchlist.state';
import {
  WatchlistActions,
  WatchlistStateKeys,
  WatchlistStateInterface
} from './index';

const initialState:WatchlistStateInterface = new WatchlistInitialState() as WatchlistStateInterface;

export const watchlistReducer:ActionReducer<WatchlistStateInterface> =
  (state:WatchlistStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case WatchlistActions.CHANGE_STOCK:
      return state.set(WatchlistStateKeys.Stock, action.payload);
    case WatchlistActions.CHANGE_STOCK_DATA:
      return state.set(WatchlistStateKeys.StockData, action.payload);
    case WatchlistActions.DELETE_FAVORITES:
      return state.set(WatchlistStateKeys.Favorites, state.favorites.filter(
        (symbol:string) => action.payload.indexOf(symbol) === -1)
      );
    case WatchlistActions.ADD_FAVORITE:
      if(state.favorites.indexOf(action.payload) === -1) {
        return state.set(WatchlistStateKeys.Favorites, [action.payload, ...state.favorites]);
      } else {
        return state;
      }
    case WatchlistActions.CHANGE_HIGHLIGHTS:
      return state.set(WatchlistStateKeys.Highlights, action.payload);
    default:
      return state;
  }
};
