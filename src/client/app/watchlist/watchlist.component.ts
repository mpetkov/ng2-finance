import { Component } from '@angular/core';
import { HeaderStateService } from '../shared/header/state/header-state.service';

@Component({
  moduleId: module.id,
  selector: 'mp-watchlist',
  templateUrl: 'watchlist.component.html',
  styleUrls: ['watchlist.component.css']
})

export class WatchlistComponent {
  sidebar:boolean;
  constructor(private headerState:HeaderStateService) {
    headerState.sidebar$.subscribe(
      sidebar => this.sidebar = sidebar
    );
  }
}
