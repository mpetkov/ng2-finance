import {Action, ActionReducer} from '@ngrx/store';
import {SearchInitialState, SearchStateInterface, SearchStateKeys} from './search-state';
import {SearchActions} from './search-actions';

const initialState: SearchStateInterface = new SearchInitialState() as SearchStateInterface;

export const searchReducer: ActionReducer<SearchStateInterface> =
  (state: SearchStateInterface = initialState, {payload, type}: Action) => {
    switch (type) {
      case SearchActions.FETCH_FULFILLED:
        return state.set(SearchStateKeys.Data, payload);
      case SearchActions.FETCH_LOADER:
        return state.set(SearchStateKeys.Loader, payload);
      case SearchActions.FETCH_ERROR:
        return state.set(SearchStateKeys.Error, payload);
      default:
        return state;
    }
  };
