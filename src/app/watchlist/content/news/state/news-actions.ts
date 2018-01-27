import { CoreApiErrorInterface, PayloadAction } from '../../../../shared/core/state/api-state';
import { NewsDataInterface } from './news-state';

export class NewsActions {
  static FETCH_FULFILLED = 'WATCHLIST:NEWS:FETCH_FULFILLED';
  static FETCH_LOADER = 'WATCHLIST:NEWS:FETCH_LOADER';
  static FETCH_ERROR = 'WATCHLIST:NEWS:FETCH_ERROR';

  fetchFulfilled(data: NewsDataInterface[]): PayloadAction {
    return {
      type: NewsActions.FETCH_FULFILLED,
      payload: data
    };
  }

  fetchLoader(loader: boolean): PayloadAction {
    return {
      type: NewsActions.FETCH_LOADER,
      payload: loader
    };
  }

  fetchError(error: CoreApiErrorInterface): PayloadAction {
    return {
      type: NewsActions.FETCH_ERROR,
      payload: error
    };
  }
}
