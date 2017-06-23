import {TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import {WatchlistStateService} from './watchlist-state.service';
import {WatchlistActions} from './watchlist-actions';
import {watchlistReducer} from './watchlist-reducer';
import {StockDataInterface} from './watchlist-state';

describe('WatchlistStateService', () => {
  let actions: any;
  let service: any;
  let store: Store<any>;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({watchlist: watchlistReducer})
      ],
      providers: [
        WatchlistActions,
        WatchlistStateService
      ]
    });

    actions = injector.get(WatchlistActions);
    service = injector.get(WatchlistStateService);
    store = injector.get(Store);
  });

  function checkStream(type: string, action: string, initialValue: any, input1: any, input2: any, state1: any, state2: any) {
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
    store.dispatch(actions[action](input1));
    expect(count).toEqual(2);
    expect(state).toEqual(state1);

    // same state: should not emit
    store.dispatch(actions[action](input1));
    expect(count).toEqual(2);

    // state 2
    store.dispatch(actions[action](input2));
    expect(count).toEqual(3);
    expect(state).toEqual(state2);

    // dispatching unrelated action: should not emit
    store.dispatch({type: 'UNDEFINED'});
    expect(count).toEqual(3);
  }

  it('should stream the current stockData from store', () => {
    checkStream('stockData', 'changeStockData', {}, {symbol: 'a'}, {symbol: 'b'}, {symbol: 'a'}, {symbol: 'b'});
  });

  it('should stream the current stock from store', () => {
    checkStream('stock', 'changeStock', null, 'a', 'b', 'a', 'b');
  });

  it('should stream the current favorites from store', () => {
    checkStream('favorites', 'addFavorite', ['AAPL', 'GOOG', 'FB'], 'a', 'b',
      ['a', 'AAPL', 'GOOG', 'FB'], ['b', 'a', 'AAPL', 'GOOG', 'FB']);
  });

  it('should stream the current highlights from store', () => {
    checkStream('highlights', 'changeHighlights', {}, {a: {price: 'a'}}, {a: {price: 'b'}}, {a: {price: 'a'}}, {a: {price: 'b'}});
  });

  it('should call store.dispatch() with CHANGE_STOCK_DATA action', () => {
    spyOn(store, 'dispatch');
    const state: StockDataInterface = {symbol: 'a'};
    service.changeStockData(state);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(actions.changeStockData(state));
  });

  it('should call store.dispatch() with CHANGE_STOCK action', () => {
    spyOn(store, 'dispatch');
    const state = 'a';
    service.changeStock(state);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(actions.changeStock(state));
  });

  it('should call store.dispatch() with ADD_FAVORITE action', () => {
    spyOn(store, 'dispatch');
    const state = 'a';
    service.addFavorite(state);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(actions.addFavorite(state));
  });

  it('should call store.dispatch() with DELETE_FAVORITES action', () => {
    spyOn(store, 'dispatch');
    const state: string[] = ['a'];
    service.deleteFavorites(state);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(actions.deleteFavorites(state));
  });

  it('should call store.dispatch() with CHANGE_HIGHLIGHTS action', () => {
    spyOn(store, 'dispatch');
    const state: any = {a: {price: 'a'}};
    service.changeHighlights(state);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(actions.changeHighlights(state));
  });
});
