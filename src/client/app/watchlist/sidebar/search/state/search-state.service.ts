import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreApiStateService } from '../../../../core/index';
import { SearchActions } from './index';

@Injectable()
export class SearchStateService extends CoreApiStateService {
  constructor(public store$:Store<any>) {
    super(store$, 'search', SearchActions);
  }
}
