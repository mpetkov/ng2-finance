import {Action} from '@ngrx/store';
import {StockDataInterface} from './watchlist-state';

export class WatchlistActions {
  static CHANGE_STOCK_DATA = 'WATCHLIST:CHANGE_STOCK_DATA';
  static CHANGE_STOCK = 'WATCHLIST:CHANGE_STOCK';
  static DELETE_FAVORITES = 'WATCHLIST:DELETE_FAVORITES';
  static ADD_FAVORITE = 'WATCHLIST:ADD_FAVORITE';
  static CHANGE_HIGHLIGHTS = 'WATCHLIST:CHANGE_HIGHLIGHTS';

  changeStockData(data: StockDataInterface): Action {
    return {
      type: WatchlistActions.CHANGE_STOCK_DATA,
      payload: data
    };
  }

  changeStock(stock: string): Action {
    return {
      type: WatchlistActions.CHANGE_STOCK,
      payload: stock
    };
  }

  addFavorite(favorite: string): Action {
    return {
      type: WatchlistActions.ADD_FAVORITE,
      payload: favorite
    };
  }

  deleteFavorites(favorites: string[]): Action {
    return {
      type: WatchlistActions.DELETE_FAVORITES,
      payload: favorites
    };
  }

  changeHighlights(highlights: any): Action {
    return {
      type: WatchlistActions.CHANGE_HIGHLIGHTS,
      payload: highlights
    };
  }
}
