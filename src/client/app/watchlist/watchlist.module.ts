import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  EditComponent,
  StocksComponent
} from './index';

@NgModule({
  imports: [
    CommonModule,
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
    EditComponent,
    StocksComponent
  ]
})
export class WatchlistModule {
}
