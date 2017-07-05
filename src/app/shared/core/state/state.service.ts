import {get} from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

export class CoreStateService {
  protected stateName: string;

  protected getState(key: string): any {
    return (state$: any) => state$
      .map((state: any) => get(state, this.stateName + '.' + key))
      .distinctUntilChanged();
  }
}
