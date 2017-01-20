import { Action } from '@ngrx/store';

export class NewsActions {
  static FETCH_NEWS_FULFILLED = 'WATCHLIST:FETCH_NEWS_FULFILLED';

  static fetchNewsFulfilled(payload:any):Action {
    return {
      type: this.FETCH_NEWS_FULFILLED,
      payload: payload
    };
  }
}
