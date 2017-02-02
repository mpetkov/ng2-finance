import { Component } from '@angular/core';
import {
  Config,
  CoreApiNotification
} from '../../../core/index';
import { SidebarStateService, SidebarTypeEnum } from '../state/index';
import { SearchApiService } from './search-api.service';
import { SearchStateService } from './state/search-state.service';
import { FavoritesStateService } from '../favorites/state/favorites-state.service';
import { WatchlistStateService } from '../../state/watchlist-state.service';
import { NotificationTypeEnum } from '../../../shared/index';

@Component({
  moduleId: module.id,
  selector: 'mp-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  providers: [SearchStateService, SearchApiService]
})

export class SearchComponent extends CoreApiNotification {
  stocks:any[] = [];
  notification:string;
  notificationType:NotificationTypeEnum;
  private search:string;
  private order:string[];

  constructor(private searchState:SearchStateService,
              private sidebarState:SidebarStateService,
              private favoritesState:FavoritesStateService,
              private watchlistState:WatchlistStateService,
              private searchApiService:SearchApiService) {
    super(searchState, searchApiService);

    searchState.data$.subscribe(
      data => this.updateStocks(data)
    );

    favoritesState.order$.subscribe(
      order => this.order = order
    );

    this.updateStocks([]);
  }

  updateSearch(value:string) {
    this.search = value;
    if (value) {
      this.searchApiService.load(value);
    } else {
      this.updateStocks([]);
    }
  }

  add(stock:any) {
    this.order.unshift(stock.symbol);
    this.favoritesState.changeOrder(this.order);
    this.favoritesState.add(stock.symbol);
    this.sidebarState.changeType(SidebarTypeEnum.List);
    this.watchlistState.changeStock(stock);
  }

  close() {
    this.sidebarState.changeType(SidebarTypeEnum.List);
  }

  private updateStocks(data:any[]) {
    if (data.length === 0) {
      if (this.search) {
        this.updateNotification(NotificationTypeEnum.Notification, Config.notifications.noData);
      } else {
        this.updateNotification(NotificationTypeEnum.Notification, Config.notifications.search);
      }
    }

    this.stocks = data;
  }
}
