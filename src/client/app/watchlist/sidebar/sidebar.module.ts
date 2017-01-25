import { NgModule } from '@angular/core';
import {
  SidebarComponent,
  EditComponent,
  FavoritesComponent,
  SearchComponent,
  SidebarStateService,
  FavoritesStateService,
  FavoritesApiService
} from './index';
import { WatchlistStateService } from '../state/watchlist-state.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SidebarComponent,
    EditComponent,
    FavoritesComponent,
    SearchComponent
  ],
  exports: [
    SidebarComponent
  ],
  providers: [
    SidebarStateService,
    WatchlistStateService,
    FavoritesStateService,
    FavoritesApiService
  ]
})
export class SidebarModule {
}
