/* tslint:disable:no-unused-variable */
import {
  NewsActions,
  NewsDataInterface
} from './index';
import { ErrorInterface } from '../../../../core/state/api.state';

export function main() {
  describe('NewsActions', () => {
    let actions: NewsActions;

    beforeEach(() => {
      actions = new NewsActions();
    });

    it('should create an action when fetchFulfilled() is called', () => {
      let data:NewsDataInterface[] = [{
        title: 'title'
      }];
      expect(actions.fetchFulfilled(data))
        .toEqual({
          type: NewsActions.FETCH_FULFILLED,
          payload: data
        });
    });

    it('should create an action when fetchLoader() is called', () => {
      let loader:boolean = true;
      expect(actions.fetchLoader(loader))
        .toEqual({
          type: NewsActions.FETCH_LOADER,
          payload: loader
        });
    });

    it('should create an action when fetchError() is called', () => {
      let error:ErrorInterface = {
        value: 'error'
      };
      expect(actions.fetchError(error))
        .toEqual({
          type: NewsActions.FETCH_ERROR,
          payload: error
        });
    });
  });
}
