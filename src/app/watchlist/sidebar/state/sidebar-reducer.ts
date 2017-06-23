import {Action, ActionReducer} from '@ngrx/store';
import {SidebarInitialState, SidebarStateInterface, SidebarStateKeys} from './sidebar-state';
import {SidebarActions} from './sidebar-actions';

const initialState: SidebarStateInterface = new SidebarInitialState() as SidebarStateInterface;

export const sidebarReducer: ActionReducer<SidebarStateInterface> =
  (state: SidebarStateInterface = initialState, {payload, type}: Action) => {
    switch (type) {
      case SidebarActions.CHANGE_TYPE:
        return state.set(SidebarStateKeys.Type, payload);
      default:
        return state;
    }
  };
