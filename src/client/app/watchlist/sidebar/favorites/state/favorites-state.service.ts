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
  order$:Observable<string[]>;

  constructor(public store$:Store<any>,
              public actions: FavoritesActions) {
    super(store$, 'favorites', actions);
    this.order$ = store$.let(this.getState(this.stateName, FavoritesStateKeys.Order));
  }

  changeOrder(order:string[]) {
    this.store$.dispatch(this.actions.changeOrder(order));
  }

  sortData() {
    this.store$.dispatch(this.actions.sortData());
  }
}
