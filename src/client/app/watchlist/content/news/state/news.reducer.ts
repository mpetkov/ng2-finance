import {
  ActionReducer,
  Action
} from '@ngrx/store';
import { NewsInitialState } from './news.state';
import {
  NewsActions,
  NewsStateKeys,
  NewsStateInterface
} from './index';

const initialState:NewsStateInterface = new NewsInitialState() as NewsStateInterface;

export const newsReducer:ActionReducer<NewsStateInterface> =
  (state:NewsStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case NewsActions.FETCH_FULFILLED:
      return state.set(NewsStateKeys.Data, action.payload);
    case NewsActions.FETCH_LOADER:
      return state.set(NewsStateKeys.Loader, action.payload);
    case NewsActions.FETCH_ERROR:
      return state.set(NewsStateKeys.Error, action.payload);
    default:
      return state;
  }
};
