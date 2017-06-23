import {WatchlistActions} from './watchlist-actions';
import {watchlistReducer} from './watchlist-reducer';
import {WatchlistInitialState, WatchlistStateInterface} from './watchlist-state';

describe('watchlistReducer', () => {
  let actions: WatchlistActions;

  beforeEach(() => {
    actions = new WatchlistActions();
  });

  it('should return state unchanged', () => {
    let state: WatchlistStateInterface = new WatchlistInitialState() as WatchlistStateInterface;
    state = watchlistReducer(state, {type: 'UNKNOWN'});
    expect(state).toEqual(new WatchlistInitialState());
  });

  it('should set stockData to provided value', () => {
    let state: WatchlistStateInterface = new WatchlistInitialState({stockData: {symbol: 'a'}}) as WatchlistStateInterface;
    state = watchlistReducer(state, actions.changeStockData({symbol: 'b'}));
    expect(state.stockData.symbol).toBe('b');
  });

  it('should set stock to provided value', () => {
    let state: WatchlistStateInterface = new WatchlistInitialState({stock: 'a'}) as WatchlistStateInterface;
    state = watchlistReducer(state, actions.changeStock('b'));
    expect(state.stock).toBe('b');
  });

  it('should add an item to the favorites list', () => {
    let state: WatchlistStateInterface = new WatchlistInitialState({favorites: []}) as WatchlistStateInterface;
    state = watchlistReducer(state, actions.addFavorite('a'));
    expect(state.favorites).toEqual(['a']);

    state = watchlistReducer(state, actions.addFavorite('a'));
    expect(state.favorites).toEqual(['a']);
  });

  it('should delete items from the favorites list', () => {
    let state: WatchlistStateInterface = new WatchlistInitialState({favorites: ['a', 'b']}) as WatchlistStateInterface;
    state = watchlistReducer(state, actions.deleteFavorites(['a', 'b']));
    expect(state.favorites).toEqual([]);
  });

  it('should set highlights to provided value', () => {
    let state: WatchlistStateInterface = new WatchlistInitialState({highlights: {}}) as WatchlistStateInterface;
    state = watchlistReducer(state, actions.changeHighlights({a: {price: 'a'}}));
    expect(state.highlights.a.price).toBe('a');
  });
});
