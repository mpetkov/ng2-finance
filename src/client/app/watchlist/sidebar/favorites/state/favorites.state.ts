import { Record } from 'immutable';
import {
  CoreApiStateInterface,
  CoreApiStateKeys
} from '../../../../core/index';

export interface FavoritesStateInterface extends CoreApiStateInterface {
  symbols?:string[];
  order?:string[];
}

export const FavoritesInitialState = Record({
  symbols: ['YHOO', 'AAPL', 'GOOG', 'ADS'],
  order: [],
  data: [],
  loader: false,
  error: null
});

export class FavoritesStateKeys extends CoreApiStateKeys {
  static Symbols = 'symbols';
  static Order = 'order';
}
