import { SidebarTypeEnum } from './sidebar-state';
import { PayloadAction } from '../../../shared/core/state/api-state';

export class SidebarActions {
  static CHANGE_TYPE = 'WATCHLIST:SIDEBAR:CHANGE_TYPE';

  changeType(type: SidebarTypeEnum): PayloadAction {
    return {
      type: SidebarActions.CHANGE_TYPE,
      payload: type
    };
  }
}
