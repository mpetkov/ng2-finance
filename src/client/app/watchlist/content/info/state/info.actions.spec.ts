/* tslint:disable:no-unused-variable */
import {
  InfoActions,
  InfoDataInterface
} from './index';
import { ErrorInterface } from '../../../../core/state/api.state';

export function main() {
  describe('InfoActions', () => {
    let actions: InfoActions;

    beforeEach(() => {
      actions = new InfoActions();
    });

    it('should create an action when fetchFulfilled() is called', () => {
      let data:InfoDataInterface[] = [{
        PreviousClose: 100
      }];
      expect(actions.fetchFulfilled(data))
        .toEqual({
          type: InfoActions.FETCH_FULFILLED,
          payload: data
        });
    });

    it('should create an action when fetchLoader() is called', () => {
      let loader:boolean = true;
      expect(actions.fetchLoader(loader))
        .toEqual({
          type: InfoActions.FETCH_LOADER,
          payload: loader
        });
    });

    it('should create an action when fetchError() is called', () => {
      let error:ErrorInterface = {
        value: 'error'
      };
      expect(actions.fetchError(error))
        .toEqual({
          type: InfoActions.FETCH_ERROR,
          payload: error
        });
    });
  });
}
