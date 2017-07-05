import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {SearchApiService} from './search-api.service';
import {SearchStateService} from './state/search-state.service';
import {FavoritesStateService} from '../favorites/state/favorites-state.service';
import {WatchlistStateService} from '../../state/watchlist-state.service';
import {StockDataInterface} from '../../state/watchlist-state';
import {HeaderStateService} from '../../../shared/header/state/header-state.service';
import {ApiNotification} from '../../../shared/notification/api-notification';
import {SidebarStateService} from '../state/sidebar-state.service';
import {NotificationTypeEnum} from '../../../shared/notification/notification.component';
import {SidebarTypeEnum} from '../state/sidebar-state';

@Component({
  selector: 'mp-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent extends ApiNotification {
  stocks: StockDataInterface[] = [];
  notification: string;
  notificationType: NotificationTypeEnum;
  private search: string;
  private order: string[];

  constructor(private searchState: SearchStateService,
              private sidebarState: SidebarStateService,
              private favoritesState: FavoritesStateService,
              private watchlistState: WatchlistStateService,
              private searchApiService: SearchApiService,
              private headerState: HeaderStateService,
              private router: Router) {
    super(searchState, searchApiService);

    this.subscriptions.push(searchState.data$.subscribe(
      data => this.updateStocks(data)
    ));

    this.subscriptions.push(favoritesState.order$.subscribe(
      order => this.order = order
    ));

    this.subscriptions.push(headerState.search$.subscribe(
      search => this.updateSearch(search)
    ));

    this.updateStocks([]);
  }

  add(stock: StockDataInterface) {
    this.order.unshift(stock.symbol);
    this.favoritesState.changeOrder(this.order);
    this.watchlistState.addFavorite(stock.symbol);
    this.sidebarState.changeType(SidebarTypeEnum.List);
    this.router.navigate(['/watchlist', stock.symbol]);
  }

  private updateSearch(value: string) {
    this.search = value;
    if (value) {
      this.searchApiService.load(value);
    } else {
      this.updateStocks([]);
    }
  }

  private updateStocks(data: StockDataInterface[]) {
    if (data.length === 0) {
      if (this.search) {
        this.updateNotification(NotificationTypeEnum.Notification, environment.notifications.noData);
      } else {
        this.updateNotification(NotificationTypeEnum.Notification, environment.notifications.search);
      }
    }

    this.stocks = data;
  }
}
