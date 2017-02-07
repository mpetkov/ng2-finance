import {
  ActionReducer,
  Action
} from '@ngrx/store';
import { HeaderInitialState } from './header.state';
import {
  HeaderActions,
  HeaderStateKeys,
  HeaderStateInterface
} from './index';

const initialState:HeaderStateInterface = new HeaderInitialState() as HeaderStateInterface;

export const headerReducer:ActionReducer<HeaderStateInterface> =
  (state:HeaderStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case HeaderActions.ACTIVATE_SEARCH:
      return state.set(HeaderStateKeys.SearchActive, action.payload);
    case HeaderActions.CHANGE_SEARCH:
      return state.set(HeaderStateKeys.Search, action.payload);
    case HeaderActions.CHANGE_SIDEBAR:
      return state.set(HeaderStateKeys.Sidebar, action.payload);
    default:
      return state;
  }
};
