/* tslint:disable:no-unused-variable */

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { MdlModule } from 'angular2-mdl';
import {
  FavoritesComponent,
  favoritesReducer,
  SidebarStateService,
  SidebarActions,
  FavoritesStateService,
  FavoritesActions,
  FavoritesApiService,
  FavoritesHighlightService
} from '../index';
import {
  watchlistReducer,
  HeaderStateService,
  HeaderActions,
  headerReducer,
  NotificationButtonInterface,
  NotificationTypeEnum
} from '../../../index';
import { WatchlistStateService } from '../../state/watchlist-state.service';
import { WatchlistActions } from '../../state/watchlist.actions';

@Component({selector: 'mp-notification', template: ''})
class NotificationComponent {
  @Input() type:NotificationTypeEnum;
  @Input() value:string;
  @Input() button:NotificationButtonInterface;
}

export function main() {
  describe('FavoritesComponent', () => {
    let fixture:ComponentFixture<FavoritesComponent>;
    let component:FavoritesComponent;
    let api:any;
    let getSubject:Subject<any>;

    beforeEach(async(() => {
      getSubject = new Subject<any>();
      api = jasmine.createSpyObj('api', ['get']);
      api.get.and.callFake(() => getSubject);

      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          MdlModule,
          StoreModule.provideStore({
            header: headerReducer,
            watchlist: watchlistReducer,
            favorites: favoritesReducer
          })
        ],
        declarations: [
          FavoritesComponent,
          NotificationComponent
        ],
        providers: [
          {provide: FavoritesApiService, useValue: api},
          WatchlistStateService,
          WatchlistActions,
          FavoritesStateService,
          FavoritesActions,
          FavoritesHighlightService,
          SidebarStateService,
          SidebarActions,
          HeaderStateService,
          HeaderActions,
          {provide: Router, useValue: jasmine.createSpyObj('router', ['navigate'])}
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(FavoritesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
}
