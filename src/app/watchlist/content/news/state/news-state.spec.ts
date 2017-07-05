import {Record} from 'immutable';
import {NewsInitialState} from './news-state';

describe('NewsInitialState', () => {
  let state: any;

  beforeEach(() => {
    state = new NewsInitialState();
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
