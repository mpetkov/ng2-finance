import { ActionReducer, Action } from '@ngrx/store';
import { ChartStateInterface, ChartInitialState } from './chart.state';
import { ChartActions } from './chart.actions';

const initialState:ChartStateInterface = new ChartInitialState() as ChartStateInterface;

export const chartReducer:ActionReducer<ChartStateInterface> =
  (state:ChartStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case ChartActions.FETCH_CHART_FULFILLED:
      return state.set('data', action.payload);
    case ChartActions.CHANGE_SELECTED_POINT:
      return state.set('selectedPoint', action.payload);
    default:
      return state;
  }
};
