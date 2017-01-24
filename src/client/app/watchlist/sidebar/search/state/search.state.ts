import { Map, Record } from 'immutable';

export interface SearchStateInterface extends Map<string,any> {
  data?:any[];
}

export const SearchInitialState = Record({
  data: []
});
