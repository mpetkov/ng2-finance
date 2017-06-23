import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {CoreApiStateService} from '../../../../shared/core/state/api-state.service';
import {FavoritesActions} from './favorites-actions';
import {FavoritesStateKeys} from './favorites-state';
import 'rxjs/add/operator/let';

@Injectable()
export class FavoritesStateService extends CoreApiStateService {
  order$: Observable<string[]>;

  constructor(public store$: Store<any>,
              public actions: FavoritesActions) {
    super(store$, FavoritesStateKeys.StateName, actions);
    this.order$ = store$.let(this.getState(FavoritesStateKeys.Order));
  }

  changeOrder(order: string[]) {
    this.store$.dispatch(this.actions.changeOrder(order));
  }

  sortData() {
    this.store$.dispatch(this.actions.sortData());
  }
}
