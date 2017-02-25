import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {
  WatchlistComponent,
  WatchlistRoutes
} from './index';

import { ContentModule } from './content/content.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { WatchlistStateService } from './state/watchlist-state.service';
import { WatchlistActions } from './state/watchlist.actions';

@NgModule({
  imports: [
    RouterModule.forChild(WatchlistRoutes),
    SharedModule,
    ContentModule,
    SidebarModule
  ],
  declarations: [
    WatchlistComponent
  ],
  providers: [
    WatchlistStateService,
    WatchlistActions
  ]
})
export class WatchlistModule {
}
