import { Component } from '@angular/core';
import { HeaderStateService } from '../shared/header/state/header-state.service';
import { Subscriptions } from '../core/subscriptions';

@Component({
  moduleId: module.id,
  selector: 'mp-watchlist',
  templateUrl: 'watchlist.component.html',
  styleUrls: ['watchlist.component.css']
})

export class WatchlistComponent extends Subscriptions {
  sidebar:boolean;

  constructor(private headerState:HeaderStateService) {
    super();
    this.subscriptions.push(headerState.sidebar$.subscribe(
      sidebar => this.sidebar = sidebar
    ));
  }
}
