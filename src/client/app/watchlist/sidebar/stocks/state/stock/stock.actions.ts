import { Action } from '@ngrx/store';

export class StockActions {
  static SELECT = 'WATCHLIST:SELECT';

  static select(payload: string): Action {
    return {
      type: StockActions.SELECT,
      payload: payload
    };
  }
}
