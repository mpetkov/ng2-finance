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

  constructor(private store$:Store<any>) {
    this.data$ = store$.let(this.getData());
  }

  fetchFulfilled(data:any[]) {
    this.store$.dispatch(SearchActions.fetchFulfilled(data));
  }

  private getData():any {
    return (state$:any) => state$
      .map((state:any) => state.search.data)
      .distinctUntilChanged();
  }
}
