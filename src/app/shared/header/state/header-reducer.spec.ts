import {HeaderActions} from './header-actions';
import {HeaderInitialState, HeaderStateInterface} from './header-state';
import {headerReducer} from './header-reducer';
describe('headerReducer', () => {
  let actions: HeaderActions;

  beforeEach(() => {
    actions = new HeaderActions();
  });

  it('should return state unchanged', () => {
    let state: HeaderStateInterface = new HeaderInitialState() as HeaderStateInterface;
    state = headerReducer(state, {type: 'UNKNOWN'});
    expect(state).toEqual(new HeaderInitialState());
  });

  it('should set searchActive to provided value', () => {
    let state: HeaderStateInterface = new HeaderInitialState({searchActive: false}) as HeaderStateInterface;
    state = headerReducer(state, actions.changeSearchActive(true));
    expect(state.searchActive).toBe(true);
  });

  it('should set search to provided value', () => {
    let state: HeaderStateInterface = new HeaderInitialState({search: 'a'}) as HeaderStateInterface;
    state = headerReducer(state, actions.changeSearch('b'));
    expect(state.search).toBe('b');
  });

  it('should set sidebar to provided value', () => {
    let state: HeaderStateInterface = new HeaderInitialState({sidebar: false}) as HeaderStateInterface;
    state = headerReducer(state, actions.changeSidebar(true));
    expect(state.sidebar).toBe(true);
  });

  it('should return state unchanged', () => {
    let state: HeaderStateInterface = new HeaderInitialState() as HeaderStateInterface;
    state = headerReducer(state, {type: 'UNKNOWN'});
    expect(state).toEqual(new HeaderInitialState());
  });

  it('should set preloader to provided value', () => {
    let state: HeaderStateInterface = new HeaderInitialState({preloader: false}) as HeaderStateInterface;
    state = headerReducer(state, actions.changePreloader(true));
    expect(state.preloader).toBe(true);
  });
});
