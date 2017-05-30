/* tslint:disable:no-unused-variable */
import {
  SidebarActions,
  SidebarTypeEnum
} from './index';

export function main() {
  describe('SidebarActions', () => {
    let actions: SidebarActions;

    beforeEach(() => {
      actions = new SidebarActions();
    });

      it('should create an action when changeType() is called', () => {
        let type:SidebarTypeEnum = SidebarTypeEnum.Add;
        expect(actions.changeType(type))
          .toEqual({
            type: SidebarActions.CHANGE_TYPE,
            payload: type
          });
      });
  });
}
