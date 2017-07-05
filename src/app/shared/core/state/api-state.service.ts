import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {CoreApiErrorInterface, CoreApiStateKeys} from './api-state';
import {CoreStateService} from './state.service';
import 'rxjs/add/operator/let';

@Injectable()
export class CoreApiStateService extends CoreStateService {
  data$: Observable<any[]>;
  loader$: Observable<boolean>;
  error$: Observable<CoreApiErrorInterface>;

  constructor(protected store$: Store<any>,
              protected stateName: string,
              protected actions: any) {
    super();
    this.data$ = store$.let(this.getState(CoreApiStateKeys.Data));
    this.loader$ = store$.let(this.getState(CoreApiStateKeys.Loader));
    this.error$ = store$.let(this.getState(CoreApiStateKeys.Error));
  }

  fetchFulfilled(data: any[]) {
    this.store$.dispatch(this.actions.fetchFulfilled(data));
  }

  fetchLoader(loader: boolean) {
    this.store$.dispatch(this.actions.fetchLoader(loader));
  }

  fetchError(error: CoreApiErrorInterface) {
    this.store$.dispatch(this.actions.fetchError(error));
  }
}
