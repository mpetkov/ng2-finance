import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {NewsActions} from './news-actions';
import {CoreApiStateService} from '../../../../shared/core/state/api-state.service';
import {NewsStateKeys} from './news-state';

@Injectable()
export class NewsStateService extends CoreApiStateService {
  constructor(public store$: Store<any>,
              public actions: NewsActions) {
    super(store$, NewsStateKeys.StateName, actions);
  }
}
