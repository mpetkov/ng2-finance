import { Action } from '@ngrx/store';
import { SidebarTypeEnum } from './sidebar.state';

export class SidebarActions {
  static TYPE = 'SIDEBAR:TYPE';

  static type(type: SidebarTypeEnum): Action {
    return {
      type: SidebarActions.TYPE,
      payload: type
    };
  }
}
