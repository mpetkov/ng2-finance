import { Action } from '@ngrx/store';

export class ChartActions {
  static CHANGE_POINT = 'WATCHLIST:CHART:CHANGE_POINT';
  static CHANGE_RANGE = 'WATCHLIST:CHART:CHANGE_RANGE';
  static FETCH_FULFILLED = 'WATCHLIST:CHART:FETCH_FULFILLED';
  static FETCH_LOADER = 'WATCHLIST:CHART:FETCH_LOADER';
  static FETCH_ERROR = 'WATCHLIST:CHART:FETCH_ERROR';

  static changePoint(point:any):Action {
    return {
      type: this.CHANGE_POINT,
      payload: point
    };
  }

  static changeRange(range:string):Action {
    return {
      type: this.CHANGE_RANGE,
      payload: range
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
