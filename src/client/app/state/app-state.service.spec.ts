/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import {
  AppActions,
  appReducer,
  AppStateService
} from './index';

export function main() {
  describe('AppStateService', () => {
    let actions:any;
    let service:any;
    let store:Store<any>;

    beforeEach(() => {
      let injector = TestBed.configureTestingModule({
        imports: [
          StoreModule.provideStore({app: appReducer})
        ],
        providers: [
          AppActions,
          AppStateService
        ]
      });

      actions = injector.get(AppActions);
      service = injector.get(AppStateService);
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

    it('should stream the current preloader from store', () => {
      checkStream('preloader', 'changePreloader', true, false, true);
    });

    it('should call store.dispatch() with CHANGE_PRELOADER action', () => {
      spyOn(store, 'dispatch');
      let state:boolean = false;
      service.changePreloader(state);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(actions.changePreloader(state));
    });
  });
}
