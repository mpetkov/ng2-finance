import { Record } from 'immutable';
import {
  CoreApiStateInterface,
  CoreApiStateKeys
} from '../../../../core/index';

export interface SearchStateInterface extends CoreApiStateInterface {
}

export const SearchInitialState = Record({
  data: [],
  loader: false,
  error: null
});

export class SearchStateKeys extends CoreApiStateKeys {
}
