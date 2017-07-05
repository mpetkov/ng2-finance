import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MdlModule} from 'angular2-mdl';
import {WatchlistStateService} from '../../state/watchlist-state.service';
import {HeaderStateService} from '../../../shared/header/state/header-state.service';
import {NotificationButtonInterface, NotificationTypeEnum} from '../../../shared/notification/notification.component';
import {ChartComponent} from './chart.component';
import {ChartApiService} from './chart-api.service';
import {ChartStateService} from './state/chart-state.service';

@Component({selector: 'mp-notification', template: ''})
class NotificationComponent {
  @Input() type: NotificationTypeEnum;
  @Input() value: string;
  @Input() button: NotificationButtonInterface;
}

@Component({selector: 'mp-d3fc', template: ''})
class D3fcComponent {
}

describe('ChartComponent', () => {
  let fixture: ComponentFixture<ChartComponent>;
  let component: ChartComponent;
  let api: any;
  let chartState: any;
  let watchlistState: any;
  let headerState: any;

  beforeEach(async(() => {
    api = jasmine.createSpyObj('api', ['load']);

    chartState = jasmine.createSpyObj('chartState', [
      'changeRange'
    ]);

    chartState.range$ = new BehaviorSubject<any>('3mo');
    chartState.data$ = new BehaviorSubject<any>([]);
    chartState.loader$ = new BehaviorSubject<any>(false);
    chartState.error$ = new BehaviorSubject<any>(null);

    watchlistState = jasmine.createSpyObj('watchlistState', [
      'addFavorite',
      'deleteFavorites'
    ]);

    watchlistState.stockData$ = new BehaviorSubject<any>({});
    watchlistState.stock$ = new BehaviorSubject<any>(null);
    watchlistState.favorites$ = new BehaviorSubject<any>(['AAPL', 'GOOG', 'FB']);
    watchlistState.highlights$ = new BehaviorSubject<any>({});

    headerState = jasmine.createSpyObj('headerState', [
      'changePreloader'
    ]);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MdlModule
      ],
      declarations: [
        ChartComponent,
        D3fcComponent,
        NotificationComponent
      ],
      providers: [
        {provide: ChartApiService, useValue: api},
        {provide: ChartStateService, useValue: chartState},
        {provide: WatchlistStateService, useValue: watchlistState},
        {provide: HeaderStateService, useValue: headerState}
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

  it('should have a NotificationComponent', () => {
    expect(fixture.nativeElement.querySelector('mp-notification')).not.toBe(null);
  });

  it('should have a D3fcComponent', () => {
    expect(fixture.nativeElement.querySelector('mp-d3fc')).not.toBe(null);
  });

  it('should have a title `Chart` if no stock data is available', () => {
    expect(fixture.nativeElement.querySelector('h4').textContent).toBe('Chart');

    watchlistState.stockData$.next({symbol: 'AAPL'});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h4').textContent).not.toBe('Chart');
    expect(fixture.nativeElement.querySelector('h4').innerHTML).toContain('AAPL');
  });

  it('should toggle css class between green and red for `mp-change` span tag when the change value is negative or positive', () => {
    watchlistState.stockData$.next({symbol: 'AAPL', change: -10});
    fixture.detectChanges();
    const positiveColor = 'mdl-color-text--green-A700';
    const negativeColor = 'mdl-color-text--red';

    const element: any = fixture.nativeElement.querySelector('.mp-change');
    expect(element.classList).not.toContain(positiveColor);
    expect(element.classList).toContain(negativeColor);

    watchlistState.stockData$.next({symbol: 'AAPL', change: 10});
    fixture.detectChanges();
    expect(element.classList).toContain(positiveColor);
    expect(element.classList).not.toContain(negativeColor);
  });

  it('should apply a highlight css class for `mp-transition` span tag when the highlight is set', () => {
    watchlistState.stockData$.next({symbol: 'AAPL'});
    fixture.detectChanges();

    const positiveColor = 'mdl-color--green-A100';
    const negativeColor = 'mdl-color--red-100';
    const element: any = fixture.nativeElement.querySelector('.mp-transition');

    expect(element.classList).not.toContain(positiveColor);
    expect(element.classList).not.toContain(negativeColor);

    watchlistState.highlights$.next({AAPL: {price: positiveColor}});
    fixture.detectChanges();
    expect(element.classList).toContain(positiveColor);
    expect(element.classList).not.toContain(negativeColor);

    watchlistState.highlights$.next({AAPL: {price: negativeColor}});
    fixture.detectChanges();
    expect(element.classList).not.toContain(positiveColor);
    expect(element.classList).toContain(negativeColor);
  });

  it('should show the favorite icon button when stock is present', () => {
    expect(fixture.nativeElement.querySelector('button')).toBeNull();

    watchlistState.stock$.next('ADS');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mdl-icon').textContent).toBe('star_bordered');
  });

  it('should show the tabs when stock is present', () => {
    expect(fixture.nativeElement.querySelector('mdl-tabs')).toBeNull();

    watchlistState.stock$.next('AAPL');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mdl-tabs')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.mdl-tabs__tab').length).toBe(7);
  });

  it('should call ChartStateService#changeRange() when a tab is clicked', () => {
    watchlistState.stock$.next('AAPL');
    fixture.detectChanges();
    fixture.nativeElement.querySelectorAll('.mdl-tabs__tab')[0].click();
    expect(chartState.changeRange).toHaveBeenCalledTimes(1);
    expect(chartState.changeRange).toHaveBeenCalledWith('1d');
  });

  it('should call ChartStateService#changeRange() when tabChanged() is called', () => {
    component.tabChanged(20);
    expect(chartState.changeRange).toHaveBeenCalledTimes(0);

    component.tabChanged(0);
    expect(chartState.changeRange).toHaveBeenCalledTimes(1);
    expect(chartState.changeRange).toHaveBeenCalledWith('1d');
  });

  it('should call WatchlistStateService#addFavorite() or deleteFavorites() when the favorite button is toggled', () => {
    watchlistState.stock$.next('ADS');
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    expect(watchlistState.addFavorite).toHaveBeenCalledTimes(1);
    expect(watchlistState.addFavorite).toHaveBeenCalledWith('ADS');
    expect(watchlistState.deleteFavorites).toHaveBeenCalledTimes(0);

    watchlistState.favorites$.next(['ADS']);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    expect(watchlistState.addFavorite).toHaveBeenCalledTimes(1);
    expect(watchlistState.deleteFavorites).toHaveBeenCalledTimes(1);
    expect(watchlistState.deleteFavorites).toHaveBeenCalledWith(['ADS']);
  });

  it('should change `rangeIndex` to 0 if an invalid range is passed', () => {
    expect(component.rangeIndex).toBeUndefined();

    chartState.range$.next('5d');
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.rangeIndex).toBe(1);
    }, 0);


    chartState.range$.next('test');
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.rangeIndex).toBe(0);
    }, 0);
  });

  it('should change `notification` to have the correct message when there is no data', () => {
    component.notification = null;
    chartState.data$.next([{}]);
    fixture.detectChanges();
    expect(component.notification).toBeNull();

    chartState.data$.next([]);
    fixture.detectChanges();
    expect(component.notification).toBe('Please select a stock symbol');

    watchlistState.stock$.next('test');
    chartState.data$.next([]);
    fixture.detectChanges();
    expect(component.notification).toBe('No results found');
  });
});
