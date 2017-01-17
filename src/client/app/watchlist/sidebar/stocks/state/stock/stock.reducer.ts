import { ActionReducer, Action } from '@ngrx/store';
import { StockActions } from './stock.actions';
import { StockStateInterface, StockInitialState } from './stock.state';

const initialState:StockStateInterface = new StockInitialState() as StockStateInterface;

export const stockReducer:ActionReducer<StockStateInterface> = (state:StockStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case StockActions.CHANGE_STOCK:
      return state.set('symbol', action.payload);
    case StockActions.CHANGE_STOCK_DATA:
      return state.set('data', action.payload);
    default:
      return state;
  }
};
