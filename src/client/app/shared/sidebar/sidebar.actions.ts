import { Action } from '@ngrx/store';
import { SidebarTypeEnum } from './sidebar.state';

export class SidebarActions {
  static TYPE = 'SIDEBAR:TYPE';
  static STOCK = 'SIDEBAR:STOCK';

  static type(payload:SidebarTypeEnum):Action {
    return {
      type: SidebarActions.TYPE,
      payload: payload
    };
  }

  static stock(payload:string):Action {
    return {
      type: SidebarActions.STOCK,
      payload: payload
    };
  }
}
