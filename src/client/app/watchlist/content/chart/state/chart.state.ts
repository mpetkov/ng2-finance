import { Map, Record } from 'immutable';

export interface ChartStateInterface extends Map<string,any> {
  point?:any;
  range?:string;
  data?:any[];
  loader?:boolean;
  error?:string;
}

export const ChartInitialState = Record({
  point: {},
  range: '1d',
  data: [],
  loader: false,
  error: null
});
