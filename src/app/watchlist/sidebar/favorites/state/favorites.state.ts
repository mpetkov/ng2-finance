import { Record } from 'immutable';
import {
  CoreApiStateInterface,
  CoreApiStateKeys,
  localStorageAdapter,
  Types
} from '../../../../core/index';

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
