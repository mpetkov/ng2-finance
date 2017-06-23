import {Action, ActionReducer} from '@ngrx/store';
import {NewsInitialState, NewsStateInterface, NewsStateKeys} from './news-state';
import {NewsActions} from './news-actions';

const initialState: NewsStateInterface = new NewsInitialState() as NewsStateInterface;

export const newsReducer: ActionReducer<NewsStateInterface> =
  (state: NewsStateInterface = initialState, {payload, type}: Action) => {
    switch (type) {
      case NewsActions.FETCH_FULFILLED:
        return state.set(NewsStateKeys.Data, payload);
      case NewsActions.FETCH_LOADER:
        return state.set(NewsStateKeys.Loader, payload);
      case NewsActions.FETCH_ERROR:
        return state.set(NewsStateKeys.Error, payload);
      default:
        return state;
    }
  };
