/* tslint:disable:no-unused-variable */

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {
  D3fcComponent,
  chartReducer,
  ChartStateService,
  ChartCrosshairService,
  ChartOptionsService,
  ChartTooltipsService,
  ChartVolumeService
} from '../index';

@Component({selector: 'mp-legend', template: ''})
class LegendComponent {}

export function main() {
  describe('D3fcComponent', () => {
    let fixture:ComponentFixture<D3fcComponent>;
    let component:D3fcComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          StoreModule.provideStore({
            chart: chartReducer
          })
        ],
        declarations: [
          D3fcComponent,
          LegendComponent
        ],
        providers: [
          ChartStateService,
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
  });
}
