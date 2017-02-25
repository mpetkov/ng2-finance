/* tslint:disable:no-unused-variable */
import { AppActions } from './index';

export function main() {
  describe('AppActions', () => {
    let actions: AppActions;

    beforeEach(() => {
      actions = new AppActions();
    });

    it('should create an action when changePreloader() is called', () => {
      let preloader:boolean = true;
      expect(actions.changePreloader(preloader))
        .toEqual({
          type: AppActions.CHANGE_PRELOADER,
          payload: preloader
        });
    });
  });
}
