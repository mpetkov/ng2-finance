import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { WatchlistComponent } from './index';

import { ContentModule } from './content/content.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { WatchlistStateService } from './state/watchlist-state.service';

@NgModule({
  imports: [
    SharedModule,
    ContentModule,
    SidebarModule
  ],
  declarations: [
    WatchlistComponent
  ],
  providers: [
    WatchlistStateService
  ]
})
export class WatchlistModule {
}
