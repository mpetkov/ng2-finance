import { Map, Record } from 'immutable';

export interface FavoritesStateInterface extends Map<string,any> {
  symbols?:string[];
  data?:any[];
}

export const FavoritesInitialState = Record({
  symbols: ['YHOO', 'AAPL', 'GOOG', 'ADS'],
  data: []
});
