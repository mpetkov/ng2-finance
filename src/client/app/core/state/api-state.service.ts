import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CoreApiStateKeys } from './api.state';
import { CoreStateService } from "./state.service";
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class CoreApiStateService extends CoreStateService {
  data$:Observable<any[]>;
  loader$:Observable<boolean>;
  error$:Observable<string>;

  constructor(protected store$:Store<any>,
              protected stateName:string,
              private actions:any) {
    super(store$);
    this.data$ = store$.let(this.getState(stateName, CoreApiStateKeys.Data));
    this.loader$ = store$.let(this.getState(stateName, CoreApiStateKeys.Loader));
    this.error$ = store$.let(this.getState(stateName, CoreApiStateKeys.Error));
  }

  fetchFulfilled(data:any[]) {
    this.store$.dispatch(this.actions.fetchFulfilled(data));
  }

  fetchLoader(loader:boolean) {
    this.store$.dispatch(this.actions.fetchLoader(loader));
  }

  fetchError(error:string) {
    this.store$.dispatch(this.actions.fetchError(error));
  }
}
