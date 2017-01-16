import { ActionReducer, Action } from '@ngrx/store';
import { StocksActions } from "./stocks.actions";
import { StocksStateInterface, StocksInitialState } from "./stocks.state";

export const initialState:StocksStateInterface = new StocksInitialState() as StocksStateInterface;

export const stocksReducer: ActionReducer<StocksStateInterface>  = (state: StocksStateInterface = initialState, action: Action = null) => {
  switch (action.type) {
    case StocksActions.STOCK:
      return state.set('stock', action.payload);
    default:
      return state;
  }
}
