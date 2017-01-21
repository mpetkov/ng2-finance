import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {
  WatchlistComponent,
  ContentComponent,
  ChartComponent,
  D3fcComponent,
  LegendComponent,
  InfoComponent,
  NewsComponent,
  SidebarComponent,
  AddComponent,
  EditComponent,
  StocksComponent
} from './index';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    WatchlistComponent,
    ContentComponent,
    ChartComponent,
    D3fcComponent,
    LegendComponent,
    InfoComponent,
    NewsComponent,
    SidebarComponent,
    AddComponent,
    EditComponent,
    StocksComponent
  ]
})
export class WatchlistModule {
}
