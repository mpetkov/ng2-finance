import { Map, Record } from 'immutable';

export enum SidebarTypeEnum {
  List,
  Edit,
  Add
}

export interface SidebarStateInterface extends Map<string,any> {
  type?:SidebarTypeEnum;
  stock?:string;
}

export const SidebarInitialState = Record({
  type: SidebarTypeEnum.List,
  stock: 'AAPL'
});
