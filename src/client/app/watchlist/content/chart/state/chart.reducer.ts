import { ActionReducer, Action } from '@ngrx/store';
import { ChartStateInterface, ChartInitialState } from './chart.state';
import { ChartActions } from './chart.actions';

const initialState:ChartStateInterface = new ChartInitialState() as ChartStateInterface;

export const chartReducer:ActionReducer<ChartStateInterface> =
  (state:ChartStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case ChartActions.SELECT_POINT:
      return state.set('point', action.payload);
    case ChartActions.FETCH_FULFILLED:
      return state.set('data', action.payload);
    case ChartActions.FETCH_LOADER:
      return state.set('loader', action.payload);
    case ChartActions.FETCH_ERROR:
      return state.set('error', action.payload);
    default:
      return state;
  }
};
