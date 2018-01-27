import { CoreApiErrorInterface, PayloadAction } from '../../../../shared/core/state/api-state';

export class SearchActions {
  static FETCH_FULFILLED = 'WATCHLIST:SEARCH:FETCH_FULFILLED';
  static FETCH_LOADER = 'WATCHLIST:SEARCH:FETCH_LOADER';
  static FETCH_ERROR = 'WATCHLIST:SEARCH:FETCH_ERROR';

  fetchFulfilled(data: any[]): PayloadAction {
    return {
      type: SearchActions.FETCH_FULFILLED,
      payload: data
    };
  }

  fetchLoader(loader: boolean): PayloadAction {
    return {
      type: SearchActions.FETCH_LOADER,
      payload: loader
    };
  }

  fetchError(error: CoreApiErrorInterface): PayloadAction {
    return {
      type: SearchActions.FETCH_ERROR,
      payload: error
    };
  }
}
