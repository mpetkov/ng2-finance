import { ActionReducer, Action } from '@ngrx/store';
import { FavoritesStateInterface, FavoritesInitialState } from './favorites.state';
import { FavoritesActions } from './favorites.actions';

const initialState:FavoritesStateInterface = new FavoritesInitialState() as FavoritesStateInterface;

export const favoritesReducer:ActionReducer<FavoritesStateInterface> =
  (state:FavoritesStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case FavoritesActions.FETCH_FAVORITES_FULFILLED:
      return state.set('data', action.payload);
    case FavoritesActions.FETCH_FAVORITES_SEARCH_FULFILLED:
      return state.set('search', action.payload);
    case FavoritesActions.DELETE_FAVORITES:
      return state.set('symbols', state.symbols.filter(
        (symbol:string) => action.payload.indexOf(symbol) === -1)
      );
    case FavoritesActions.ADD_FAVORITE:
      return state.set('symbols', [action.payload, ...state.symbols]);
    default:
      return state;
  }
};
