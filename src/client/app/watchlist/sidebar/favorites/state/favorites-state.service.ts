import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FavoritesActions } from './index';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class FavoritesStateService {
  favorites$:Observable<string[]>;

  constructor(private store$:Store<any>) {
    this.favorites$ = store$.let(this.getFavorites());
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

  private getFavorites():any {
    return (state$:any) => state$
      .map((state:any) => state.favorites.symbols)
      .distinctUntilChanged();
  }
}
