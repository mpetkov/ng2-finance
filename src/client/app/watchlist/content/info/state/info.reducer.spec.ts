/* tslint:disable:no-unused-variable */
import {
  InfoActions,
  infoReducer,
  InfoStateInterface,
  InfoInitialState
} from './index';

export function main() {
  describe('infoReducer', () => {
    let actions: InfoActions;

    beforeEach(() => {
      actions = new InfoActions();
    });

    it('should return state unchanged', () => {
      let state:InfoStateInterface = new InfoInitialState() as InfoStateInterface;
      state = infoReducer(state, {type:'UNKNOWN'});
      expect(state).toEqual(new InfoInitialState());
    });

    it('should set data to provided value', () => {
      let state:InfoStateInterface = new InfoInitialState({data: [{PreviousClose:5}]}) as InfoStateInterface;
      state = infoReducer(state, actions.fetchFulfilled([{PreviousClose:10}]));
      expect(state.data[0].PreviousClose).toBe(10);
    });

    it('should set loader to provided value', () => {
      let state:InfoStateInterface = new InfoInitialState({loader: false}) as InfoStateInterface;
      state = infoReducer(state, actions.fetchLoader(true));
      expect(state.loader).toBe(true);
    });

    it('should set error to provided value', () => {
      let state:InfoStateInterface = new InfoInitialState({error: 'a'}) as InfoStateInterface;
      state = infoReducer(state, actions.fetchError('b'));
      expect(state.error).toBe('b');
    });
  });
}
