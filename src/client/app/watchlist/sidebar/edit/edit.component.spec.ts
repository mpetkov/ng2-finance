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
import { DragulaModule } from 'ng2-dragula';

import {
  EditComponent,
  favoritesReducer,
  SidebarStateService,
  FavoritesStateService
} from '../index';

import {
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
  describe('EditComponent', () => {
    let fixture:ComponentFixture<EditComponent>;
    let component:EditComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          MdlModule,
          DragulaModule,
          StoreModule.provideStore({
            watchlist: watchlistReducer,
            favorites: favoritesReducer
          })
        ],
        declarations: [
          EditComponent,
          NotificationComponent
        ],
        providers: [
          FavoritesStateService,
          SidebarStateService,
          HeaderStateService,
          WatchlistStateService
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(EditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
}
