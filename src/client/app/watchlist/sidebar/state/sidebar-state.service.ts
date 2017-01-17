import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SidebarTypeEnum } from './sidebar.state';
import { SidebarActions } from './sidebar.actions';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class SidebarStateService {
  type$:Observable<SidebarTypeEnum>;

  constructor(private store$:Store<any>) {
    this.type$ = store$.let(this.getType());
  }

  changeType(type:SidebarTypeEnum) {
    this.store$.dispatch(SidebarActions.changeType(type));
  }

  private getType():any {
    return (state$:any) => state$
      .map((state:any) => state.sidebar.type)
      .distinctUntilChanged();
  }
}
