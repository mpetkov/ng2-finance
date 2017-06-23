import {CoreApiErrorInterface} from '../../../../shared/core/state/api-state';
import {ChartActions} from './chart-actions';
import {ChartDataInterface} from './chart-state';

describe('ChartActions', () => {
  let actions: ChartActions;

  beforeEach(() => {
    actions = new ChartActions();
  });

  it('should create an action when changePoint() is called', () => {
    const point: ChartDataInterface = {
      close: 100
    };
    expect(actions.changePoint(point))
      .toEqual({
        type: ChartActions.CHANGE_POINT,
        payload: point
      });
  });

  it('should create an action when changeRange() is called', () => {
    const range = 'range';
    expect(actions.changeRange(range))
      .toEqual({
        type: ChartActions.CHANGE_RANGE,
        payload: range
      });
  });

  it('should create an action when fetchFulfilled() is called', () => {
    const data: ChartDataInterface[] = [{
      close: 100
    }];
    expect(actions.fetchFulfilled(data))
      .toEqual({
        type: ChartActions.FETCH_FULFILLED,
        payload: data
      });
  });

  it('should create an action when fetchLoader() is called', () => {
    const loader = true;
    expect(actions.fetchLoader(loader))
      .toEqual({
        type: ChartActions.FETCH_LOADER,
        payload: loader
      });
  });

  it('should create an action when fetchError() is called', () => {
    const error: CoreApiErrorInterface = {
      value: 'error'
    };
    expect(actions.fetchError(error))
      .toEqual({
        type: ChartActions.FETCH_ERROR,
        payload: error
      });
  });
});
