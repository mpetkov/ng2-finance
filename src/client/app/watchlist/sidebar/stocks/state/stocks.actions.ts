import { Action } from '@ngrx/store';

export class StocksActions {
  static STOCK = 'STOCKS:SELECT_STOCK';

  static stock(payload: string): Action {
    return {
      type: StocksActions.STOCK,
      payload: payload
    };
  }
}
