import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
  SidebarTypeEnum,
  SidebarActions,
  StockActions,
  WatchlistActions
} from './index';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class SidebarStateService {
  type$:Observable<SidebarTypeEnum>;
  watchlist$:Observable<string[]>;
  stock$:Observable<string>;
  stocks$:Observable<any[]>;
  search$:Observable<any[]>;

  constructor(private store$:Store<any>) {
    this.type$ = store$.let(this.getType());
    this.watchlist$ = store$.let(this.getWatchlist());
    this.stock$ = store$.let(this.getStock());
    this.stocks$ = store$.let(this.getStocks());
    this.search$ = store$.let(this.getSearch());
  }

  changeType(type:SidebarTypeEnum) {
    this.store$.dispatch(SidebarActions.changeType(type));
  }

  changeStock(stock:any) {
    this.store$.dispatch(StockActions.changeStock(stock.symbol));
    this.store$.dispatch(StockActions.changeStockData(stock));
  }

  deleteStock(stock:string) {
    this.store$.dispatch(WatchlistActions.deleteStock(stock));
  }

  fetchStocksSearchFulfilled(data:any[]) {
    this.store$.dispatch(WatchlistActions.fetchStocksSearchFulfilled(data));
  }

  private getType():any {
    return (state$:any) => state$
      .map((state:any) => state.sidebar.type)
      .distinctUntilChanged();
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

  private getSearch():any {
    return (state$:any) => state$
      .map((state:any) => state.watchlist.search)
      .distinctUntilChanged();
  }
}
