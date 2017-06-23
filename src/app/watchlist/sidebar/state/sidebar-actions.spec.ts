import {SidebarActions} from './sidebar-actions';
import {SidebarTypeEnum} from './sidebar-state';

describe('SidebarActions', () => {
  let actions: SidebarActions;

  beforeEach(() => {
    actions = new SidebarActions();
  });

  it('should create an action when changeType() is called', () => {
    const type: SidebarTypeEnum = SidebarTypeEnum.Add;
    expect(actions.changeType(type))
      .toEqual({
        type: SidebarActions.CHANGE_TYPE,
        payload: type
      });
  });
});
