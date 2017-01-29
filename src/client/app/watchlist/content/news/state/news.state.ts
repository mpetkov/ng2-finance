import { Map, Record } from 'immutable';

export interface NewsStateInterface extends Map<string,any> {
  data?:any[];
  loader?:boolean;
  error?:string;
}

export const NewsInitialState = Record({
  data: [],
  loader: false,
  error: null
});
