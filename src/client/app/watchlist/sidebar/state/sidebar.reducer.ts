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
  (state:SidebarStateInterface = initialState, {payload, type}: Action) => {
    switch (type) {
      case SidebarActions.CHANGE_TYPE:
        return state.set(SidebarStateKeys.Type, payload);
      default:
        return state;
    }
  };
