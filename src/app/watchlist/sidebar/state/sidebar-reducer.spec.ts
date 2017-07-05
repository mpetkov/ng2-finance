import {SidebarActions} from './sidebar-actions';
import {sidebarReducer} from './sidebar-reducer';
import {SidebarInitialState, SidebarStateInterface, SidebarTypeEnum} from './sidebar-state';

describe('sidebarReducer', () => {
  let actions: SidebarActions;

  beforeEach(() => {
    actions = new SidebarActions();
  });

  it('should return state unchanged', () => {
    let state: SidebarStateInterface = new SidebarInitialState() as SidebarStateInterface;
    state = sidebarReducer(state, {type: 'UNKNOWN'});
    expect(state).toEqual(new SidebarInitialState());
  });

  it('should set type to provided value', () => {
    let state: SidebarStateInterface = new SidebarInitialState({type: SidebarTypeEnum.List}) as SidebarStateInterface;
    state = sidebarReducer(state, actions.changeType(SidebarTypeEnum.Add));
    expect(state.type).toBe(SidebarTypeEnum.Add);
  });
});
