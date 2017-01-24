import { Action } from '@ngrx/store';

export class FavoritesActions {
  static FETCH_FULFILLED = 'WATCHLIST:FAVORITES:FETCH_FULFILLED';
  static DELETE = 'WATCHLIST:FAVORITES:DELETE';
  static ADD = 'WATCHLIST:FAVORITES:ADD';

  static fetchFulfilled(data:any[]):Action {
    return {
      type: this.FETCH_FULFILLED,
      payload: data
    };
  }

  static delete(symbols:string[]):Action {
    return {
      type: this.DELETE,
      payload: symbols
    };
  }

  static add(symbol:string):Action {
    return {
      type: this.ADD,
      payload: symbol
    };
  }
}
