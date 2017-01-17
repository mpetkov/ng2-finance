import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { StockActions } from './stock/stock.actions';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class StocksStateService {
  watchlist$:Observable<string[]>;
  stock$:Observable<string>;
  stocks$:Observable<any[]>;

  constructor(private store$:Store<any>) {
    this.watchlist$ = store$.let(this.getWatchlist());
    this.stock$ = store$.let(this.getStock());
    this.stocks$ = store$.let(this.getStocks());
  }

  changeStock(stock:string) {
    this.store$.dispatch(StockActions.select(stock));
  }

  private getWatchlist():any {
    return (state$:any) => state$
      .map((state:any) => state.watchlist.symbols)
      .distinctUntilChanged();
  }

  private getStock():any {
    return (state$:any) => state$
      .map((state:any) => state.stock.symbol)
      .distinctUntilChanged();
  }

  private getStocks():any {
    return (state$:any) => state$
      .map((state:any) => state.watchlist.data)
      .distinctUntilChanged();
  }
}
