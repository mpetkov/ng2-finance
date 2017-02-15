/* tslint:disable:no-unused-variable */

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { MdlModule } from 'angular2-mdl';
import {
  InfoComponent,
  RangeOptionsInterface,
  infoReducer,
  watchlistReducer,
  NotificationButtonInterface,
  NotificationTypeEnum,
  InfoApiService,
  InfoStateService
} from '../../../index';
import { WatchlistStateService } from '../../state/watchlist-state.service';

@Component({selector: 'mp-notification', template: ''})
class NotificationComponent {
  @Input() type:NotificationTypeEnum;
  @Input() value:string;
  @Input() button:NotificationButtonInterface;
}

@Component({selector: 'mp-range', template: ''})
class RangeComponent {
  @Input() options:RangeOptionsInterface = {};
}

export function main() {
  describe('InfoComponent', () => {
    let fixture:ComponentFixture<InfoComponent>;
    let component:InfoComponent;
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
            watchlist: watchlistReducer,
            info: infoReducer
          })
        ],
        declarations: [
          InfoComponent,
          NotificationComponent,
          RangeComponent
        ],
        providers: [
          {provide: InfoApiService, useValue: api},
          InfoStateService,
          WatchlistStateService
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(InfoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
}
