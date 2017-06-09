import { Record } from 'immutable';
import { CoreApiStateInterface, CoreApiStateKeys } from '../../../../core/state/api.state';
import { Types, localStorageAdapter } from '../../../../core/utils';

export interface FavoritesStateInterface extends CoreApiStateInterface {
  order?:string[];
}

export class FavoritesStateKeys extends CoreApiStateKeys {
  static Order = 'order';
}

export const FavoritesInitialState = Record({
  order: localStorageAdapter.getItem(FavoritesStateKeys.Order, Types.Array) || [],
  data: [],
  loader: false,
  error: null
});
