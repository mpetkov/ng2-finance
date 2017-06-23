import {TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import {SidebarActions} from './sidebar-actions';
import {sidebarReducer} from './sidebar-reducer';
import {SidebarStateService} from './sidebar-state.service';
import {SidebarTypeEnum} from './sidebar-state';

describe('SidebarStateService', () => {
  let actions: any;
  let service: any;
  let store: Store<any>;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({sidebar: sidebarReducer})
      ],
      providers: [
        SidebarActions,
        SidebarStateService
      ]
    });

    actions = injector.get(SidebarActions);
    service = injector.get(SidebarStateService);
    store = injector.get(Store);
  });

  function checkStream(type: string, action: string, initialValue: any, state1: any, state2: any) {
    let count = 0;
    let state: any = null;

    service[type + '$'].subscribe((value: any) => {
      count++;
      state = value;
    });

    // auto-emitting initial value
    expect(count).toEqual(1);
    expect(state).toEqual(initialValue);

    // state 1
    store.dispatch(actions[action](state1));
    expect(count).toEqual(2);
    expect(state).toEqual(state1);

    // same state: should not emit
    store.dispatch(actions[action](state1));
    expect(count).toEqual(2);

    // state 2
    store.dispatch(actions[action](state2));
    expect(count).toEqual(3);
    expect(state).toEqual(state2);

    // dispatching unrelated action: should not emit
    store.dispatch({type: 'UNDEFINED'});
    expect(count).toEqual(3);
  }

  it('should stream the current type from store', () => {
    checkStream('type', 'changeType', SidebarTypeEnum.List, SidebarTypeEnum.Add, SidebarTypeEnum.Edit);
  });

  it('should call store.dispatch() with CHANGE_TYPE action', () => {
    spyOn(store, 'dispatch');
    const state: SidebarTypeEnum = SidebarTypeEnum.Add;
    service.changeType(state);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(actions.changeType(state));
  });
});
