import {Record} from 'immutable';
import {CoreApiStateInterface, CoreApiStateKeys} from '../../../../shared/core/state/api-state';

export interface InfoStateInterface extends CoreApiStateInterface {
}

export const InfoInitialState = Record({
  data: [],
  loader: false,
  error: null
});

export class InfoStateKeys extends CoreApiStateKeys {
  static StateName = 'info';
}

export interface InfoDataInterface {
  PreviousClose?: number;
  DaysLow?: number;
  YearLow?: number;
  MarketCapitalization?: string;
  OneyrTargetPrice?: number;
  EarningsShare?: string;
  Open?: number;
  DaysHigh?: number;
  YearHigh?: number;
  Volume?: string;
  AverageDailyVolume?: string;
  DividendShare?: string;
  LastTradePriceOnly?: number;
}
