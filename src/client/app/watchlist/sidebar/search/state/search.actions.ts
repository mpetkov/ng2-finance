import { Action } from '@ngrx/store';

export class SearchActions {
  static FETCH_FULFILLED = 'WATCHLIST:SEARCH:FETCH_FULFILLED';

  static fetchFulfilled(data:any[]):Action {
    return {
      type: this.FETCH_FULFILLED,
      payload: data
    };
  }
}
