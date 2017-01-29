import { NgModule } from '@angular/core';
import {
  ChartComponent,
  ChartApiService,
  ChartStateService,
  D3fcComponent,
  LegendComponent
} from './index';
import { SharedModule } from '../../../shared/shared.module';

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
    ChartStateService
  ]
})
export class ChartModule {
}
