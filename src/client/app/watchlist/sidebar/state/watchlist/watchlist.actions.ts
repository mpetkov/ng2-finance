import { Action } from '@ngrx/store';

export class WatchlistActions {
  static FETCH_STOCKS_FULFILLED = 'WATCHLIST:FETCH_STOCKS_FULFILLED';
  static FETCH_STOCKS_SEARCH_FULFILLED = 'WATCHLIST:FETCH_STOCKS_SEARCH_FULFILLED';
  static DELETE_STOCK = 'WATCHLIST:DELETE_STOCK';
  static ADD_STOCK = 'WATCHLIST:ADD_STOCK';

  static fetchStocksFulfilled(payload:any):Action {
    return {
      type: this.FETCH_STOCKS_FULFILLED,
      payload: payload
    };
  }

  static fetchStocksSearchFulfilled(payload:any):Action {
    return {
      type: this.FETCH_STOCKS_SEARCH_FULFILLED,
      payload: payload
    };
  }

  static deleteStock(payload:string):Action {
    return {
      type: this.DELETE_STOCK,
      payload: payload
    };
  }

  static addStock(payload:string):Action {
    return {
      type: this.ADD_STOCK,
      payload: payload
    };
  }
}
