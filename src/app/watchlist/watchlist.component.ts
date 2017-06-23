import {Component} from '@angular/core';
import {HeaderStateService} from '../shared/header/state/header-state.service';
import {CoreSubscriptions} from '../shared/core/subscriptions';

@Component({
  selector: 'mp-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})

export class WatchlistComponent extends CoreSubscriptions {
  sidebar: boolean;

  constructor(private headerState: HeaderStateService) {
    super();
    this.subscriptions.push(headerState.sidebar$.subscribe(
      sidebar => this.sidebar = sidebar
    ));
  }
}
