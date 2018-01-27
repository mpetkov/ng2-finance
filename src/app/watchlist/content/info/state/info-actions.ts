import { InfoDataInterface } from './info-state';
import { CoreApiErrorInterface, PayloadAction } from '../../../../shared/core/state/api-state';

export class InfoActions {
  static FETCH_FULFILLED = 'WATCHLIST:INFO:FETCH_FULFILLED';
  static FETCH_LOADER = 'WATCHLIST:INFO:FETCH_LOADER';
  static FETCH_ERROR = 'WATCHLIST:INFO:FETCH_ERROR';

  fetchFulfilled(data: InfoDataInterface[]): PayloadAction {
    return {
      type: InfoActions.FETCH_FULFILLED,
      payload: data
    };
  }

  fetchLoader(loader: boolean): PayloadAction {
    return {
      type: InfoActions.FETCH_LOADER,
      payload: loader
    };
  }

  fetchError(error: CoreApiErrorInterface): PayloadAction {
    return {
      type: InfoActions.FETCH_ERROR,
      payload: error
    };
  }
}
