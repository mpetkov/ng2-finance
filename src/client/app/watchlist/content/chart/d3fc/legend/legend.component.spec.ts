/* tslint:disable:no-unused-variable */

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { MdlModule } from 'angular2-mdl';
import {
  LegendComponent,
  ChartStateService,
  chartReducer,
  ChartOptionsService
} from '../../index';

export function main() {
  describe('LegendComponent', () => {
    let fixture:ComponentFixture<LegendComponent>;
    let component:LegendComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          MdlModule,
          StoreModule.provideStore({
            chart: chartReducer
          })
        ],
        declarations: [
          LegendComponent
        ],
        providers: [
          ChartOptionsService,
          ChartStateService
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
  });
}
