import { Map, Record } from 'immutable';

export interface WatchlistStateInterface extends Map<string,any> {
  stock?:string;
  stockData?:any;
}

export const WatchlistInitialState = Record({
  stock: null,
  stockData: {}
});

export class WatchlistStateKeys {
  static Stock = 'stock';
  static StockData = 'stockData';
}
