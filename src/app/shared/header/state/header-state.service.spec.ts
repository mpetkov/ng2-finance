/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import {
  HeaderActions,
  headerReducer,
  HeaderStateService
} from './index';

export function main() {
  describe('HeaderStateService', () => {
    let actions:any;
    let service:any;
    let store:Store<any>;

    beforeEach(() => {
      let injector = TestBed.configureTestingModule({
        imports: [
          StoreModule.provideStore({header: headerReducer})
        ],
        providers: [
          HeaderActions,
          HeaderStateService
        ]
      });

      actions = injector.get(HeaderActions);
      service = injector.get(HeaderStateService);
      store = injector.get(Store);
    });

    function checkStream(type:string, action:string, initialValue:any, state1:any, state2:any) {
      let count:number = 0;
      let state:any = null;

      service[type + '$'].subscribe((value:any) => {
        count++;
        state = value;
      });

      // auto-emitting initial value
      expect(count).toBe(1);
      expect(state).toBe(initialValue);

      // state 1
      store.dispatch(actions[action](state1));
      expect(count).toBe(2);
      expect(state).toBe(state1);

      // same state: should not emit
      store.dispatch(actions[action](state1));
      expect(count).toBe(2);

      // state 2
      store.dispatch(actions[action](state2));
      expect(count).toBe(3);
      expect(state).toBe(state2);

      // dispatching unrelated action: should not emit
      store.dispatch({type: 'UNDEFINED'});
      expect(count).toBe(3);
    }

    it('should stream the current searchActive from store', () => {
      checkStream('searchActive', 'changeSearchActive', false, true, false);
    });

    it('should stream the current search from store', () => {
      checkStream('search', 'changeSearch', null, 'a', 'b');
    });

    it('should stream the current sidebar from store', () => {
      checkStream('sidebar', 'changeSidebar', true, false, true);
    });

    it('should call store.dispatch() with ACTIVATE_SEARCH action', () => {
      spyOn(store, 'dispatch');
      let state:boolean = true;
      service.changeSearchActive(state);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(actions.changeSearchActive(state));
    });

    it('should call store.dispatch() with CHANGE_SEARCH action', () => {
      spyOn(store, 'dispatch');
      let state:string = 'a';
      service.changeSearch(state);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(actions.changeSearch(state));
    });

    it('should call store.dispatch() with CHANGE_SIDEBAR action', () => {
      spyOn(store, 'dispatch');
      let state:boolean = false;
      service.changeSidebar(state);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(actions.changeSidebar(state));
    });
  });
}
