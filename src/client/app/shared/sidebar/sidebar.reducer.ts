import { ActionReducer, Action } from '@ngrx/store';
import { SidebarActions } from './sidebar.actions';
import { SidebarStateInterface, SidebarInitialState } from "./sidebar.state";

export const initialState:SidebarStateInterface = new SidebarInitialState() as SidebarStateInterface;

export const sidebarReducer: ActionReducer<SidebarStateInterface>  = (state: SidebarStateInterface = initialState, action: Action = null) => {
  switch (action.type) {
    case SidebarActions.TYPE:
      return state.set('type', action.payload);
    case SidebarActions.STOCK:
      return state.set('stock', action.payload);
    default:
      return state;
  }
}
