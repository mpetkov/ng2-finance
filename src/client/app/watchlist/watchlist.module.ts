import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {
  WatchlistComponent,
  StocksComponent
} from './index';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    WatchlistComponent,
    StocksComponent
  ]
})
export class WatchlistModule { }
