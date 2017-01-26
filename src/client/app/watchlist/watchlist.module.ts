import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {
  WatchlistComponent,
  ContentComponent,
  InfoComponent,
  NewsComponent
} from './index';

import { ChartModule } from './content/chart/chart.module';
import { SidebarModule } from './sidebar/sidebar.module';

@NgModule({
  imports: [
    SharedModule,
    ChartModule,
    SidebarModule
  ],
  declarations: [
    WatchlistComponent,
    ContentComponent,
    InfoComponent,
    NewsComponent
  ]
})
export class WatchlistModule {
}
