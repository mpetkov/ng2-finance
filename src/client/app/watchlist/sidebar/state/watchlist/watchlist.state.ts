import { Map, Record } from 'immutable';

export interface WatchlistStateInterface extends Map<string,any> {
  symbols?:string[];
  data?:any[];
}

export const WatchlistInitialState = Record({
  symbols: ['YHOO', 'AAPL', 'GOOG', 'ADS'],
  data: []
});
