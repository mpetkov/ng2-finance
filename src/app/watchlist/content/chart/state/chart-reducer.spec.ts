import {ChartActions} from './chart-actions';
import {chartReducer} from './chart-reducer';
import {ChartInitialState, ChartStateInterface} from './chart-state';
describe('chartReducer', () => {
  let actions: ChartActions;

  beforeEach(() => {
    actions = new ChartActions();
  });

  it('should return state unchanged', () => {
    let state: ChartStateInterface = new ChartInitialState() as ChartStateInterface;
    state = chartReducer(state, {type: 'UNKNOWN'});
    expect(state).toEqual(new ChartInitialState());
  });

  it('should set point to provided value', () => {
    let state: ChartStateInterface = new ChartInitialState({point: {close: 5}}) as ChartStateInterface;
    state = chartReducer(state, actions.changePoint({close: 10}));
    expect(state.point.close).toBe(10);
  });

  it('should set range to provided value', () => {
    let state: ChartStateInterface = new ChartInitialState({range: 'a'}) as ChartStateInterface;
    state = chartReducer(state, actions.changeRange('b'));
    expect(state.range).toBe('b');
  });

  it('should set data to provided value', () => {
    let state: ChartStateInterface = new ChartInitialState({data: [{close: 5}]}) as ChartStateInterface;
    state = chartReducer(state, actions.fetchFulfilled([{close: 10}]));
    expect(state.data[0].close).toBe(10);
  });

  it('should set loader to provided value', () => {
    let state: ChartStateInterface = new ChartInitialState({loader: false}) as ChartStateInterface;
    state = chartReducer(state, actions.fetchLoader(true));
    expect(state.loader).toBe(true);
  });

  it('should set error to provided value', () => {
    let state: ChartStateInterface = new ChartInitialState({error: 'a'}) as ChartStateInterface;
    state = chartReducer(state, actions.fetchError('b'));
    expect(state.error).toBe('b');
  });
});
