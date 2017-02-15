/* tslint:disable:no-unused-variable */

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { MdlModule } from 'angular2-mdl';
import {
  HeaderComponent,
  headerReducer,
  HeaderStateService
} from './index';

@Component({selector: 'mp-search-box', template: ''})
class SearchBoxComponent {
  @Input() value:string;
  @Input() active:boolean;
}

export function main() {
  describe('HeaderComponent', () => {
    let fixture:ComponentFixture<HeaderComponent>;
    let component:HeaderComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          MdlModule,
          StoreModule.provideStore({
            header: headerReducer
          })
        ],
        declarations: [
          HeaderComponent,
          SearchBoxComponent
        ],
        providers: [
          HeaderStateService
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
}
