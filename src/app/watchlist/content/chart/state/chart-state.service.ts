import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {CoreApiStateService} from '../../../../shared/core/state/api-state.service';
import {ChartDataInterface, ChartStateKeys} from './chart-state';
import {ChartActions} from './chart-actions';
import 'rxjs/add/operator/let';

@Injectable()
export class ChartStateService extends CoreApiStateService {
  point$: Observable<ChartDataInterface>;
  range$: Observable<string>;

  constructor(public store$: Store<any>,
              public actions: ChartActions) {
    super(store$, ChartStateKeys.StateName, actions);
    this.point$ = store$.let(this.getState(ChartStateKeys.Point));
    this.range$ = store$.let(this.getState(ChartStateKeys.Range));
  }

  changePoint(point: ChartDataInterface) {
    this.store$.dispatch(this.actions.changePoint(point));
  }

  changeRange(range: string) {
    this.store$.dispatch(this.actions.changeRange(range));
  }
}
