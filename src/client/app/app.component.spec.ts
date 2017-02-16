/* tslint:disable:no-unused-variable */

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { MdlModule } from 'angular2-mdl';
import {
  AppComponent,
  appReducer
} from './index';
import { AppStateService } from './state/app-state.service';

@Component({selector: 'mp-header', template: ''})
class HeaderComponent {}

export function main() {
  describe('AppComponent', () => {
    let fixture:ComponentFixture<AppComponent>;
    let component:AppComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          MdlModule,
          StoreModule.provideStore({
            app: appReducer
          })
        ],
        declarations: [
          AppComponent,
          HeaderComponent
        ],
        providers: [
          AppStateService
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
}
