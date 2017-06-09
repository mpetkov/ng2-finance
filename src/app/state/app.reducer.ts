import {
  ActionReducer,
  Action
} from '@ngrx/store';
import { AppInitialState, AppStateInterface, AppStateKeys } from './app.state';
import { AppActions } from './app.actions';
const initialState:AppStateInterface = new AppInitialState() as AppStateInterface;

export const appReducer:ActionReducer<AppStateInterface> =
  (state:AppStateInterface = initialState, {payload, type}: Action) => {
    switch (type) {
      case AppActions.CHANGE_PRELOADER:
        return state.set(AppStateKeys.Preloader, payload);
      default:
        return state;
    }
  };
