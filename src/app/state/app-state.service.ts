import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CoreStateService } from '../core/state/state.service';
import { AppActions } from './app.actions';
import { AppStateKeys } from './app.state';
import 'rxjs/add/operator/let';

@Injectable()
export class AppStateService extends CoreStateService {
  preloader$:Observable<boolean>;

  constructor(public store$:Store<any>,
              private actions: AppActions) {
    super(store$);
    this.preloader$ = store$.let(this.getState('app', AppStateKeys.Preloader));
  }

  changePreloader(preloader:boolean) {
    this.store$.dispatch(this.actions.changePreloader(preloader));
  }
}
