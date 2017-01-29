import { ActionReducer, Action } from '@ngrx/store';
import { NewsStateInterface, NewsInitialState } from './news.state';
import { NewsActions } from './news.actions';

const initialState:NewsStateInterface = new NewsInitialState() as NewsStateInterface;

export const newsReducer:ActionReducer<NewsStateInterface> =
  (state:NewsStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case NewsActions.FETCH_FULFILLED:
      return state.set('data', action.payload);
    case NewsActions.FETCH_LOADER:
      return state.set('loader', action.payload);
    case NewsActions.FETCH_ERROR:
      return state.set('error', action.payload);
    default:
      return state;
  }
};
