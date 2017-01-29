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
  loader$:Observable<boolean>;
  error$:Observable<string>;

  constructor(private store$:Store<any>) {
    this.data$ = store$.let(this.getData());
    this.loader$ = store$.let(this.getLoader());
    this.error$ = store$.let(this.getError());
  }

  fetchFulfilled(data:any[]) {
    this.store$.dispatch(NewsActions.fetchFulfilled(data));
  }

  fetchLoader(loader:boolean) {
    this.store$.dispatch(NewsActions.fetchLoader(loader));
  }

  fetchError(error:string) {
    this.store$.dispatch(NewsActions.fetchError(error));
  }

  private getData():any {
    return (state$:any) => state$
      .map((state:any) => state.news.data)
      .distinctUntilChanged();
  }

  private getLoader():any {
    return (state$:any) => state$
      .map((state:any) => state.news.loader)
      .distinctUntilChanged();
  }

  private getError():any {
    return (state$:any) => state$
      .map((state:any) => state.news.error)
      .distinctUntilChanged();
  }
}
