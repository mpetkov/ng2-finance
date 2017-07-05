import {Record} from 'immutable';
import {CoreApiStateInterface, CoreApiStateKeys} from '../../../../shared/core/state/api-state';

export interface SearchStateInterface extends CoreApiStateInterface {
}

export const SearchInitialState = Record({
  data: [],
  loader: false,
  error: null
});

export class SearchStateKeys extends CoreApiStateKeys {
  static StateName = 'search';
}
