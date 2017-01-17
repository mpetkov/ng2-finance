import { ActionReducer, Action } from '@ngrx/store';
import { StockActions } from './stock.actions';
import { StockStateInterface, StockInitialState } from './stock.state';

export const initialState:StockStateInterface = new StockInitialState() as StockStateInterface;

export const stockReducer: ActionReducer<StockStateInterface>  = (state: StockStateInterface = initialState, action: Action = null) => {
  switch (action.type) {
    case StockActions.SELECT:
      return state.set('symbol', action.payload);
    default:
      return state;
  }
};
