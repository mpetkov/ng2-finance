import { NgModule } from '@angular/core';
import {
  FavoritesComponent,
  FavoritesHighlightService
} from './index';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    FavoritesComponent
  ],
  exports: [
    FavoritesComponent
  ],
  providers: [
    FavoritesHighlightService
  ]
})
export class FavoritesModule {
}
