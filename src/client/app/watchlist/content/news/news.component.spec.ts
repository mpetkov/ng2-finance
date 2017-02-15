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
  NewsComponent,
  newsReducer,
  watchlistReducer,
  NotificationButtonInterface,
  NotificationTypeEnum,
  NewsApiService,
  NewsStateService
} from '../../../index';
import { WatchlistStateService } from '../../state/watchlist-state.service';

@Component({selector: 'mp-notification', template: ''})
class NotificationComponent {
  @Input() type:NotificationTypeEnum;
  @Input() value:string;
  @Input() button:NotificationButtonInterface;
}

export function main() {
  describe('NewsComponent', () => {
    let fixture:ComponentFixture<NewsComponent>;
    let component:NewsComponent;
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
          MdlModule,
          StoreModule.provideStore({
            news: newsReducer,
            watchlist: watchlistReducer
          })
        ],
        declarations: [
          NewsComponent,
          NotificationComponent
        ],
        providers: [
          {provide: NewsApiService, useValue: api},
          NewsStateService,
          WatchlistStateService
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NewsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
}
