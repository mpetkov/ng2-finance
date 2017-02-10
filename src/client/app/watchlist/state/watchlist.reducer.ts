import { ActionReducer, Action } from '@ngrx/store';
import { WatchlistInitialState } from './watchlist.state';
import {
  WatchlistActions,
  WatchlistStateKeys,
  WatchlistStateInterface
} from './index';

const initialState:WatchlistStateInterface = new WatchlistInitialState() as WatchlistStateInterface;

export const watchlistReducer:ActionReducer<WatchlistStateInterface> = (state:WatchlistStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case WatchlistActions.CHANGE_STOCK:
      return state.set(WatchlistStateKeys.Stock, action.payload);
    case WatchlistActions.CHANGE_STOCK_DATA:
      return state.set(WatchlistStateKeys.StockData, action.payload);
    default:
      return state;
  }
};
