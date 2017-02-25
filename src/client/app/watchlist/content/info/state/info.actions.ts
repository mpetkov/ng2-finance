import { Action } from '@ngrx/store';
import { ErrorInterface } from '../../../../core/index';
import { InfoDataInterface } from './index';

export class InfoActions {
  static FETCH_FULFILLED = 'WATCHLIST:INFO:FETCH_FULFILLED';
  static FETCH_LOADER = 'WATCHLIST:INFO:FETCH_LOADER';
  static FETCH_ERROR = 'WATCHLIST:INFO:FETCH_ERROR';

  fetchFulfilled(data:InfoDataInterface[]):Action {
    return {
      type: InfoActions.FETCH_FULFILLED,
      payload: data
    };
  }

  fetchLoader(loader:boolean):Action {
    return {
      type: InfoActions.FETCH_LOADER,
      payload: loader
    };
  }

  fetchError(error:ErrorInterface):Action {
    return {
      type: InfoActions.FETCH_ERROR,
      payload: error
    };
  }
}
