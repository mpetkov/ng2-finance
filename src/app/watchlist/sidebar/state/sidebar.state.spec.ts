/* tslint:disable:no-unused-variable */
import { Record } from 'immutable';
import {
  SidebarInitialState,
  SidebarTypeEnum
} from './index';

export function main() {
  describe('SidebarInitialState', () => {
    let state:any;

    beforeEach(() => {
      state = new SidebarInitialState();
    });

    it('should be an instance of Immutable.Record', () => {
      expect(state instanceof Record).toBe(true);
    });

    it('should contain default properties', () => {
      expect(state.type).toBe(SidebarTypeEnum.List);
    });
  });
}
