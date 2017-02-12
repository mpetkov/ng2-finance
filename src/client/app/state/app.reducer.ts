import {
  ActionReducer,
  Action
} from '@ngrx/store';
import { AppInitialState } from './app.state';
import {
  AppActions,
  AppStateKeys,
  AppStateInterface
} from './index';

const initialState:AppStateInterface = new AppInitialState() as AppStateInterface;

export const appReducer:ActionReducer<AppStateInterface> =
  (state:AppStateInterface = initialState, action:Action = null) => {
    switch (action.type) {
      case AppActions.CHANGE_PRELOADER:
        return state.set(AppStateKeys.Preloader, action.payload);
      default:
        return state;
    }
  };
