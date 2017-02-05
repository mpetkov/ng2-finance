import { Record, Map } from 'immutable';


export interface AppStateInterface extends Map<string,any> {
  preloader?:boolean;
}

export const AppInitialState = Record({
  preloader: true
});


export class AppStateKeys {
  static Preloader = 'preloader';
}
