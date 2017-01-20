import { Component } from '@angular/core';
import { SidebarStateService } from './sidebar/state/index';

@Component({
  moduleId: module.id,
  selector: 'mp-watchlist',
  templateUrl: 'watchlist.component.html',
  styleUrls: ['watchlist.component.css'],
  providers: [SidebarStateService]
})

export class WatchlistComponent {
}
