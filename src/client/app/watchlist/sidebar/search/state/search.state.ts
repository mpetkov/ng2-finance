import { Map, Record } from 'immutable';

export interface SearchStateInterface extends Map<string,any> {
  data?:any[];
  loader?:boolean;
  error?:string;
}

export const SearchInitialState = Record({
  data: [],
  loader: false,
  error: null
});
