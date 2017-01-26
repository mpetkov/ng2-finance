import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SearchActions } from './index';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class SearchStateService {
  data$:Observable<any[]>;
  loader$:Observable<boolean>;
  error$:Observable<string>;

  constructor(private store$:Store<any>) {
    this.data$ = store$.let(this.getData());
    this.loader$ = store$.let(this.getLoader());
    this.error$ = store$.let(this.getError());
  }

  fetchFulfilled(data:any[]) {
    this.store$.dispatch(SearchActions.fetchFulfilled(data));
  }

  fetchLoader(loader:boolean) {
    this.store$.dispatch(SearchActions.fetchLoader(loader));
  }

  fetchError(error:string) {
    this.store$.dispatch(SearchActions.fetchError(error));
  }

  private getData():any {
    return (state$:any) => state$
      .map((state:any) => state.search.data)
      .distinctUntilChanged();
  }

  private getLoader():any {
    return (state$:any) => state$
      .map((state:any) => state.search.loader)
      .distinctUntilChanged();
  }

  private getError():any {
    return (state$:any) => state$
      .map((state:any) => state.search.error)
      .distinctUntilChanged();
  }
}
