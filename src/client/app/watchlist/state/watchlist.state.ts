import { Map, Record } from 'immutable';

export interface WatchlistStateInterface extends Map<string,any> {
  stock?:string;
  stockData?:any;
  favorites?:string[];
}

export const WatchlistInitialState = Record({
  stock: null,
  stockData: {},
  favorites: ['YHOO', 'AAPL', 'GOOG', 'ADS'],
});

export class WatchlistStateKeys {
  static Stock = 'stock';
  static StockData = 'stockData';
  static Favorites = 'favorites';
}
