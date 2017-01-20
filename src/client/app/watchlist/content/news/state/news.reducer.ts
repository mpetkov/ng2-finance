import { ActionReducer, Action } from '@ngrx/store';
import { NewsStateInterface, NewsInitialState } from './news.state';
import { NewsActions } from './news.actions';

const initialState:NewsStateInterface = new NewsInitialState() as NewsStateInterface;

export const newsReducer:ActionReducer<NewsStateInterface> =
  (state:NewsStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case NewsActions.FETCH_NEWS_FULFILLED:
      return state.set('data', action.payload);
    default:
      return state;
  }
};
