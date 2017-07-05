import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {InfoActions} from './info-actions';
import {CoreApiStateService} from '../../../../shared/core/state/api-state.service';
import {InfoStateKeys} from './info-state';

@Injectable()
export class InfoStateService extends CoreApiStateService {
  constructor(public store$: Store<any>,
              public actions: InfoActions) {
    super(store$, InfoStateKeys.StateName, actions);
  }
}
