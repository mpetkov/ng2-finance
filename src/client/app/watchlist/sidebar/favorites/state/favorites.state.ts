import { Map, Record } from 'immutable';

export interface FavoritesStateInterface extends Map<string,any> {
  symbols?:string[];
  data?:any[];
  loader?:boolean;
  error?:string;
}

export const FavoritesInitialState = Record({
  symbols: ['YHOO', 'AAPL', 'GOOG', 'ADS'],
  data: [],
  loader: false,
  error: null
});
