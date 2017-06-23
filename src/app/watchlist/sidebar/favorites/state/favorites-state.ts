import {Record} from 'immutable';
import {CoreApiStateInterface, CoreApiStateKeys} from '../../../../shared/core/state/api-state';
import {localStorageAdapter, Types} from '../../../../shared/core/utils';

export interface FavoritesStateInterface extends CoreApiStateInterface {
  order?: string[];
}

export class FavoritesStateKeys extends CoreApiStateKeys {
  static StateName = 'favorites';
  static Order = 'order';
}

export const FavoritesInitialState = Record({
  order: localStorageAdapter.getItem(FavoritesStateKeys.Order, Types.Array) || [],
  data: [],
  loader: false,
  error: null
});
