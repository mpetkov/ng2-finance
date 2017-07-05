import {Action, ActionReducer} from '@ngrx/store';
import {ChartInitialState, ChartStateInterface, ChartStateKeys} from './chart-state';
import {ChartActions} from './chart-actions';

const initialState: ChartStateInterface = new ChartInitialState() as ChartStateInterface;

export const chartReducer: ActionReducer<ChartStateInterface> =
  (state: ChartStateInterface = initialState, {payload, type}: Action) => {
    switch (type) {
      case ChartActions.CHANGE_POINT:
        return state.set(ChartStateKeys.Point, payload);
      case ChartActions.CHANGE_RANGE:
        return state.set(ChartStateKeys.Range, payload);
      case ChartActions.FETCH_FULFILLED:
        return state.set(ChartStateKeys.Data, payload);
      case ChartActions.FETCH_LOADER:
        return state.set(ChartStateKeys.Loader, payload);
      case ChartActions.FETCH_ERROR:
        return state.set(ChartStateKeys.Error, payload);
      default:
        return state;
    }
  };
