import { StockDataInterface } from './watchlist-state';
import { PayloadAction } from '../../shared/core/state/api-state';

export class WatchlistActions {
  static CHANGE_STOCK_DATA = 'WATCHLIST:CHANGE_STOCK_DATA';
  static CHANGE_STOCK = 'WATCHLIST:CHANGE_STOCK';
  static DELETE_FAVORITES = 'WATCHLIST:DELETE_FAVORITES';
  static ADD_FAVORITE = 'WATCHLIST:ADD_FAVORITE';
  static CHANGE_HIGHLIGHTS = 'WATCHLIST:CHANGE_HIGHLIGHTS';

  changeStockData(data: StockDataInterface): PayloadAction {
    return {
      type: WatchlistActions.CHANGE_STOCK_DATA,
      payload: data
    };
  }

  changeStock(stock: string): PayloadAction {
    return {
      type: WatchlistActions.CHANGE_STOCK,
      payload: stock
    };
  }

  addFavorite(favorite: string): PayloadAction {
    return {
      type: WatchlistActions.ADD_FAVORITE,
      payload: favorite
    };
  }

  deleteFavorites(favorites: string[]): PayloadAction {
    return {
      type: WatchlistActions.DELETE_FAVORITES,
      payload: favorites
    };
  }

  changeHighlights(highlights: any): PayloadAction {
    return {
      type: WatchlistActions.CHANGE_HIGHLIGHTS,
      payload: highlights
    };
  }
}
