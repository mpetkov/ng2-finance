import {
  ActionReducer,
  Action
} from '@ngrx/store';
import { InfoInitialState } from './info.state';
import {
  InfoActions,
  InfoStateKeys,
  InfoStateInterface
} from './index';

const initialState:InfoStateInterface = new InfoInitialState() as InfoStateInterface;

export const infoReducer:ActionReducer<InfoStateInterface> =
  (state:InfoStateInterface = initialState, action:Action = null) => {
    switch (action.type) {
      case InfoActions.FETCH_FULFILLED:
        return state.set(InfoStateKeys.Data, action.payload);
      case InfoActions.FETCH_LOADER:
        return state.set(InfoStateKeys.Loader, action.payload);
      case InfoActions.FETCH_ERROR:
        return state.set(InfoStateKeys.Error, action.payload);
      default:
        return state;
    }
  };
