import { Action } from '@ngrx/store';

export class FavoritesActions {
  static DELETE = 'WATCHLIST:FAVORITES:DELETE';
  static ADD = 'WATCHLIST:FAVORITES:ADD';
  static CHANGE_ORDER = 'WATCHLIST:FAVORITES:CHANGE_ORDER';
  static FETCH_FULFILLED = 'WATCHLIST:FAVORITES:FETCH_FULFILLED';
  static FETCH_LOADER = 'WATCHLIST:FAVORITES:FETCH_LOADER';
  static FETCH_ERROR = 'WATCHLIST:FAVORITES:FETCH_ERROR';

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

  static changeOrder(order:string[]):Action {
    return {
      type: this.CHANGE_ORDER,
      payload: order
    };
  }

  static fetchFulfilled(data:any[]):Action {
    return {
      type: this.FETCH_FULFILLED,
      payload: data
    };
  }

  static fetchLoader(loader:boolean):Action {
    return {
      type: this.FETCH_LOADER,
      payload: loader
    };
  }

  static fetchError(error:string):Action {
    return {
      type: this.FETCH_ERROR,
      payload: error
    };
  }
}
