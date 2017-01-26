import { ActionReducer, Action } from '@ngrx/store';
import { SearchStateInterface, SearchInitialState } from './search.state';
import { SearchActions } from './search.actions';

const initialState:SearchStateInterface = new SearchInitialState() as SearchStateInterface;

export const searchReducer:ActionReducer<SearchStateInterface> =
  (state:SearchStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case SearchActions.FETCH_FULFILLED:
      return state.set('data', action.payload);
    case SearchActions.FETCH_LOADER:
      return state.set('loader', action.payload);
    case SearchActions.FETCH_ERROR:
      return state.set('error', action.payload);
    default:
      return state;
  }
};
