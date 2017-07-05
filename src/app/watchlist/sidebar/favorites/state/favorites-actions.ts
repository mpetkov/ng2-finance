import {Action} from '@ngrx/store';
import {StockDataInterface} from '../../../state/watchlist-state';
import {CoreApiErrorInterface} from '../../../../shared/core/state/api-state';

export class FavoritesActions {
  static CHANGE_ORDER = 'WATCHLIST:FAVORITES:CHANGE_ORDER';
  static SORT_DATA = 'WATCHLIST:FAVORITES:SORT_DATA';
  static FETCH_FULFILLED = 'WATCHLIST:FAVORITES:FETCH_FULFILLED';
  static FETCH_LOADER = 'WATCHLIST:FAVORITES:FETCH_LOADER';
  static FETCH_ERROR = 'WATCHLIST:FAVORITES:FETCH_ERROR';

  changeOrder(order: string[]): Action {
    return {
      type: FavoritesActions.CHANGE_ORDER,
      payload: order
    };
  }

  sortData(): Action {
    return {
      type: FavoritesActions.SORT_DATA,
      payload: null
    };
  }

  fetchFulfilled(data: StockDataInterface[]): Action {
    return {
      type: FavoritesActions.FETCH_FULFILLED,
      payload: data
    };
  }

  fetchLoader(loader: boolean): Action {
    return {
      type: FavoritesActions.FETCH_LOADER,
      payload: loader
    };
  }

  fetchError(error: CoreApiErrorInterface): Action {
    return {
      type: FavoritesActions.FETCH_ERROR,
      payload: error
    };
  }
}
