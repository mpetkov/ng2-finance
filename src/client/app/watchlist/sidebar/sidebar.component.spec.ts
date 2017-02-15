/* tslint:disable:no-unused-variable */

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import {
  SidebarComponent,
  sidebarReducer,
  FavoritesApiService,
  SidebarStateService
} from './index';
import {
  watchlistReducer,
  HeaderStateService,
  headerReducer
} from '../../index';
import { WatchlistStateService } from '../state/watchlist-state.service';

@Component({selector: 'mp-favorites', template: ''})
class FavoritesComponent {}

@Component({selector: 'mp-search', template: ''})
class SearchComponent {}

@Component({selector: 'mp-edit', template: ''})
class EditComponent {}

export function main() {
  describe('SidebarComponent', () => {
    let fixture:ComponentFixture<SidebarComponent>;
    let component:SidebarComponent;
    let api:any;
    let loadSubject:Subject<any>;

    beforeEach(async(() => {
      loadSubject = new Subject<any>();
      api = jasmine.createSpyObj('api', ['load']);
      api.load.and.callFake(() => loadSubject);

      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          StoreModule.provideStore({
            watchlist: watchlistReducer,
            header: headerReducer,
            sidebar: sidebarReducer
          })
        ],
        declarations: [
          SidebarComponent,
          EditComponent,
          FavoritesComponent,
          SearchComponent
        ],
        providers: [
          {provide: FavoritesApiService, useValue: api},
          SidebarStateService,
          WatchlistStateService,
          HeaderStateService,
          {provide: ActivatedRoute, useValue: {params: new Subject<any>()}}
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SidebarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
}
