import {
  ActionReducer,
  Action
} from '@ngrx/store';
import { FavoritesInitialState } from './favorites.state';
import {
  FavoritesActions,
  FavoritesStateKeys,
  FavoritesStateInterface
} from './index';

const initialState:FavoritesStateInterface = new FavoritesInitialState() as FavoritesStateInterface;

export const favoritesReducer:ActionReducer<FavoritesStateInterface> =
  (state:FavoritesStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case FavoritesActions.CHANGE_ORDER:
      return state.set(FavoritesStateKeys.Order,  action.payload);
    case FavoritesActions.FETCH_FULFILLED:
      return state.set(FavoritesStateKeys.Data, action.payload);
    case FavoritesActions.FETCH_LOADER:
      return state.set(FavoritesStateKeys.Loader, action.payload);
    case FavoritesActions.FETCH_ERROR:
      return state.set(FavoritesStateKeys.Error, action.payload);
    default:
      return state;
  }
};
