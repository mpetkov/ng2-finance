import {SearchActions} from './search-actions';
import {CoreApiErrorInterface} from '../../../../shared/core/state/api-state';

describe('SearchActions', () => {
  let actions: SearchActions;

  beforeEach(() => {
    actions = new SearchActions();
  });

  it('should create an action when fetchFulfilled() is called', () => {
    const data: any[] = [{
      symbol: 'symbol'
    }];
    expect(actions.fetchFulfilled(data))
      .toEqual({
        type: SearchActions.FETCH_FULFILLED,
        payload: data
      });
  });

  it('should create an action when fetchLoader() is called', () => {
    const loader = true;
    expect(actions.fetchLoader(loader))
      .toEqual({
        type: SearchActions.FETCH_LOADER,
        payload: loader
      });
  });

  it('should create an action when fetchError() is called', () => {
    const error: CoreApiErrorInterface = {
      value: 'error'
    };
    expect(actions.fetchError(error))
      .toEqual({
        type: SearchActions.FETCH_ERROR,
        payload: error
      });
  });
});
