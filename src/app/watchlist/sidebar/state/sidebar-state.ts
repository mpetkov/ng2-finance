import {Map, Record} from 'immutable';

export enum SidebarTypeEnum {
  List,
  Edit,
  Add
}

export interface SidebarStateInterface extends Map<string, any> {
  type?: SidebarTypeEnum;
}

export const SidebarInitialState = Record({
  type: SidebarTypeEnum.List
});

export class SidebarStateKeys {
  static StateName = 'sidebar';
  static Type = 'type';
}
