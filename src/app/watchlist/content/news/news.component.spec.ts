import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {StoreModule} from '@ngrx/store';
import {MdlModule} from 'angular2-mdl';
import {NotificationButtonInterface, NotificationTypeEnum} from '../../../shared/notification/notification.component';
import {NewsComponent} from './news.component';
import {NewsApiService} from './news-api.service';
import {NewsStateService} from './state/news-state.service';
import {newsReducer} from './state/news-reducer';
import {WatchlistStateService} from '../../state/watchlist-state.service';
import {watchlistReducer} from '../../state/watchlist-reducer';

@Component({selector: 'mp-notification', template: ''})
class NotificationComponent {
  @Input() type: NotificationTypeEnum;
  @Input() value: string;
  @Input() button: NotificationButtonInterface;
}

describe('NewsComponent', () => {
  let fixture: ComponentFixture<NewsComponent>;
  let component: NewsComponent;
  let api: any;
  let newsState: any;
  let watchlistState: any;

  beforeEach(async(() => {
    api = jasmine.createSpyObj('api', [
      'load',
      'reload'
    ]);

    newsState = jasmine.createSpyObj('newsStateService', [
      'fetchFulfilled'
    ]);

    newsState.data$ = new BehaviorSubject<any>([]);
    newsState.loader$ = new BehaviorSubject<any>(false);
    newsState.error$ = new BehaviorSubject<any>(null);

    watchlistState = jasmine.createSpyObj('watchlistStateService', [
      'changeStock'
    ]);

    watchlistState.stock$ = new BehaviorSubject<any>(null);

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
        {provide: NewsStateService, useValue: newsState},
        {provide: WatchlistStateService, useValue: watchlistState}
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

  it('should have a NotificationComponent', () => {
    expect(fixture.nativeElement.querySelector('mp-notification')).not.toBeNull();
  });

  it('should have a title', () => {
    expect(fixture.nativeElement.querySelector('h4').textContent).toBe('News');
  });

  it('should show the more settings icon when the notification type is set to 0', () => {
    expect(fixture.nativeElement.querySelector('.mp-settings')).toBeNull();

    component.notificationType = 0;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mp-settings')).not.toBeNull();
  });

  it('should show the content list when the notification type is set to 0', () => {
    expect(fixture.nativeElement.querySelector('.mdl-list')).toBeNull();

    component.notificationType = 0;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mdl-list')).not.toBeNull();
  });

  it('should call NewsApiService#reload() when reload menu item is clicked', () => {
    watchlistState.stock$.next('test');
    component.notificationType = 0;
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.mdl-menu__item').click();
    expect(api.reload).toHaveBeenCalledTimes(1);
  });

  it('should change `notification` to have the correct message when there is no data', () => {
    component.notification = null;
    newsState.data$.next([{}]);
    fixture.detectChanges();
    expect(component.notification).toBeNull();

    newsState.data$.next([]);
    fixture.detectChanges();
    expect(component.notification).toBe('Please select a stock symbol');

    watchlistState.stock$.next('test');
    newsState.data$.next([]);
    fixture.detectChanges();
    expect(component.notification).toBe('No results found');
  });
});
