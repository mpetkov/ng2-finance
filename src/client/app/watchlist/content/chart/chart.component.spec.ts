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
  ChartComponent,
  chartReducer,
  watchlistReducer,
  NotificationButtonInterface,
  NotificationTypeEnum,
  ChartApiService,
  ChartStateService
} from '../../../index';
import { WatchlistStateService } from '../../state/watchlist-state.service';
import { AppStateService } from '../../../state/app-state.service';

@Component({selector: 'mp-notification', template: ''})
class NotificationComponent {
  @Input() type:NotificationTypeEnum;
  @Input() value:string;
  @Input() button:NotificationButtonInterface;
}

@Component({selector: 'mp-d3fc', template: ''})
class D3fcComponent {}

export function main() {
  describe('ChartComponent', () => {
    let fixture:ComponentFixture<ChartComponent>;
    let component:ChartComponent;
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
            chart: chartReducer,
            watchlist: watchlistReducer
          })
        ],
        declarations: [
          ChartComponent,
          D3fcComponent,
          NotificationComponent
        ],
        providers: [
          {provide: ChartApiService, useValue: api},
          ChartStateService,
          WatchlistStateService,
          AppStateService
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ChartComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
}
