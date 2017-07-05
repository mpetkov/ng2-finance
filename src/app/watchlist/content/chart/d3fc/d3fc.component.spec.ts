import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {D3fcComponent} from './d3fc.component';
import {ChartStateService} from '../state/chart-state.service';
import {ChartCrosshairService} from './services/chart-crosshair.service';
import {ChartOptionsService} from './services/chart-options.service';
import {ChartTooltipsService} from './services/chart-tooltips.service';
import {ChartVolumeService} from './services/chart-volume.service';

@Component({selector: 'mp-legend', template: ''})
class LegendComponent {
}

describe('D3fcComponent', () => {
  let fixture: ComponentFixture<D3fcComponent>;
  let component: D3fcComponent;
  let chartState: any;

  beforeEach(async(() => {
    chartState = jasmine.createSpyObj('chartStateService', [
      'changePoint'
    ]);

    chartState.range$ = new BehaviorSubject<any>('3mo');
    chartState.data$ = new BehaviorSubject<any>([]);

    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [
        D3fcComponent,
        LegendComponent
      ],
      providers: [
        {provide: ChartStateService, useValue: chartState},
        ChartCrosshairService,
        ChartOptionsService,
        ChartTooltipsService,
        ChartVolumeService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3fcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a LegendComponent', () => {
    expect(fixture.nativeElement.querySelector('mp-legend')).not.toBe(null);
  });

  it('should initialize property `smallView` with boolean value `false`', () => {
    expect(component.smallView).toBe(false);
  });

  it('should add css class `small` to svg when smallView is changed to true', () => {
    const element: any = fixture.nativeElement.querySelector('svg');
    expect(element.classList).not.toContain('small');

    component.smallView = true;
    fixture.detectChanges();
    expect(element.classList).toContain('small');

    component.smallView = false;
    fixture.detectChanges();
    expect(element.classList).not.toContain('small');
  });

  it('should add css class `small` to svg when window is resized to small width', () => {
    const element: any = fixture.nativeElement.querySelector('svg');
    expect(element.classList).not.toContain('small');

    component.onResize({currentTarget: {innerWidth: 400}});
    fixture.detectChanges();
    expect(element.classList).not.toContain('small');

    chartState.data$.next([{
      date: new Date(),
      open: 10,
      close: 12,
      low: 9,
      high: 20,
      volume: 2000,
    }]);
    fixture.detectChanges();
    expect(element.classList).toContain('small');

    component.onResize({currentTarget: {innerWidth: 400}});
    fixture.detectChanges();
    expect(element.classList).toContain('small');

    component.onOrientationChange({currentTarget: {innerWidth: 600}});
    fixture.detectChanges();
    expect(element.classList).not.toContain('small');
  });
});
