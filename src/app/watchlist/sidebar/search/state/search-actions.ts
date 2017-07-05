import {Action} from '@ngrx/store';
import {CoreApiErrorInterface} from '../../../../shared/core/state/api-state';

export class SearchActions {
  static FETCH_FULFILLED = 'WATCHLIST:SEARCH:FETCH_FULFILLED';
  static FETCH_LOADER = 'WATCHLIST:SEARCH:FETCH_LOADER';
  static FETCH_ERROR = 'WATCHLIST:SEARCH:FETCH_ERROR';

  fetchFulfilled(data: any[]): Action {
    return {
      type: SearchActions.FETCH_FULFILLED,
      payload: data
    };
  }

  fetchLoader(loader: boolean): Action {
    return {
      type: SearchActions.FETCH_LOADER,
      payload: loader
    };
  }

  fetchError(error: CoreApiErrorInterface): Action {
    return {
      type: SearchActions.FETCH_ERROR,
      payload: error
    };
  }
}
