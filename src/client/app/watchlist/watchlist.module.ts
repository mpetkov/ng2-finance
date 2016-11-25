import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {
  WatchlistComponent,
  SidebarComponent,
  StocksComponent
} from './index';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    WatchlistComponent,
    SidebarComponent,
    StocksComponent
  ]
})
export class WatchlistModule { }
