/* tslint:disable:no-unused-variable */

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdlModule } from 'angular2-mdl';
import { SearchBoxComponent } from './index';

export function main() {
  describe('SearchBoxComponent', () => {
    let fixture:ComponentFixture<SearchBoxComponent>;
    let component:SearchBoxComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          MdlModule,
          ReactiveFormsModule
        ],
        declarations: [
          SearchBoxComponent
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SearchBoxComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
}
