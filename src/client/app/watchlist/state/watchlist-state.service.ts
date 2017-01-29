import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { StockActions } from './index';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class WatchlistStateService {
  stock$:Observable<any>;
  stockSymbol$:Observable<string>;

  constructor(private store$:Store<any>) {
    this.stock$ = store$.let(this.getStock());
    this.stockSymbol$ = store$.let(this.getStockSymbol());
  }

  changeStock(stock:any) {
    this.store$.dispatch(StockActions.changeData(stock));
  }

  changeStockSymbol(symbol:string) {
    this.store$.dispatch(StockActions.change(symbol));
  }

  private getStock():any {
    return (state$:any) => state$
      .map((state:any) => state.stock.data)
      .distinctUntilChanged();
  }

  private getStockSymbol():any {
    return (state$:any) => state$
      .map((state:any) => state.stock.symbol)
      .distinctUntilChanged();
  }
}
