import {
  ActionReducer,
  Action
} from '@ngrx/store';
import { ChartInitialState } from './chart.state';
import {
  ChartActions,
  ChartStateKeys,
  ChartStateInterface
} from './index';

const initialState:ChartStateInterface = new ChartInitialState() as ChartStateInterface;

export const chartReducer:ActionReducer<ChartStateInterface> =
  (state:ChartStateInterface = initialState, action:Action = null) => {
    switch (action.type) {
      case ChartActions.CHANGE_POINT:
        return state.set(ChartStateKeys.Point, action.payload);
      case ChartActions.CHANGE_RANGE:
        return state.set(ChartStateKeys.Range, action.payload);
      case ChartActions.FETCH_FULFILLED:
        return state.set(ChartStateKeys.Data, action.payload);
      case ChartActions.FETCH_LOADER:
        return state.set(ChartStateKeys.Loader, action.payload);
      case ChartActions.FETCH_ERROR:
        return state.set(ChartStateKeys.Error, action.payload);
      default:
        return state;
    }
  };
