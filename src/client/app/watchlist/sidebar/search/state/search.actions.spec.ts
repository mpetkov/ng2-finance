/* tslint:disable:no-unused-variable */
import { SearchActions } from './index';
import { ErrorInterface } from '../../../../core/state/api.state';

export function main() {
  describe('SearchActions', () => {
    let actions: SearchActions;

    beforeEach(() => {
      actions = new SearchActions();
    });

    it('should create an action when fetchFulfilled() is called', () => {
      let data:any[] = [{
        symbol: 'symbol'
      }];
      expect(actions.fetchFulfilled(data))
        .toEqual({
          type: SearchActions.FETCH_FULFILLED,
          payload: data
        });
    });

    it('should create an action when fetchLoader() is called', () => {
      let loader:boolean = true;
      expect(actions.fetchLoader(loader))
        .toEqual({
          type: SearchActions.FETCH_LOADER,
          payload: loader
        });
    });

    it('should create an action when fetchError() is called', () => {
      let error:ErrorInterface = {
        value: 'error'
      };
      expect(actions.fetchError(error))
        .toEqual({
          type: SearchActions.FETCH_ERROR,
          payload: error
        });
    });
  });
}
