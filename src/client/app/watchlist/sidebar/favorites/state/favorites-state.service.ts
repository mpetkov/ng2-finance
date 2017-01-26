import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FavoritesActions } from './index';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class FavoritesStateService {
  symbols$:Observable<string[]>;
  data$:Observable<any[]>;
  loader$:Observable<boolean>;
  error$:Observable<string>;
  order$:Observable<string[]>;

  constructor(private store$:Store<any>) {
    this.symbols$ = store$.let(this.getSymbols());
    this.data$ = store$.let(this.getData());
    this.loader$ = store$.let(this.getLoader());
    this.error$ = store$.let(this.getError());
    this.order$ = store$.let(this.getOrder());
  }

  fetchFulfilled(data:any[]) {
    this.store$.dispatch(FavoritesActions.fetchFulfilled(data));
  }

  fetchLoader(loader:boolean) {
    this.store$.dispatch(FavoritesActions.fetchLoader(loader));
  }

  fetchError(error:string) {
    this.store$.dispatch(FavoritesActions.fetchError(error));
  }

  delete(symbols:string[]) {
    this.store$.dispatch(FavoritesActions.delete(symbols));
  }

  add(symbol:string) {
    this.store$.dispatch(FavoritesActions.add(symbol));
  }

  changeOrder(order:string[]) {
    this.store$.dispatch(FavoritesActions.changeOrder(order));
  }

  private getSymbols():any {
    return (state$:any) => state$
      .map((state:any) => state.favorites.symbols)
      .distinctUntilChanged();
  }

  private getData():any {
    return (state$:any) => state$
      .map((state:any) => state.favorites.data)
      .distinctUntilChanged();
  }

  private getLoader():any {
    return (state$:any) => state$
      .map((state:any) => state.favorites.loader)
      .distinctUntilChanged();
  }

  private getError():any {
    return (state$:any) => state$
      .map((state:any) => state.favorites.error)
      .distinctUntilChanged();
  }

  private getOrder():any {
    return (state$:any) => state$
      .map((state:any) => state.favorites.order)
      .distinctUntilChanged();
  }
}
