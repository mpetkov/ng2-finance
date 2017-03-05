/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import {
  ChartActions,
  chartReducer,
  ChartStateService,
  ChartDataInterface
} from './index';

export function main() {
  describe('ChartStateService', () => {
    let actions:any;
    let service:any;
    let store:Store<any>;

    beforeEach(() => {
      let injector = TestBed.configureTestingModule({
        imports: [
          StoreModule.provideStore({chart: chartReducer})
        ],
        providers: [
          ChartActions,
          ChartStateService
        ]
      });

      actions = injector.get(ChartActions);
      service = injector.get(ChartStateService);
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

    it('should stream the current data from store', () => {
      checkStream('data', 'fetchFulfilled', [], [], []);
    });

    it('should stream the current loader from store', () => {
      checkStream('loader', 'fetchLoader', false, true, false);
    });

    it('should stream the current error from store', () => {
      checkStream('error', 'fetchError', null, 'a', 'b');
    });

    it('should stream the current point from store', () => {
      checkStream('point', 'changePoint', {}, {close: 10}, {close: 20});
    });

    it('should stream the current range from store', () => {
      checkStream('range', 'changeRange', '3mo', 'a', 'b');
    });

    it('should call store.dispatch() with FETCH_FULFILLED action', () => {
      spyOn(store, 'dispatch');
      let state:ChartDataInterface[] = [{close: 10}];
      service.fetchFulfilled(state);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(actions.fetchFulfilled(state));
    });

    it('should call store.dispatch() with FETCH_LOADER action', () => {
      spyOn(store, 'dispatch');
      let state:boolean = true;
      service.fetchLoader(state);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(actions.fetchLoader(state));
    });

    it('should call store.dispatch() with FETCH_ERROR action', () => {
      spyOn(store, 'dispatch');
      let state:string = 'a';
      service.fetchError(state);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(actions.fetchError(state));
    });

    it('should call store.dispatch() with CHANGE_POINT action', () => {
      spyOn(store, 'dispatch');
      let state:ChartDataInterface = {close: 10};
      service.changePoint(state);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(actions.changePoint(state));
    });

    it('should call store.dispatch() with CHANGE_RANGE action', () => {
      spyOn(store, 'dispatch');
      let state:string = 'a';
      service.changeRange(state);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(actions.changeRange(state));
    });
  });
}
