import { Action } from '@ngrx/store';

export class FavoritesActions {
  static FETCH_FULFILLED = 'WATCHLIST:FAVORITES:FETCH_FULFILLED';
  static DELETE = 'WATCHLIST:FAVORITES:DELETE';
  static ADD = 'WATCHLIST:FAVORITES:ADD';

  static fetchFulfilled(payload:any):Action {
    return {
      type: this.FETCH_FULFILLED,
      payload: payload
    };
  }

  static delete(payload:string[]):Action {
    return {
      type: this.DELETE,
      payload: payload
    };
  }

  static add(payload:string):Action {
    return {
      type: this.ADD,
      payload: payload
    };
  }
}
