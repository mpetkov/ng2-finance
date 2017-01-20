import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NewsActions } from './news.actions';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class NewsStateService {
  data$:Observable<any[]>;

  constructor(private store$:Store<any>) {
    this.data$ = store$.let(this.getData());
  }

  fetchNewsFulfilled(data:any[]) {
    this.store$.dispatch(NewsActions.fetchNewsFulfilled(data));
  }

  private getData():any {
    return (state$:any) => state$
      .map((state:any) => state.news.data)
      .distinctUntilChanged();
  }
}
