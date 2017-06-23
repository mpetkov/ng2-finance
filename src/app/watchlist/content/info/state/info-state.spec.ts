import {Record} from 'immutable';
import {InfoInitialState} from './info-state';

describe('InfoInitialState', () => {
  let state: any;

  beforeEach(() => {
    state = new InfoInitialState();
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
