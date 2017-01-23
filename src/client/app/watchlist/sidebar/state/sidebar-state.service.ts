import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
  SidebarTypeEnum,
  SidebarActions,
  StockActions,
  FavoritesActions
} from './index';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class SidebarStateService {
  type$:Observable<SidebarTypeEnum>;
  favorites$:Observable<string[]>;
  stock$:Observable<string>;
  stocks$:Observable<any[]>;
  search$:Observable<any[]>;

  constructor(private store$:Store<any>) {
    this.type$ = store$.let(this.getType());
    this.favorites$ = store$.let(this.getFavorites());
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

  deleteFavorites(stocks:string[]) {
    this.store$.dispatch(FavoritesActions.deleteFavorites(stocks));
  }

  addFavorite(stock:string) {
    this.store$.dispatch(FavoritesActions.addFavorite(stock));
  }

  fetchFavoritesSearchFulfilled(data:any[]) {
    this.store$.dispatch(FavoritesActions.fetchFavoritesSearchFulfilled(data));
  }

  fetchFavoritesFulfilled(data:any[]) {
    this.store$.dispatch(FavoritesActions.fetchFavoritesFulfilled(data));
  }

  private getType():any {
    return (state$:any) => state$
      .map((state:any) => state.sidebar.type)
      .distinctUntilChanged();
  }

  private getFavorites():any {
    return (state$:any) => state$
      .map((state:any) => state.favorites.symbols)
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
