import { Action } from '@ngrx/store';
import { ErrorInterface } from '../../../../core/index';

export class FavoritesActions {
  static CHANGE_ORDER = 'WATCHLIST:FAVORITES:CHANGE_ORDER';
  static SORT_DATA = 'WATCHLIST:FAVORITES:SORT_DATA';
  static FETCH_FULFILLED = 'WATCHLIST:FAVORITES:FETCH_FULFILLED';
  static FETCH_LOADER = 'WATCHLIST:FAVORITES:FETCH_LOADER';
  static FETCH_ERROR = 'WATCHLIST:FAVORITES:FETCH_ERROR';

  static changeOrder(order:string[]):Action {
    return {
      type: this.CHANGE_ORDER,
      payload: order
    };
  }

  static sortData():Action {
    return {
      type: this.SORT_DATA,
      payload: null
    };
  }

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
