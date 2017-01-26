import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {
  WatchlistComponent,
  ContentComponent
} from './index';

import { ChartModule } from './content/chart/chart.module';
import { InfoModule } from './content/info/info.module';
import { NewsModule } from './content/news/news.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { WatchlistStateService } from './state/watchlist-state.service';

@NgModule({
  imports: [
    SharedModule,
    ChartModule,
    InfoModule,
    NewsModule,
    SidebarModule
  ],
  declarations: [
    WatchlistComponent,
    ContentComponent
  ],
  providers: [
    WatchlistStateService
  ]
})
export class WatchlistModule {
}
