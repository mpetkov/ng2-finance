import {SearchActions} from './search-actions';
import {searchReducer} from './search-reducer';
import {SearchInitialState, SearchStateInterface} from './search-state';

describe('searchReducer', () => {
  let actions: SearchActions;

  beforeEach(() => {
    actions = new SearchActions();
  });

  it('should return state unchanged', () => {
    let state: SearchStateInterface = new SearchInitialState() as SearchStateInterface;
    state = searchReducer(state, {type: 'UNKNOWN'});
    expect(state).toEqual(new SearchInitialState());
  });

  it('should set data to provided value', () => {
    let state: SearchStateInterface = new SearchInitialState([]) as SearchStateInterface;
    state = searchReducer(state, actions.fetchFulfilled([{symbol: '0'}]));
    expect(state.data).toEqual([{symbol: '0'}]);
  });

  it('should set loader to provided value', () => {
    let state: SearchStateInterface = new SearchInitialState({loader: false}) as SearchStateInterface;
    state = searchReducer(state, actions.fetchLoader(true));
    expect(state.loader).toBe(true);
  });

  it('should set error to provided value', () => {
    let state: SearchStateInterface = new SearchInitialState({error: 'a'}) as SearchStateInterface;
    state = searchReducer(state, actions.fetchError('b'));
    expect(state.error).toBe('b');
  });
});
