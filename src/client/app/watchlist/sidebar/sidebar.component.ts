import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import {
  SidebarStateService,
  SidebarTypeEnum
} from './state/index';
import { FavoritesStateService } from './favorites/state/favorites-state.service';
import { FavoritesApiService } from './favorites-api.service';
import { WatchlistStateService } from '../state/watchlist-state.service';
import { HeaderStateService } from '../../shared/header/state/header-state.service';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/takeUntil';
import { Subscriptions } from '../../core/subscriptions';

@Component({
  moduleId: module.id,
  selector: 'mp-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SidebarComponent extends Subscriptions implements OnDestroy {
  private ngOnDestroy$ = new Subject<boolean>();
  constructor(public sidebarState:SidebarStateService,
              private route: ActivatedRoute,
              private favoritesState:FavoritesStateService,
              private favoritesApiService:FavoritesApiService,
              private watchlistState:WatchlistStateService,
              private headerState:HeaderStateService) {
    super();
    this.subscriptions.push(favoritesState.symbols$.subscribe(
      symbols => favoritesApiService.load(symbols)
    ));

    this.subscriptions.push(headerState.searchActive$.subscribe(
      searchActive => searchActive ? sidebarState.changeType(SidebarTypeEnum.Add) : sidebarState.changeType(SidebarTypeEnum.List)
    ));

    route.params
      .takeUntil(this.ngOnDestroy$)
      .pluck('id')
      .distinctUntilChanged()
      .subscribe((id: string) => watchlistState.changeStockSymbol(id));
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next(true);
  }
}
