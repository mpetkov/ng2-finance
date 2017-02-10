import { Action } from '@ngrx/store';

export class WatchlistActions {
  static CHANGE_STOCK_DATA = 'WATCHLIST:CHANGE_STOCK_DATA';
  static CHANGE_STOCK = 'WATCHLIST:CHANGE_STOCK';

  static changeStockData(data:any):Action {
    return {
      type: WatchlistActions.CHANGE_STOCK_DATA,
      payload: data
    };
  }

  static changeStock(stock:string):Action {
    return {
      type: WatchlistActions.CHANGE_STOCK,
      payload: stock
    };
  }
}
