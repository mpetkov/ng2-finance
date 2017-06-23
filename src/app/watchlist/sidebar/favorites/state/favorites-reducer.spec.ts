import {FavoritesActions} from './favorites-actions';
import {favoritesReducer} from './favorites-reducer';
import {FavoritesInitialState, FavoritesStateInterface} from './favorites-state';

describe('favoritesReducer', () => {
  let actions: FavoritesActions;

  beforeEach(() => {
    actions = new FavoritesActions();
  });

  it('should return state unchanged', () => {
    let state: FavoritesStateInterface = new FavoritesInitialState() as FavoritesStateInterface;
    state = favoritesReducer(state, {type: 'UNKNOWN'});
    expect(state).toEqual(new FavoritesInitialState());
  });

  it('should set order to provided value', () => {
    let state: FavoritesStateInterface = new FavoritesInitialState({order: ['1']}) as FavoritesStateInterface;
    state = favoritesReducer(state, actions.changeOrder(['1', '2']));
    expect(state.order).toEqual(['1', '2']);
  });

  it('should sort the data', () => {
    let state: FavoritesStateInterface = new FavoritesInitialState(
      {data: [{symbol: '0'}, {symbol: '1'}], order: ['1']}
    ) as FavoritesStateInterface;
    state = favoritesReducer(state, actions.sortData());
    expect(state.data).toEqual([{symbol: '1', index: 0}, {symbol: '0', index: 999}]);
  });

  it('should set data to provided value', () => {
    let state: FavoritesStateInterface = new FavoritesInitialState({order: ['1']}) as FavoritesStateInterface;
    state = favoritesReducer(state, actions.fetchFulfilled([{symbol: '0'}, {symbol: '1'}]));
    expect(state.data).toEqual([{symbol: '1', index: 0}, {symbol: '0', index: 999}]);
  });

  it('should set loader to provided value', () => {
    let state: FavoritesStateInterface = new FavoritesInitialState({loader: false}) as FavoritesStateInterface;
    state = favoritesReducer(state, actions.fetchLoader(true));
    expect(state.loader).toBe(true);
  });

  it('should set error to provided value', () => {
    let state: FavoritesStateInterface = new FavoritesInitialState({error: 'a'}) as FavoritesStateInterface;
    state = favoritesReducer(state, actions.fetchError('b'));
    expect(state.error).toBe('b');
  });
});
