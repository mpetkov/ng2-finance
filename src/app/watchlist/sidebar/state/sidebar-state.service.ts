import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CoreStateService } from '../../../core/state/state.service';
import { SidebarActions } from './sidebar.actions';
import { SidebarStateKeys, SidebarTypeEnum } from './sidebar.state';
import 'rxjs/add/operator/let';

@Injectable()
export class SidebarStateService extends CoreStateService {
  type$:Observable<SidebarTypeEnum>;

  constructor(public store$:Store<any>,
              public actions: SidebarActions) {
    super(store$);
    this.type$ = store$.let(this.getState('sidebar', SidebarStateKeys.Type));
  }

  changeType(type:SidebarTypeEnum) {
    this.store$.dispatch(this.actions.changeType(type));
  }
}
