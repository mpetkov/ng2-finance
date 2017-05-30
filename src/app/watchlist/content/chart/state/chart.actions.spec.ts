/* tslint:disable:no-unused-variable */
import {
  ChartActions,
  ChartDataInterface
} from './index';
import { ErrorInterface } from '../../../../core/state/api.state';

export function main() {
  describe('ChartActions', () => {
    let actions: ChartActions;

    beforeEach(() => {
      actions = new ChartActions();
    });

    it('should create an action when changePoint() is called', () => {
      let point:ChartDataInterface = {
        close: 100
      };
      expect(actions.changePoint(point))
        .toEqual({
          type: ChartActions.CHANGE_POINT,
          payload: point
        });
    });

    it('should create an action when changeRange() is called', () => {
      let range:string = 'range';
      expect(actions.changeRange(range))
        .toEqual({
          type: ChartActions.CHANGE_RANGE,
          payload: range
        });
    });

    it('should create an action when fetchFulfilled() is called', () => {
      let data:ChartDataInterface[] = [{
        close: 100
      }];
      expect(actions.fetchFulfilled(data))
        .toEqual({
          type: ChartActions.FETCH_FULFILLED,
          payload: data
        });
    });

    it('should create an action when fetchLoader() is called', () => {
      let loader:boolean = true;
      expect(actions.fetchLoader(loader))
        .toEqual({
          type: ChartActions.FETCH_LOADER,
          payload: loader
        });
    });

    it('should create an action when fetchError() is called', () => {
      let error:ErrorInterface = {
        value: 'error'
      };
      expect(actions.fetchError(error))
        .toEqual({
          type: ChartActions.FETCH_ERROR,
          payload: error
        });
    });
  });
}
