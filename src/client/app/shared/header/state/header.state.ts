import { Record, Map } from 'immutable';

export interface HeaderStateInterface extends Map<string,any> {
  searchActive?:boolean;
  search?:string;
  sidebar?:boolean;
}

export const HeaderInitialState = Record({
  searchActive: false,
  search: null,
  sidebar: true
});

export class HeaderStateKeys {
  static SearchActive = 'searchActive';
  static Search = 'search';
  static Sidebar = 'sidebar';
}
