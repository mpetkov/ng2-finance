import {Record} from 'immutable';
import {SearchInitialState} from './search-state';

describe('SearchInitialState', () => {
  let state: any;

  beforeEach(() => {
    state = new SearchInitialState();
  });

  it('should be an instance of Immutable.Record', () => {
    expect(state instanceof Record).toBe(true);
  });

  it('should contain default properties', () => {
    expect(state.data).toEqual([]);
    expect(state.loader).toBe(false);
    expect(state.error).toBeNull();
  });
});
