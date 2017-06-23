import {Map, Record} from 'immutable';

export interface HeaderStateInterface extends Map<string, any> {
  searchActive?: boolean;
  search?: string;
  sidebar?: boolean;
  preloader?: boolean;
}

export const HeaderInitialState = Record({
  searchActive: false,
  search: null,
  sidebar: true,
  preloader: true
});

export class HeaderStateKeys {
  static StateName = 'header';
  static SearchActive = 'searchActive';
  static Search = 'search';
  static Sidebar = 'sidebar';
  static Preloader = 'preloader';
}
