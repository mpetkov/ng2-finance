import { Map, Record } from 'immutable';

export interface ChartStateInterface extends Map<string,any> {
  data?:any;
  selectedPoint?:any;
}

export const ChartInitialState = Record({
  data: {},
  selectedPoint: {}
});
