import {
  ActionReducer,
  Action
} from '@ngrx/store';
import { SidebarInitialState } from './sidebar.state';
import {
  SidebarActions,
  SidebarStateKeys,
  SidebarStateInterface
} from './index';

const initialState:SidebarStateInterface = new SidebarInitialState() as SidebarStateInterface;

export const sidebarReducer:ActionReducer<SidebarStateInterface> =
  (state:SidebarStateInterface = initialState, action:Action = null) => {
    switch (action.type) {
      case SidebarActions.CHANGE_TYPE:
        return state.set(SidebarStateKeys.Type, action.payload);
      default:
        return state;
    }
  };
