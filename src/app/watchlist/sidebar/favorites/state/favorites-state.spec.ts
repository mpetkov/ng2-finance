import {Record} from 'immutable';
import {FavoritesInitialState} from './favorites-state';

describe('FavoritesInitialState', () => {
  let state: any;

  beforeEach(() => {
    state = new FavoritesInitialState();
  });

  it('should be an instance of Immutable.Record', () => {
    expect(state instanceof Record).toBe(true);
  });

  it('should contain default properties', () => {
    expect(state.order).toEqual([]);
    expect(state.data).toEqual([]);
    expect(state.loader).toBe(false);
    expect(state.error).toBeNull();
  });
});
