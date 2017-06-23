import {Action} from '@ngrx/store';

export class HeaderActions {
  static ACTIVATE_SEARCH = 'HEADER:ACTIVATE_SEARCH';
  static CHANGE_SEARCH = 'HEADER:CHANGE_SEARCH';
  static CHANGE_SIDEBAR = 'HEADER:CHANGE_SIDEBAR';
  static CHANGE_PRELOADER = 'HEADER:CHANGE_PRELOADER';

  changeSearchActive(searchActive: boolean): Action {
    return {
      type: HeaderActions.ACTIVATE_SEARCH,
      payload: searchActive
    };
  }

  changeSearch(search: string): Action {
    return {
      type: HeaderActions.CHANGE_SEARCH,
      payload: search
    };
  }

  changeSidebar(sidebar: boolean): Action {
    return {
      type: HeaderActions.CHANGE_SIDEBAR,
      payload: sidebar
    };
  }

  changePreloader(preloader: boolean): Action {
    return {
      type: HeaderActions.CHANGE_PRELOADER,
      payload: preloader
    };
  }
}
