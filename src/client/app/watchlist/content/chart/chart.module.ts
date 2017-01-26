import { NgModule } from '@angular/core';
import {
  ChartComponent,
  ChartApiService,
  ChartStateService,
  D3fcComponent,
  LegendComponent
} from './index';
import { WatchlistStateService } from '../../state/watchlist-state.service';

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
    ChartStateService,
    WatchlistStateService
  ]
})
export class ChartModule {
}
