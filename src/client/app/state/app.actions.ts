import { Action } from '@ngrx/store';

export class AppActions {
  static CHANGE_PRELOADER = 'APP:CHANGE_PRELOADER';

  static changePreloader(preloader:boolean):Action {
    return {
      type: this.CHANGE_PRELOADER,
      payload: preloader
    };
  }
}
