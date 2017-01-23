import { Action } from '@ngrx/store';

export class FavoritesActions {
  static FETCH_FAVORITES_FULFILLED = 'WATCHLIST:FETCH_FAVORITES_FULFILLED';
  static FETCH_FAVORITES_SEARCH_FULFILLED = 'WATCHLIST:FETCH_FAVORITES_SEARCH_FULFILLED';
  static DELETE_FAVORITES = 'WATCHLIST:DELETE_FAVORITES';
  static ADD_FAVORITE = 'WATCHLIST:ADD_FAVORITE';

  static fetchFavoritesFulfilled(payload:any):Action {
    return {
      type: this.FETCH_FAVORITES_FULFILLED,
      payload: payload
    };
  }

  static fetchFavoritesSearchFulfilled(payload:any):Action {
    return {
      type: this.FETCH_FAVORITES_SEARCH_FULFILLED,
      payload: payload
    };
  }

  static deleteFavorites(payload:string[]):Action {
    return {
      type: this.DELETE_FAVORITES,
      payload: payload
    };
  }

  static addFavorite(payload:string):Action {
    return {
      type: this.ADD_FAVORITE,
      payload: payload
    };
  }
}
