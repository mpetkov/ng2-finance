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

  constructor(private store$:Store<any>) {
    this.symbols$ = store$.let(this.getSymbols());
    this.data$ = store$.let(this.getData());
  }

  fetchFulfilled(data:any[]) {
    this.store$.dispatch(FavoritesActions.fetchFulfilled(data));
  }

  delete(symbols:string[]) {
    this.store$.dispatch(FavoritesActions.delete(symbols));
  }

  add(symbol:string) {
    this.store$.dispatch(FavoritesActions.add(symbol));
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
}
