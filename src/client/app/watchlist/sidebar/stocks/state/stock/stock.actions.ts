import { Action } from '@ngrx/store';

export class StockActions {
  static CHANGE_STOCK = 'WATCHLIST:CHANGE_STOCK';
  static CHANGE_STOCK_DATA = 'WATCHLIST:CHANGE_STOCK_DATA';

  static changeStock(payload:string):Action {
    return {
      type: StockActions.CHANGE_STOCK,
      payload: payload
    };
  }

  static changeStockData(payload:any):Action {
    return {
      type: StockActions.CHANGE_STOCK_DATA,
      payload: payload
    };
  }
}
