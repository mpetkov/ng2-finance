import { Action } from '@ngrx/store';
import { SidebarTypeEnum } from './sidebar.state';

export class SidebarActions {
  static CHANGE_SIDEBAR_TYPE = 'WATCHLIST:CHANGE_SIDEBAR_TYPE';

  static changeType(payload:SidebarTypeEnum):Action {
    return {
      type: SidebarActions.CHANGE_SIDEBAR_TYPE,
      payload: payload
    };
  }
}
