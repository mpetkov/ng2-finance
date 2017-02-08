import { Action } from '@ngrx/store';
import { ErrorInterface } from '../../../../core/index';

export class InfoActions {
  static FETCH_FULFILLED = 'WATCHLIST:INFO:FETCH_FULFILLED';
  static FETCH_LOADER = 'WATCHLIST:INFO:FETCH_LOADER';
  static FETCH_ERROR = 'WATCHLIST:INFO:FETCH_ERROR';

  static fetchFulfilled(data:any[]):Action {
    return {
      type: this.FETCH_FULFILLED,
      payload: data
    };
  }

  static fetchLoader(loader:boolean):Action {
    return {
      type: this.FETCH_LOADER,
      payload: loader
    };
  }

  static fetchError(error:ErrorInterface):Action {
    return {
      type: this.FETCH_ERROR,
      payload: error
    };
  }
}
