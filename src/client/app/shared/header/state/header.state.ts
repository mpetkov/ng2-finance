import { Record, Map } from 'immutable';

export interface HeaderStateInterface extends Map<string,any> {
  searchActive?:boolean;
  search?:string;
}

export const HeaderInitialState = Record({
  searchActive: false,
  search: null
});

export class HeaderStateKeys {
  static SearchActive = 'searchActive';
  static Search = 'search';
}
