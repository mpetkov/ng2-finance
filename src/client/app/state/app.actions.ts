import { Action } from '@ngrx/store';

export class AppActions {
  static CHANGE_PRELOADER = 'APP:CHANGE_PRELOADER';

  changePreloader(preloader:boolean):Action {
    return {
      type: AppActions.CHANGE_PRELOADER,
      payload: preloader
    };
  }
}
