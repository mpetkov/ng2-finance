import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {
  WatchlistComponent,
  ContentComponent,
  ChartComponent,
  D3fcComponent,
  LegendComponent,
  InfoComponent,
  NewsComponent
} from './index';

import { SidebarModule } from './sidebar/sidebar.module';

@NgModule({
  imports: [
    SharedModule,
    SidebarModule
  ],
  declarations: [
    WatchlistComponent,
    ContentComponent,
    ChartComponent,
    D3fcComponent,
    LegendComponent,
    InfoComponent,
    NewsComponent
  ]
})
export class WatchlistModule {
}
