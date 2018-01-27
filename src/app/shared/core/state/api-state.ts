import { Map } from 'immutable';
import { Action } from '@ngrx/store';

export interface CoreApiStateInterface extends Map<string, any> {
  data?: any[];
  loader?: boolean;
  error?: CoreApiErrorInterface;
}

export class CoreApiStateKeys {
  static Data = 'data';
  static Loader = 'loader';
  static Error = 'error';
}

export interface CoreApiErrorInterface {
  value?: string;
  date?: string;
  count?: number;
}

export interface PayloadAction extends Action {
  payload: any;
}
