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
  (state:HeaderStateInterface = initialState, {payload, type}: Action) => {
    switch (type) {
      case HeaderActions.ACTIVATE_SEARCH:
        return state.set(HeaderStateKeys.SearchActive, payload);
      case HeaderActions.CHANGE_SEARCH:
        return state.set(HeaderStateKeys.Search, payload);
      case HeaderActions.CHANGE_SIDEBAR:
        return state.set(HeaderStateKeys.Sidebar, payload);
      default:
        return state;
    }
  };
