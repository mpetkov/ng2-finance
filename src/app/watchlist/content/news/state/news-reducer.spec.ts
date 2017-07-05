import {NewsActions} from './news-actions';
import {newsReducer} from './news-reducer';
import {NewsInitialState, NewsStateInterface} from './news-state';
describe('newsReducer', () => {
  let actions: NewsActions;

  beforeEach(() => {
    actions = new NewsActions();
  });

  it('should return state unchanged', () => {
    let state: NewsStateInterface = new NewsInitialState() as NewsStateInterface;
    state = newsReducer(state, {type: 'UNKNOWN'});
    expect(state).toEqual(new NewsInitialState());
  });

  it('should set data to provided value', () => {
    let state: NewsStateInterface = new NewsInitialState({data: [{title: 'a'}]}) as NewsStateInterface;
    state = newsReducer(state, actions.fetchFulfilled([{title: 'b'}]));
    expect(state.data[0].title).toBe('b');
  });

  it('should set loader to provided value', () => {
    let state: NewsStateInterface = new NewsInitialState({loader: false}) as NewsStateInterface;
    state = newsReducer(state, actions.fetchLoader(true));
    expect(state.loader).toBe(true);
  });

  it('should set error to provided value', () => {
    let state: NewsStateInterface = new NewsInitialState({error: 'a'}) as NewsStateInterface;
    state = newsReducer(state, actions.fetchError('b'));
    expect(state.error).toBe('b');
  });
});
