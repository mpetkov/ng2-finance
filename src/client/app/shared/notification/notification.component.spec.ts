/* tslint:disable:no-unused-variable */

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MdlModule } from 'angular2-mdl';
import { NotificationComponent } from './index';

export function main() {
  describe('NotificationComponent', () => {
    let fixture:ComponentFixture<NotificationComponent>;
    let component:NotificationComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          MdlModule
        ],
        declarations: [
          NotificationComponent
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NotificationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
}
