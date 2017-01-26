import { NgModule } from '@angular/core';
import {
  ChartComponent,
  ChartApiService,
  ChartStateService,
  D3fcComponent,
  LegendComponent
} from './index';

@NgModule({
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
    ChartStateService
  ]
})
export class ChartModule {
}
