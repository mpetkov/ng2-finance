import {TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import {FavoritesActions} from './favorites-actions';
import {favoritesReducer} from './favorites-reducer';
import {FavoritesStateService} from './favorites-state.service';
import {StockDataInterface} from '../../../state/watchlist-state';

describe('FavoritesStateService', () => {
  let actions: any;
  let service: any;
  let store: Store<any>;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({favorites: favoritesReducer})
      ],
      providers: [
        FavoritesActions,
        FavoritesStateService
      ]
    });

    actions = injector.get(FavoritesActions);
    service = injector.get(FavoritesStateService);
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

  it('should stream the current data from store', () => {
    let count = 0;
    let state: any = null;

    service['data$'].subscribe((value: any) => {
      count++;
      state = value;
    });

    // auto-emitting initial value
    expect(count).toEqual(1);
    expect(state).toEqual([]);

    // state 1
    store.dispatch(actions.fetchFulfilled([{symbol: 'a'}]));
    expect(count).toEqual(2);
    expect(state).toEqual([{symbol: 'a', index: 999}]);

    // state 2
    store.dispatch(actions.fetchFulfilled([{symbol: 'b'}]));
    expect(count).toEqual(3);
    expect(state).toEqual([{symbol: 'b', index: 999}]);

    // dispatching unrelated action: should not emit
    store.dispatch({type: 'UNDEFINED'});
    expect(count).toEqual(3);
  });

  it('should stream the current loader from store', () => {
    checkStream('loader', 'fetchLoader', false, true, false);
  });

  it('should stream the current error from store', () => {
    checkStream('error', 'fetchError', null, 'a', 'b');
  });

  it('should stream the current order from store', () => {
    checkStream('order', 'changeOrder', [], ['a'], ['b']);
  });

  it('should call store.dispatch() with FETCH_FULFILLED action', () => {
    spyOn(store, 'dispatch');
    const state: StockDataInterface[] = [{symbol: 'a'}];
    service.fetchFulfilled(state);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(actions.fetchFulfilled(state));
  });

  it('should call store.dispatch() with FETCH_LOADER action', () => {
    spyOn(store, 'dispatch');
    const state = true;
    service.fetchLoader(state);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(actions.fetchLoader(state));
  });

  it('should call store.dispatch() with FETCH_ERROR action', () => {
    spyOn(store, 'dispatch');
    const state = 'a';
    service.fetchError(state);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(actions.fetchError(state));
  });

  it('should call store.dispatch() with CHANGE_ORDER action', () => {
    spyOn(store, 'dispatch');
    const state: string[] = ['a'];
    service.changeOrder(state);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(actions.changeOrder(state));
  });

  it('should call store.dispatch() with SORT_DATA action', () => {
    spyOn(store, 'dispatch');
    service.sortData();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(actions.sortData());
  });
});
