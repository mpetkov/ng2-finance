/* tslint:disable:no-unused-variable */
import {
  AppActions,
  appReducer,
  AppStateInterface,
  AppInitialState
} from './index';

export function main() {
  describe('appReducer', () => {
    let actions: AppActions;

    beforeEach(() => {
      actions = new AppActions();
    });

    it('should return state unchanged', () => {
      let state:AppStateInterface = new AppInitialState() as AppStateInterface;
      state = appReducer(state, {type:'UNKNOWN'});
      expect(state).toEqual(new AppInitialState());
    });

    it('should set preloader to provided value', () => {
      let state:AppStateInterface = new AppInitialState({preloader: false}) as AppStateInterface;
      state = appReducer(state, actions.changePreloader(true));
      expect(state.preloader).toBe(true);
    });
  });
}
