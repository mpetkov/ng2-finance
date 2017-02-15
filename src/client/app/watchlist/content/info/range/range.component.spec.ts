/* tslint:disable:no-unused-variable */

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { RangeComponent } from './index';

export function main() {
  describe('RangeComponent', () => {
    let fixture:ComponentFixture<RangeComponent>;
    let component:RangeComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          RangeComponent
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RangeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
}
