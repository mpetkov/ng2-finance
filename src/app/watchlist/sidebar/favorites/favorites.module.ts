import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {FavoritesComponent} from './favorites.component';
import {FavoritesHighlightService} from './favorites-highlight.service';

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
