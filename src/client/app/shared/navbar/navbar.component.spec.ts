/* tslint:disable:no-unused-variable */

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { MdlModule } from 'angular2-mdl';
import { NavbarComponent } from './index';

export function main() {
  describe('NavbarComponent', () => {
    let fixture:ComponentFixture<NavbarComponent>;
    let component:NavbarComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          MdlModule
        ],
        declarations: [
          NavbarComponent
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
}
