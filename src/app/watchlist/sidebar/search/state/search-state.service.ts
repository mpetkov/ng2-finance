import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {CoreApiStateService} from '../../../../shared/core/state/api-state.service';
import {SearchActions} from './search-actions';
import {SearchStateKeys} from './search-state';

@Injectable()
export class SearchStateService extends CoreApiStateService {
  constructor(public store$: Store<any>,
              public actions: SearchActions) {
    super(store$, SearchStateKeys.StateName, actions);
  }
}
