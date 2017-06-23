import {Map, Record} from 'immutable';
import {localStorageAdapter, Types} from '../../shared/core/utils';

export interface StockDataInterface {
  symbol?: string;
  name?: string;
  price?: number;
  priceDisplay?: string;
  change?: string;
  percentage?: string;
  index?: number;
}

export interface WatchlistStateInterface extends Map<string, any> {
  stock?: string;
  stockData?: StockDataInterface;
  favorites?: string[];
  highlights?: any;
}

export class WatchlistStateKeys {
  static StateName = 'watchlist';
  static Stock = 'stock';
  static StockData = 'stockData';
  static Favorites = 'favorites';
  static Highlights = 'highlights';
}

export const WatchlistInitialState = Record({
  stock: null,
  stockData: {},
  favorites: localStorageAdapter.getItem(WatchlistStateKeys.Favorites, Types.Array) || ['AAPL', 'GOOG', 'FB'],
  highlights: {}
});
