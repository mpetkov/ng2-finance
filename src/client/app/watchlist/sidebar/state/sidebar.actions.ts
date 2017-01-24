import { Action } from '@ngrx/store';
import { SidebarTypeEnum } from './sidebar.state';

export class SidebarActions {
  static CHANGE_TYPE = 'WATCHLIST:SIDEBAR:CHANGE_TYPE';

  static changeType(type:SidebarTypeEnum):Action {
    return {
      type: SidebarActions.CHANGE_TYPE,
      payload: type
    };
  }
}
