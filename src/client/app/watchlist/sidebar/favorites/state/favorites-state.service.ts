import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CoreApiStateService } from '../../../../core/index';
import {
  FavoritesActions,
  FavoritesStateKeys
} from './index';
import 'rxjs/add/operator/let';

@Injectable()
export class FavoritesStateService extends CoreApiStateService {
  symbols$:Observable<string[]>;
  order$:Observable<string[]>;

  constructor(public store$:Store<any>) {
    super(store$, 'favorites', FavoritesActions);
    this.symbols$ = store$.let(this.getState(this.stateName, FavoritesStateKeys.Symbols));
    this.order$ = store$.let(this.getState(this.stateName, FavoritesStateKeys.Order));
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
}
