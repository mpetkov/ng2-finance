import { Map, Record } from 'immutable';

export interface StocksStateInterface extends Map<string,any> {
  stock?:string;
}

export const StocksInitialState = Record({
  stock: 'AAPL'
});
