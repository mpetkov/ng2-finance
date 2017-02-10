import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CoreStateService } from '../../core/index';
import {
  WatchlistActions,
  WatchlistStateKeys
} from './index';
import 'rxjs/add/operator/let';

@Injectable()
export class WatchlistStateService extends CoreStateService {
  stockData$:Observable<any>;
  stock$:Observable<string>;

  constructor(protected store$:Store<any>) {
    super(store$);
    this.stockData$ = store$.let(this.getState('watchlist', WatchlistStateKeys.StockData));
    this.stock$ = store$.let(this.getState('watchlist', WatchlistStateKeys.Stock));
  }

  changeStockData(data:any) {
    this.store$.dispatch(WatchlistActions.changeStockData(data));
  }

  changeStock(stock:string) {
    this.store$.dispatch(WatchlistActions.changeStock(stock));
  }
}
