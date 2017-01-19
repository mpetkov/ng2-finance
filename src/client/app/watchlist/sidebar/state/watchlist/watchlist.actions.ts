import { Action } from '@ngrx/store';

export class WatchlistActions {
  static FETCH_STOCKS_FULFILLED = 'WATCHLIST:FETCH_STOCKS_FULFILLED';
  static DELETE_STOCK = 'WATCHLIST:DELETE_STOCK';

  static fetchStocksFulfilled(payload:any):Action {
    return {
      type: this.FETCH_STOCKS_FULFILLED,
      payload: payload
    };
  }

  static deleteStock(payload:string):Action {
    return {
      type: this.DELETE_STOCK,
      payload: payload
    };
  }
}
