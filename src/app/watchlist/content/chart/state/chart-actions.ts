import { ChartDataInterface } from './chart-state';
import { CoreApiErrorInterface, PayloadAction } from '../../../../shared/core/state/api-state';

export class ChartActions {
  static CHANGE_POINT = 'WATCHLIST:CHART:CHANGE_POINT';
  static CHANGE_RANGE = 'WATCHLIST:CHART:CHANGE_RANGE';
  static FETCH_FULFILLED = 'WATCHLIST:CHART:FETCH_FULFILLED';
  static FETCH_LOADER = 'WATCHLIST:CHART:FETCH_LOADER';
  static FETCH_ERROR = 'WATCHLIST:CHART:FETCH_ERROR';

  changePoint(point: ChartDataInterface): PayloadAction {
    return {
      type: ChartActions.CHANGE_POINT,
      payload: point
    };
  }

  changeRange(range: string): PayloadAction {
    return {
      type: ChartActions.CHANGE_RANGE,
      payload: range
    };
  }

  fetchFulfilled(data: ChartDataInterface[]): PayloadAction {
    return {
      type: ChartActions.FETCH_FULFILLED,
      payload: data
    };
  }

  fetchLoader(loader: boolean): PayloadAction {
    return {
      type: ChartActions.FETCH_LOADER,
      payload: loader
    };
  }

  fetchError(error: CoreApiErrorInterface): PayloadAction {
    return {
      type: ChartActions.FETCH_ERROR,
      payload: error
    };
  }
}
