import {Action} from '@ngrx/store';
import {ChartDataInterface} from './chart-state';
import {CoreApiErrorInterface} from '../../../../shared/core/state/api-state';

export class ChartActions {
  static CHANGE_POINT = 'WATCHLIST:CHART:CHANGE_POINT';
  static CHANGE_RANGE = 'WATCHLIST:CHART:CHANGE_RANGE';
  static FETCH_FULFILLED = 'WATCHLIST:CHART:FETCH_FULFILLED';
  static FETCH_LOADER = 'WATCHLIST:CHART:FETCH_LOADER';
  static FETCH_ERROR = 'WATCHLIST:CHART:FETCH_ERROR';

  changePoint(point: ChartDataInterface): Action {
    return {
      type: ChartActions.CHANGE_POINT,
      payload: point
    };
  }

  changeRange(range: string): Action {
    return {
      type: ChartActions.CHANGE_RANGE,
      payload: range
    };
  }

  fetchFulfilled(data: ChartDataInterface[]): Action {
    return {
      type: ChartActions.FETCH_FULFILLED,
      payload: data
    };
  }

  fetchLoader(loader: boolean): Action {
    return {
      type: ChartActions.FETCH_LOADER,
      payload: loader
    };
  }

  fetchError(error: CoreApiErrorInterface): Action {
    return {
      type: ChartActions.FETCH_ERROR,
      payload: error
    };
  }
}
