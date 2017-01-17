import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { StockActions } from './stock/stock.actions';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class StocksStateService {
  watchlist$: Observable<string[]>;
  stock$: Observable<string>;

  constructor(private store$: Store) {
    this.watchlist$ = store$.let(this.getWatchlist());
    this.stock$ = store$.let(this.getStock());
  }

  changeStock(stock:string) {
    this.store$.dispatch(StockActions.select(stock));
  }

  private getWatchlist(): any {
    return state$ => state$
      .map(state => state.watchlist.symbols)
      .distinctUntilChanged();
  }

  private getStock(): any {
    return state$ => state$
      .map(state => state.stock.symbol)
      .distinctUntilChanged();
  }
}
