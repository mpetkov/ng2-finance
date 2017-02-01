import { Record } from 'immutable';
import {
  CoreApiStateInterface,
  CoreApiStateKeys
} from '../../../../core/index';

export interface ChartStateInterface extends CoreApiStateInterface {
  point?:any;
  range?:string;
}

export const ChartInitialState = Record({
  point: {},
  range: '3mo',
  data: [],
  loader: false,
  error: null
});


export class ChartStateKeys extends CoreApiStateKeys {
  static Point = 'point';
  static Range = 'range';
}
