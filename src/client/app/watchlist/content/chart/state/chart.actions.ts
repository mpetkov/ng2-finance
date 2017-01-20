import { Action } from '@ngrx/store';

export class ChartActions {
  static FETCH_CHART_FULFILLED = 'WATCHLIST:FETCH_CHART_FULFILLED';
  static CHANGE_SELECTED_POINT = 'WATCHLIST:CHANGE_CHART_SELECTED_POINT';

  static fetchChartFulfilled(payload:any):Action {
    return {
      type: this.FETCH_CHART_FULFILLED,
      payload: payload
    };
  }

  static changeSelectedPoint(payload:any):Action {
    return {
      type: this.CHANGE_SELECTED_POINT,
      payload: payload
    };
  }
}
