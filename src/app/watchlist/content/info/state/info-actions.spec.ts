import {CoreApiErrorInterface} from '../../../../shared/core/state/api-state';
import {InfoActions} from './info-actions';
import {InfoDataInterface} from './info-state';

describe('InfoActions', () => {
  let actions: InfoActions;

  beforeEach(() => {
    actions = new InfoActions();
  });

  it('should create an action when fetchFulfilled() is called', () => {
    const data: InfoDataInterface[] = [{
      PreviousClose: 100
    }];
    expect(actions.fetchFulfilled(data))
      .toEqual({
        type: InfoActions.FETCH_FULFILLED,
        payload: data
      });
  });

  it('should create an action when fetchLoader() is called', () => {
    const loader = true;
    expect(actions.fetchLoader(loader))
      .toEqual({
        type: InfoActions.FETCH_LOADER,
        payload: loader
      });
  });

  it('should create an action when fetchError() is called', () => {
    const error: CoreApiErrorInterface = {
      value: 'error'
    };
    expect(actions.fetchError(error))
      .toEqual({
        type: InfoActions.FETCH_ERROR,
        payload: error
      });
  });
});
