import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PortfolioComponent, StocksComponent } from './index';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    PortfolioComponent,
    StocksComponent
  ],
  exports: [PortfolioComponent]
})
export class PortfolioModule { }
