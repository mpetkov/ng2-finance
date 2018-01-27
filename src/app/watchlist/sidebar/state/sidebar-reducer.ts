import { ActionReducer } from '@ngrx/store';
import { SidebarInitialState, SidebarStateInterface, SidebarStateKeys } from './sidebar-state';
import { SidebarActions } from './sidebar-actions';
import { PayloadAction } from '../../../shared/core/state/api-state';

const initialState: SidebarStateInterface = new SidebarInitialState() as SidebarStateInterface;

export const sidebarReducer: ActionReducer<SidebarStateInterface> =
  (state: SidebarStateInterface = initialState, {payload, type}: PayloadAction) => {
    switch (type) {
      case SidebarActions.CHANGE_TYPE:
        return state.set(SidebarStateKeys.Type, payload);
      default:
        return state;
    }
  };
