import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CoreApiStateService } from '../../../../core/index';
import {
  ChartActions,
  ChartStateKeys,
  ChartDataInterface
} from './index';
import 'rxjs/add/operator/let';

@Injectable()
export class ChartStateService extends CoreApiStateService {
  point$:Observable<ChartDataInterface>;
  range$:Observable<string>;

  constructor(public store$:Store<any>,
              public actions:ChartActions) {
    super(store$, 'chart', actions);
    this.point$ = store$.let(this.getState(this.stateName, ChartStateKeys.Point));
    this.range$ = store$.let(this.getState(this.stateName, ChartStateKeys.Range));
  }

  changePoint(point:ChartDataInterface) {
    this.store$.dispatch(this.actions.changePoint(point));
  }

  changeRange(range:string) {
    this.store$.dispatch(this.actions.changeRange(range));
  }
}
