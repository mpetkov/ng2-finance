import { Record } from 'immutable';
import {
  CoreApiStateInterface,
  CoreApiStateKeys
} from '../../../../core/index';

export interface InfoStateInterface extends CoreApiStateInterface {
}

export const InfoInitialState = Record({
  data: [],
  loader: false,
  error: null
});

export class InfoStateKeys extends CoreApiStateKeys {
}
