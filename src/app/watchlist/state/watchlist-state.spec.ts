import {Record} from 'immutable';
import {WatchlistInitialState} from './watchlist-state';

describe('WatchlistInitialState', () => {
  let state: any;

  beforeEach(() => {
    localStorage.clear();
    state = new WatchlistInitialState();
  });

  it('should be an instance of Immutable.Record', () => {
    expect(state instanceof Record).toBe(true);
  });

  it('should contain default properties', () => {
    expect(state.stock).toBeNull();
    expect(state.stockData).toEqual({});
    expect(state.favorites).toEqual(['AAPL', 'GOOG', 'FB']);
    expect(state.highlights).toEqual({});
  });
});
