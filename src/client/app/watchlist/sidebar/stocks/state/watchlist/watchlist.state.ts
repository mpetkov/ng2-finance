import { Map, Record } from 'immutable';

export interface WatchlistStateInterface extends Map<string,any> {
  symbols?:string[];
}

export const WatchlistInitialState = Record({
  symbols: ['YHOO', 'AAPL', 'GOOG', 'ADS']
});
