import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewsActions } from './news.actions';
import { CoreApiStateService } from '../../../../core/index';

@Injectable()
export class NewsStateService extends CoreApiStateService {
  constructor(public store$:Store<any>) {
    super(store$, 'news', NewsActions);
  }
}
