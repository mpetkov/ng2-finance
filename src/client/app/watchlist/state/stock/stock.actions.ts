import { Action } from '@ngrx/store';

export class StockActions {
  static CHANGE_DATA = 'WATCHLIST:STOCK:CHANGE_DATA';
  static CHANGE = 'WATCHLIST:STOCK:CHANGE';

  static changeData(data:any):Action {
    return {
      type: StockActions.CHANGE_DATA,
      payload: data
    };
  }

  static change(symbol:string):Action {
    return {
      type: StockActions.CHANGE,
      payload: symbol
    };
  }
}
