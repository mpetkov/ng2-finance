import {HeaderActions} from './header-actions';
describe('HeaderActions', () => {
  let actions: HeaderActions;

  beforeEach(() => {
    actions = new HeaderActions();
  });

  it('should create an action when changeSearchActive() is called', () => {
    const searchActive = true;
    expect(actions.changeSearchActive(searchActive))
      .toEqual({
        type: HeaderActions.ACTIVATE_SEARCH,
        payload: searchActive
      });
  });

  it('should create an action when changeSearch() is called', () => {
    const search = 'search';
    expect(actions.changeSearch(search))
      .toEqual({
        type: HeaderActions.CHANGE_SEARCH,
        payload: search
      });
  });

  it('should create an action when changeSidebar() is called', () => {
    const sidebar = true;
    expect(actions.changeSidebar(sidebar))
      .toEqual({
        type: HeaderActions.CHANGE_SIDEBAR,
        payload: sidebar
      });
  });

  it('should create an action when changePreloader() is called', () => {
    const preloader = true;
    expect(actions.changePreloader(preloader))
      .toEqual({
        type: HeaderActions.CHANGE_PRELOADER,
        payload: preloader
      });
  });
});
