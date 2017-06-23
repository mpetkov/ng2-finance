import {Action, ActionReducer} from '@ngrx/store';
import {WatchlistInitialState, WatchlistStateInterface, WatchlistStateKeys} from './watchlist-state';
import {WatchlistActions} from './watchlist-actions';

const initialState: WatchlistStateInterface = new WatchlistInitialState() as WatchlistStateInterface;

export const watchlistReducer: ActionReducer<WatchlistStateInterface> =
  (state: WatchlistStateInterface = initialState, {payload, type}: Action) => {
    switch (type) {
      case WatchlistActions.CHANGE_STOCK:
        return state.set(WatchlistStateKeys.Stock, payload);
      case WatchlistActions.CHANGE_STOCK_DATA:
        return state.set(WatchlistStateKeys.StockData, payload);
      case WatchlistActions.DELETE_FAVORITES:
        return state.set(WatchlistStateKeys.Favorites, state.favorites.filter(
          (symbol: string) => payload.indexOf(symbol) === -1)
        );
      case WatchlistActions.ADD_FAVORITE:
        if (state.favorites.indexOf(payload) === -1) {
          return state.set(WatchlistStateKeys.Favorites, [payload, ...state.favorites]);
        } else {
          return state;
        }
      case WatchlistActions.CHANGE_HIGHLIGHTS:
        return state.set(WatchlistStateKeys.Highlights, payload);
      default:
        return state;
    }
  };
