import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { WatchlistComponent, StocksComponent } from './index';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    WatchlistComponent,
    StocksComponent
  ],
  exports: [WatchlistComponent]
})
export class WatchlistModule { }
