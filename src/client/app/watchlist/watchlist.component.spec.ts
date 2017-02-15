/* tslint:disable:no-unused-variable */

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { WatchlistComponent } from './index';
import {
  HeaderStateService,
  headerReducer
} from '../index';

@Component({selector: 'mp-content', template: ''})
class ContentComponent {}

@Component({selector: 'mp-sidebar', template: ''})
class SidebarComponent {}

export function main() {
  describe('WatchlistComponent', () => {
    let fixture:ComponentFixture<WatchlistComponent>;
    let component:WatchlistComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          StoreModule.provideStore({
            header: headerReducer
          })
        ],
        declarations: [
          WatchlistComponent,
          ContentComponent,
          SidebarComponent
        ],
        providers: [
          HeaderStateService
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(WatchlistComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
}
