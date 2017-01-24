import { Component } from '@angular/core';
import { WatchlistStateService } from './state/watchlist-state.service';

@Component({
  moduleId: module.id,
  selector: 'mp-watchlist',
  templateUrl: 'watchlist.component.html',
  styleUrls: ['watchlist.component.css'],
  providers: [WatchlistStateService]
})

export class WatchlistComponent {
}
