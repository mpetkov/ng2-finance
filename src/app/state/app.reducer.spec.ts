import { AppActions } from './app.actions';
import { AppStateInterface, AppInitialState } from './app.state';
import { appReducer } from './app.reducer';
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
