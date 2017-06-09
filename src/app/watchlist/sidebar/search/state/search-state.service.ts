import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreApiStateService } from '../../../../core/state/api-state.service';
import { SearchActions } from './search.actions';

@Injectable()
export class SearchStateService extends CoreApiStateService {
  constructor(public store$:Store<any>,
              public actions: SearchActions) {
    super(store$, 'search', actions);
  }
}
