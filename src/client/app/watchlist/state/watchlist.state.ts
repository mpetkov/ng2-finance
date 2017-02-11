import { Map, Record } from 'immutable';
import { localStorageAdapter } from '../../core/index';

export interface WatchlistStateInterface extends Map<string,any> {
  stock?:string;
  stockData?:any;
  favorites?:string[];
  highlights?:any;
}

export class WatchlistStateKeys {
  static Stock = 'stock';
  static StockData = 'stockData';
  static Favorites = 'favorites';
  static Highlights = 'highlights';
}

export const WatchlistInitialState = Record({
  stock: null,
  stockData: {},
  favorites: localStorageAdapter.getItem(WatchlistStateKeys.Favorites) || ['AAPL', 'GOOG', 'FB'],
  highlights: {}
});
