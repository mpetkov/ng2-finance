import {Action} from '@ngrx/store';
import {InfoDataInterface} from './info-state';
import {CoreApiErrorInterface} from '../../../../shared/core/state/api-state';

export class InfoActions {
  static FETCH_FULFILLED = 'WATCHLIST:INFO:FETCH_FULFILLED';
  static FETCH_LOADER = 'WATCHLIST:INFO:FETCH_LOADER';
  static FETCH_ERROR = 'WATCHLIST:INFO:FETCH_ERROR';

  fetchFulfilled(data: InfoDataInterface[]): Action {
    return {
      type: InfoActions.FETCH_FULFILLED,
      payload: data
    };
  }

  fetchLoader(loader: boolean): Action {
    return {
      type: InfoActions.FETCH_LOADER,
      payload: loader
    };
  }

  fetchError(error: CoreApiErrorInterface): Action {
    return {
      type: InfoActions.FETCH_ERROR,
      payload: error
    };
  }
}
