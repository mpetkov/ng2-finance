import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CoreStateService } from '../../../core/index';
import {
  HeaderActions,
  HeaderStateKeys
} from './index';
import 'rxjs/add/operator/let';

@Injectable()
export class HeaderStateService extends CoreStateService {
  searchActive$:Observable<boolean>;
  search$:Observable<string>;

  constructor(public store$:Store<any>) {
    super(store$);
    this.searchActive$ = store$.let(this.getState('header', HeaderStateKeys.SearchActive));
    this.search$ = store$.let(this.getState('header', HeaderStateKeys.Search));
  }

  changeSearchActive(searchActive:boolean) {
    this.store$.dispatch(HeaderActions.changeSearchActive(searchActive));
  }

  changeSearch(search:string) {
    this.store$.dispatch(HeaderActions.changeSearch(search));
  }
}
