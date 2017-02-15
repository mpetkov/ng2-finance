/* tslint:disable:no-unused-variable */

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import {
  SearchComponent,
  searchReducer,
  favoritesReducer,
  SearchStateService,
  SidebarStateService,
  FavoritesStateService,
  SearchApiService,
  headerReducer,
  watchlistReducer,
  HeaderStateService,
  NotificationButtonInterface,
  NotificationTypeEnum
} from '../../../index';
import { WatchlistStateService } from '../../state/watchlist-state.service';

@Component({selector: 'mp-notification', template: ''})
class NotificationComponent {
  @Input() type:NotificationTypeEnum;
  @Input() value:string;
  @Input() button:NotificationButtonInterface;
}

export function main() {
  describe('SearchComponent', () => {
    let fixture:ComponentFixture<SearchComponent>;
    let component:SearchComponent;
    let api:any;
    let getSubject:Subject<any>;
    let postSubject:Subject<any>;

    beforeEach(async(() => {
      getSubject = new Subject<any>();
      postSubject = new Subject<any>();
      api = jasmine.createSpyObj('api', ['get', 'post']);
      api.get.and.callFake(() => getSubject);
      api.post.and.callFake(() => postSubject);

      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          HttpModule,
          StoreModule.provideStore({
            search: searchReducer,
            favorites: favoritesReducer,
            header: headerReducer,
            watchlist: watchlistReducer
          })
        ],
        declarations: [
          SearchComponent,
          NotificationComponent
        ],
        providers: [
          {provide: SearchApiService, useValue: api},
          SearchStateService,
          SidebarStateService,
          FavoritesStateService,
          WatchlistStateService,
          HeaderStateService,
          {provide: Router, useValue: jasmine.createSpyObj('router', ['navigate'])}
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SearchComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
}
