import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class CoreStateService {
  constructor(protected store$:Store<any>) {
  }

  protected getState(stateName:string, key:string):any {
    return (state$:any) => state$
      .map((state:any) => state[stateName][key])
      .distinctUntilChanged();
  }
}
