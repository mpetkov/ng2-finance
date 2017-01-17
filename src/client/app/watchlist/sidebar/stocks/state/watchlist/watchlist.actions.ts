import { Action } from '@ngrx/store';

export class WatchlistActions {
  static FETCH_STOCKS_FULFILLED = 'WATCHLIST:FETCH_STOCKS_FULFILLED';

  static fetchStocksFulfilled(payload:any):Action {
    return {
      type: this.FETCH_STOCKS_FULFILLED,
      payload: payload
    };
  }
}
