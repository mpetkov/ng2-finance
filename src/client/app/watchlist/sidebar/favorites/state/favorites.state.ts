import { Record } from 'immutable';
import {
  CoreApiStateInterface,
  CoreApiStateKeys
} from '../../../../core/index';

export interface FavoritesStateInterface extends CoreApiStateInterface {
  order?:string[];
}

export const FavoritesInitialState = Record({
  order: [],
  data: [],
  loader: false,
  error: null
});

export class FavoritesStateKeys extends CoreApiStateKeys {
  static Order = 'order';
}
