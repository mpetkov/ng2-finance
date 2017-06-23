import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {CoreStateService} from '../../core/state/state.service';
import {HeaderActions} from './header-actions';
import {HeaderStateKeys} from './header-state';
import 'rxjs/add/operator/let';

@Injectable()
export class HeaderStateService extends CoreStateService {
  searchActive$: Observable<boolean>;
  search$: Observable<string>;
  sidebar$: Observable<boolean>;
  preloader$: Observable<boolean>;

  constructor(public store$: Store<any>,
              private actions: HeaderActions) {
    super();
    this.stateName = HeaderStateKeys.StateName;
    this.searchActive$ = store$.let(this.getState(HeaderStateKeys.SearchActive));
    this.search$ = store$.let(this.getState(HeaderStateKeys.Search));
    this.sidebar$ = store$.let(this.getState(HeaderStateKeys.Sidebar));
    this.preloader$ = store$.let(this.getState(HeaderStateKeys.Preloader));
  }

  changeSearchActive(searchActive: boolean) {
    this.store$.dispatch(this.actions.changeSearchActive(searchActive));
  }

  changeSearch(search: string) {
    this.store$.dispatch(this.actions.changeSearch(search));
  }

  changeSidebar(sidebar: boolean) {
    this.store$.dispatch(this.actions.changeSidebar(sidebar));
  }

  changePreloader(preloader: boolean) {
    this.store$.dispatch(this.actions.changePreloader(preloader));
  }
}
