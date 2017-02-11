import { Record } from 'immutable';
import {
  CoreApiStateInterface,
  CoreApiStateKeys,
  localStorageAdapter,
  Types
} from '../../../../core/index';

export interface ChartStateInterface extends CoreApiStateInterface {
  point?:any;
  range?:string;
}

export class ChartStateKeys extends CoreApiStateKeys {
  static Point = 'point';
  static Range = 'range';
}

export const ChartInitialState = Record({
  point: {},
  range: localStorageAdapter.getItem(ChartStateKeys.Range, Types.String) || '3mo',
  data: [],
  loader: false,
  error: null
});
