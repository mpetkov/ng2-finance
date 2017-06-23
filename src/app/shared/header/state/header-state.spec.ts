import {Record} from 'immutable';
import {HeaderInitialState} from './header-state';

describe('HeaderInitialState', () => {
  let state: any;

  beforeEach(() => {
    state = new HeaderInitialState();
  });

  it('should be an instance of Immutable.Record', () => {
    expect(state instanceof Record).toBe(true);
  });

  it('should contain default properties', () => {
    expect(state.searchActive).toBe(false);
    expect(state.search).toBeNull();
    expect(state.sidebar).toBe(true);
    expect(state.preloader).toBe(true);
  });
});
