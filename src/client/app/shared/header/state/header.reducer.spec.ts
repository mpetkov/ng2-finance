/* tslint:disable:no-unused-variable */
import {
  HeaderActions,
  headerReducer,
  HeaderStateInterface,
  HeaderInitialState
} from './index';

export function main() {
  describe('headerReducer', () => {
    let actions: HeaderActions;

    beforeEach(() => {
      actions = new HeaderActions();
    });

    it('should return state unchanged', () => {
      let state:HeaderStateInterface = new HeaderInitialState() as HeaderStateInterface;
      state = headerReducer(state, {type:'UNKNOWN'});
      expect(state).toEqual(new HeaderInitialState());
    });

    it('should set searchActive to provided value', () => {
      let state:HeaderStateInterface = new HeaderInitialState({searchActive: false}) as HeaderStateInterface;
      state = headerReducer(state, actions.changeSearchActive(true));
      expect(state.searchActive).toBe(true);
    });

    it('should set search to provided value', () => {
      let state:HeaderStateInterface = new HeaderInitialState({search: 'a'}) as HeaderStateInterface;
      state = headerReducer(state, actions.changeSearch('b'));
      expect(state.search).toBe('b');
    });

    it('should set sidebar to provided value', () => {
      let state:HeaderStateInterface = new HeaderInitialState({sidebar: false}) as HeaderStateInterface;
      state = headerReducer(state, actions.changeSidebar(true));
      expect(state.sidebar).toBe(true);
    });
  });
}
