import {Record} from 'immutable';
import {ChartInitialState} from './chart-state';

describe('ChartInitialState', () => {
  let state: any;

  beforeEach(() => {
    state = new ChartInitialState();
  });

  it('should be an instance of Immutable.Record', () => {
    expect(state instanceof Record).toBe(true);
  });

  it('should contain default properties', () => {
    expect(state.point).toEqual({});
    expect(state.range).toBe('3mo');
    expect(state.data).toEqual([]);
    expect(state.loader).toBe(false);
    expect(state.error).toBeNull();
  });
});
