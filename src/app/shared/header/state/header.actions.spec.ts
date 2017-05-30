/* tslint:disable:no-unused-variable */
import { HeaderActions } from './index';

export function main() {
  describe('HeaderActions', () => {
    let actions: HeaderActions;

    beforeEach(() => {
      actions = new HeaderActions();
    });

    it('should create an action when changeSearchActive() is called', () => {
      let searchActive:boolean = true;
      expect(actions.changeSearchActive(searchActive))
        .toEqual({
          type: HeaderActions.ACTIVATE_SEARCH,
          payload: searchActive
        });
    });

    it('should create an action when changeSearch() is called', () => {
      let search:string = 'search';
      expect(actions.changeSearch(search))
        .toEqual({
          type: HeaderActions.CHANGE_SEARCH,
          payload: search
        });
    });

    it('should create an action when changeSidebar() is called', () => {
      let sidebar:boolean = true;
      expect(actions.changeSidebar(sidebar))
        .toEqual({
          type: HeaderActions.CHANGE_SIDEBAR,
          payload: sidebar
        });
    });
  });
}
