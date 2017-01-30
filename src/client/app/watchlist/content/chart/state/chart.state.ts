import { Map, Record } from 'immutable';

export interface ChartStateInterface extends Map<string,any> {
  point?:any;
  data?:any[];
  loader?:boolean;
  error?:string;
}

export const ChartInitialState = Record({
  point: {},
  data: [],
  loader: false,
  error: null
});
