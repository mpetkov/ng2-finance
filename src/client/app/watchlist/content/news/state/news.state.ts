import { Map, Record } from 'immutable';

export interface NewsStateInterface extends Map<string,any> {
  data?:any[];
}

export const NewsInitialState = Record({
  data: [],
});
