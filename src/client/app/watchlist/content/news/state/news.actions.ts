import { Action } from '@ngrx/store';

export class NewsActions {
  static FETCH_FULFILLED = 'WATCHLIST:NEWS:FETCH_FULFILLED';
  static FETCH_LOADER = 'WATCHLIST:NEWS:FETCH_LOADER';
  static FETCH_ERROR = 'WATCHLIST:NEWS:FETCH_ERROR';

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
