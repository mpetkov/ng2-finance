import {Record} from 'immutable';
import {CoreApiStateInterface, CoreApiStateKeys} from '../../../../shared/core/state/api-state';
import {localStorageAdapter, Types} from '../../../../shared/core/utils';

export interface ChartDataInterface {
  timestamp?: number;
  date?: Date;
  close?: number;
  high?: number;
  low?: number;
  open?: number;
  volume?: number;
}

export interface ChartStateInterface extends CoreApiStateInterface {
  point?: ChartDataInterface;
  range?: string;
}

export class ChartStateKeys extends CoreApiStateKeys {
  static StateName = 'chart';
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
