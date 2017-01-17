import { ActionReducer, Action } from '@ngrx/store';
import { WatchlistStateInterface, WatchlistInitialState } from './watchlist.state';

export const initialState:WatchlistStateInterface = new WatchlistInitialState() as WatchlistStateInterface;

export const watchlistReducer: ActionReducer<WatchlistStateInterface>  = (state: WatchlistStateInterface = initialState, action: Action = null) => {
  switch (action.type) {
    default:
      return state;
  }
};
