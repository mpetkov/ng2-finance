import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {MdlModule} from 'angular2-mdl';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LegendComponent} from './legend.component';
import {ChartOptionsService} from '../services/chart-options.service';
import {ChartStateService} from '../../state/chart-state.service';
import {ChartDataInterface} from '../../state/chart-state';
describe('LegendComponent', () => {
  let fixture: ComponentFixture<LegendComponent>;
  let component: LegendComponent;
  let chartState: any;

  beforeEach(async(() => {
    chartState = jasmine.createSpyObj('ChartStateService', [
      'changePoint'
    ]);
    chartState.point$ = new BehaviorSubject<any>(null);
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MdlModule
      ],
      declarations: [
        LegendComponent
      ],
      providers: [
        ChartOptionsService,
        {provide: ChartStateService, useValue: chartState}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize property `items` with array value `[]`', () => {
    expect(component.items).toEqual([]);
  });

  it('should show the legend when a valid point is passed', () => {
    expect(fixture.nativeElement.querySelector('.mdl-grid')).toBeNull();

    const point: ChartDataInterface = {
      open: 10,
      close: 12,
      low: 9,
      high: 20,
      volume: 2000,
    };
    chartState.point$.next(point);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mdl-grid')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.mdl-grid .mdl-cell:last-child .mdl-list__item').length).toBe(5);
    expect(fixture.nativeElement.querySelectorAll('.mdl-grid .mdl-cell:last-child .mdl-list__item')[0].textContent).toBe('10.00');
    expect(fixture.nativeElement.querySelectorAll('.mdl-grid .mdl-cell:last-child .mdl-list__item')[4].textContent).toBe('2.00k');
  });
});
