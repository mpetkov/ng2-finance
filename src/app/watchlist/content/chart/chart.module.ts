import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ChartActions} from './state/chart-actions';
import {ChartComponent} from './chart.component';
import {D3fcComponent} from './d3fc/d3fc.component';
import {LegendComponent} from './d3fc/legend/legend.component';
import {ChartApiService} from './chart-api.service';
import {ChartStateService} from './state/chart-state.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ChartComponent,
    D3fcComponent,
    LegendComponent
  ],
  exports: [
    ChartComponent
  ],
  providers: [
    ChartApiService,
    ChartStateService,
    ChartActions
  ]
})
export class ChartModule {
}
