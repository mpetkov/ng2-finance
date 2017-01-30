import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ChartActions } from './chart.actions';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class ChartStateService {
  point$:Observable<any>;
  data$:Observable<any[]>;
  loader$:Observable<boolean>;
  error$:Observable<string>;

  constructor(private store$:Store<any>) {
    this.point$ = store$.let(this.getPoint());
    this.data$ = store$.let(this.getData());
    this.loader$ = store$.let(this.getLoader());
    this.error$ = store$.let(this.getError());
  }

  selectPoint(point:any) {
    this.store$.dispatch(ChartActions.selectPoint(point));
  }

  fetchFulfilled(data:any[]) {
    this.store$.dispatch(ChartActions.fetchFulfilled(data));
  }

  fetchLoader(loader:boolean) {
    this.store$.dispatch(ChartActions.fetchLoader(loader));
  }

  fetchError(error:string) {
    this.store$.dispatch(ChartActions.fetchError(error));
  }

  private getPoint():any {
    return (state$:any) => state$
      .map((state:any) => state.chart.point)
      .distinctUntilChanged();
  }

  private getData():any {
    return (state$:any) => state$
      .map((state:any) => state.chart.data)
      .distinctUntilChanged();
  }

  private getLoader():any {
    return (state$:any) => state$
      .map((state:any) => state.chart.loader)
      .distinctUntilChanged();
  }

  private getError():any {
    return (state$:any) => state$
      .map((state:any) => state.chart.error)
      .distinctUntilChanged();
  }
}
