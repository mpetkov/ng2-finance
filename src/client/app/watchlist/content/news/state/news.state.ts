import { Record } from 'immutable';
import {
  CoreApiStateInterface,
  CoreApiStateKeys
} from '../../../../core/index';

export interface NewsStateInterface extends CoreApiStateInterface {
}

export const NewsInitialState = Record({
  data: [],
  loader: false,
  error: null
});

export class NewsStateKeys extends CoreApiStateKeys {
}

export interface NewsDataInterface {
  source?:string;
  date?:string;
  title?:string;
  url?:string;
  image?:string;
}
