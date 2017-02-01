import {
  ActionReducer,
  Action
} from '@ngrx/store';
import { SearchInitialState } from './search.state';
import {
  SearchActions,
  SearchStateKeys,
  SearchStateInterface
} from './index';

const initialState:SearchStateInterface = new SearchInitialState() as SearchStateInterface;

export const searchReducer:ActionReducer<SearchStateInterface> =
  (state:SearchStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case SearchActions.FETCH_FULFILLED:
      return state.set(SearchStateKeys.Data, action.payload);
    case SearchActions.FETCH_LOADER:
      return state.set(SearchStateKeys.Loader, action.payload);
    case SearchActions.FETCH_ERROR:
      return state.set(SearchStateKeys.Error, action.payload);
    default:
      return state;
  }
};
