import { ActionReducer, Action } from '@ngrx/store';
import { SidebarActions } from './sidebar.actions';
import { SidebarStateInterface, SidebarInitialState } from './sidebar.state';

const initialState:SidebarStateInterface = new SidebarInitialState() as SidebarStateInterface;

export const sidebarReducer:ActionReducer<SidebarStateInterface> = (state:SidebarStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case SidebarActions.CHANGE_SIDEBAR_TYPE:
      return state.set('type', action.payload);
    default:
      return state;
  }
};
