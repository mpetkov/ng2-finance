import {Action} from '@ngrx/store';
import {CoreApiErrorInterface} from '../../../../shared/core/state/api-state';
import {NewsDataInterface} from './news-state';

export class NewsActions {
  static FETCH_FULFILLED = 'WATCHLIST:NEWS:FETCH_FULFILLED';
  static FETCH_LOADER = 'WATCHLIST:NEWS:FETCH_LOADER';
  static FETCH_ERROR = 'WATCHLIST:NEWS:FETCH_ERROR';

  fetchFulfilled(data: NewsDataInterface[]): Action {
    return {
      type: NewsActions.FETCH_FULFILLED,
      payload: data
    };
  }

  fetchLoader(loader: boolean): Action {
    return {
      type: NewsActions.FETCH_LOADER,
      payload: loader
    };
  }

  fetchError(error: CoreApiErrorInterface): Action {
    return {
      type: NewsActions.FETCH_ERROR,
      payload: error
    };
  }
}
