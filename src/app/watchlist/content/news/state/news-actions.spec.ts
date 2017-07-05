import {CoreApiErrorInterface} from '../../../../shared/core/state/api-state';
import {NewsActions} from './news-actions';
import {NewsDataInterface} from './news-state';

describe('NewsActions', () => {
  let actions: NewsActions;

  beforeEach(() => {
    actions = new NewsActions();
  });

  it('should create an action when fetchFulfilled() is called', () => {
    const data: NewsDataInterface[] = [{
      title: 'title'
    }];
    expect(actions.fetchFulfilled(data))
      .toEqual({
        type: NewsActions.FETCH_FULFILLED,
        payload: data
      });
  });

  it('should create an action when fetchLoader() is called', () => {
    const loader = true;
    expect(actions.fetchLoader(loader))
      .toEqual({
        type: NewsActions.FETCH_LOADER,
        payload: loader
      });
  });

  it('should create an action when fetchError() is called', () => {
    const error: CoreApiErrorInterface = {
      value: 'error'
    };
    expect(actions.fetchError(error))
      .toEqual({
        type: NewsActions.FETCH_ERROR,
        payload: error
      });
  });
});
