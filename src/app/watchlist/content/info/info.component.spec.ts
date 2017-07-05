import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MdlModule} from 'angular2-mdl';
import {WatchlistStateService} from '../../state/watchlist-state.service';
import {NotificationButtonInterface, NotificationTypeEnum} from '../../../shared/notification/notification.component';
import {RangeOptionsInterface} from './range/range.component';
import {InfoComponent} from './info.component';
import {InfoApiService} from './info-api.service';
import {InfoService} from './info.service';
import {InfoStateService} from './state/info-state.service';

@Component({selector: 'mp-notification', template: ''})
class NotificationComponent {
  @Input() type: NotificationTypeEnum;
  @Input() value: string;
  @Input() button: NotificationButtonInterface;
}

@Component({selector: 'mp-range', template: ''})
class RangeComponent {
  @Input() options: RangeOptionsInterface = {};
}

describe('InfoComponent', () => {
  let fixture: ComponentFixture<InfoComponent>;
  let component: InfoComponent;
  let api: any;
  let infoService: any;
  let infoState: any;
  let watchlistState: any;

  beforeEach(async(() => {
    api = jasmine.createSpyObj('api', [
      'load',
      'reload'
    ]);

    infoService = jasmine.createSpyObj('infoService', [
      'getDataWithUpdatedPrice',
      'getDayOptions',
      'getYearOptions'
    ]);

    infoState = jasmine.createSpyObj('infoStateService', [
      'fetchFulfilled'
    ]);

    infoState.data$ = new BehaviorSubject<any>([]);
    infoState.loader$ = new BehaviorSubject<any>(false);
    infoState.error$ = new BehaviorSubject<any>(null);

    watchlistState = jasmine.createSpyObj('watchlistStateService', [
      'changeStock'
    ]);

    watchlistState.stock$ = new BehaviorSubject<any>(null);
    watchlistState.stockData$ = new BehaviorSubject<any>({});

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MdlModule
      ],
      declarations: [
        InfoComponent,
        NotificationComponent,
        RangeComponent
      ],
      providers: [
        {provide: InfoApiService, useValue: api},
        {provide: InfoService, useValue: infoService},
        {provide: InfoStateService, useValue: infoState},
        {provide: WatchlistStateService, useValue: watchlistState}
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

  it('should have a NotificationComponent', () => {
    expect(fixture.nativeElement.querySelector('mp-notification')).not.toBeNull();
  });

  it('should have a RangeComponent if notification type is set to 0', () => {
    expect(fixture.nativeElement.querySelector('mp-range')).toBeNull();

    component.notificationType = 0;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mp-range')).not.toBeNull();
  });

  it('should have a title', () => {
    expect(fixture.nativeElement.querySelector('h4').textContent).toBe('Key Statistics');
  });

  it('should show the more settings icon when the notification type is set to 0', () => {
    expect(fixture.nativeElement.querySelector('.mp-settings')).toBeNull();

    component.notificationType = 0;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mp-settings')).not.toBeNull();
  });

  it('should show the content grid when the notification type is set to 0', () => {
    expect(fixture.nativeElement.querySelector('.mdl-grid')).toBeNull();

    component.notificationType = 0;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mdl-grid')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.mdl-grid').length).toBe(2);
  });

  it('should call InfoApiService#load() when reload menu item is clicked', () => {
    watchlistState.stock$.next('test');
    component.notificationType = 0;
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.mdl-menu__item').click();
    expect(api.load).toHaveBeenCalledTimes(1);
    expect(api.load).toHaveBeenCalledWith('test');
  });

  it('should change `notification` to have the correct message when there is no data', () => {
    component.notification = null;
    infoState.data$.next([{}]);
    fixture.detectChanges();
    expect(component.notification).toBeNull();

    infoState.data$.next([]);
    fixture.detectChanges();
    expect(component.notification).toBe('Please select a stock symbol');

    watchlistState.stock$.next('test');
    infoState.data$.next([]);
    fixture.detectChanges();
    expect(component.notification).toBe('No results found');
  });

  it('should call InfoService#getDataWithUpdatedPrice() when stock data is updated and info has already been loaded', () => {
    watchlistState.stockData$.next({price: 100});
    fixture.detectChanges();
    expect(infoService.getDataWithUpdatedPrice).toHaveBeenCalledTimes(0);

    infoState.data$.next([{}]);
    watchlistState.stockData$.next({price: 200});
    fixture.detectChanges();
    expect(infoService.getDataWithUpdatedPrice).toHaveBeenCalledTimes(2);
    expect(infoService.getDataWithUpdatedPrice).toHaveBeenCalledWith(undefined, 200);
  });
});
