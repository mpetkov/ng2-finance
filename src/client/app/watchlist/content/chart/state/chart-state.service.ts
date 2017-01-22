import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ChartActions } from './chart.actions';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class ChartStateService {
  data$:Observable<any>;
  selectedPoint$:Observable<any>;

  constructor(private store$:Store<any>) {
    this.data$ = store$.let(this.getData());
    this.selectedPoint$ = store$.let(this.getSelectedPoint());
  }

  changeSelectedPoint(selectedPoint:any) {
    this.store$.dispatch(ChartActions.changeSelectedPoint(selectedPoint));
  }

  fetchChartFulfilled(data:any[]) {
    this.store$.dispatch(ChartActions.fetchChartFulfilled(data));
  }

  private getData():any {
    return (state$:any) => state$
      .map((state:any) => state.chart.data)
      .distinctUntilChanged();
  }

  private getSelectedPoint():any {
    return (state$:any) => state$
      .map((state:any) => state.chart.selectedPoint)
      .distinctUntilChanged();
  }
}
