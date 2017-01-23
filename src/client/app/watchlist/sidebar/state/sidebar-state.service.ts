import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
  SidebarTypeEnum,
  SidebarActions,
  StockActions
} from './index';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class SidebarStateService {
  type$:Observable<SidebarTypeEnum>;
  stock$:Observable<string>;
  stocks$:Observable<any[]>;
  search$:Observable<any[]>;

  constructor(private store$:Store<any>) {
    this.type$ = store$.let(this.getType());
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

  private getType():any {
    return (state$:any) => state$
      .map((state:any) => state.sidebar.type)
      .distinctUntilChanged();
  }

  private getStock():any {
    return (state$:any) => state$
      .map((state:any) => state.stock.symbol)
      .distinctUntilChanged();
  }

  private getStocks():any {
    return (state$:any) => state$
      .map((state:any) => state.favorites.data)
      .distinctUntilChanged();
  }

  private getSearch():any {
    return (state$:any) => state$
      .map((state:any) => state.favorites.search)
      .distinctUntilChanged();
  }
}
