import {Component, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MdlMenuComponent} from 'angular2-mdl';
import {WatchlistStateService} from '../../state/watchlist-state.service';
import {StockDataInterface} from '../../state/watchlist-state';
import {FavoritesStateService} from './state/favorites-state.service';
import {FavoritesStateKeys} from './state/favorites-state';
import {FavoritesApiService} from '../favorites-api.service';
import {FavoritesHighlightService} from './favorites-highlight.service';
import {HeaderStateService} from '../../../shared/header/state/header-state.service';
import {localStorageAdapter} from '../../../shared/core/utils';
import {ApiNotification} from '../../../shared/notification/api-notification';
import {SidebarStateService} from '../state/sidebar-state.service';
import {SidebarTypeEnum} from '../state/sidebar-state';
import {NotificationTypeEnum} from '../../../shared/notification/notification.component';
import {find} from 'lodash';

@Component({
  selector: 'mp-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent extends ApiNotification implements OnDestroy {
  @ViewChild('mdlMenu') mdlMenu: MdlMenuComponent;
  favoritesData: StockDataInterface[] = [];
  stock: string;
  pillType: string = PillEnum[PillEnum.change];
  private pillIndex: number = PillEnum.change;
  private sidebar: boolean;
  private refreshTimeout: any;
  private lastLoadedData: any = {};
  private favorites: string[] = [];
  private data: StockDataInterface[] = [];

  constructor(public watchlistState: WatchlistStateService,
              public favoritesState: FavoritesStateService,
              private favoritesApiService: FavoritesApiService,
              private favoritesHighlightService: FavoritesHighlightService,
              private sidebarState: SidebarStateService,
              private headerState: HeaderStateService,
              private router: Router) {
    super(favoritesState, favoritesApiService);

    this.subscriptions.push(watchlistState.favorites$.subscribe(
      favorites => this.favorites = favorites
    ));

    this.subscriptions.push(watchlistState.stock$.subscribe(
      stock => this.changeStock(stock)
    ));

    this.subscriptions.push(favoritesState.data$.subscribe(
      data => this.updateFavorites(data)
    ));

    this.subscriptions.push(headerState.sidebar$.subscribe(
      sidebar => this.sidebar = sidebar
    ));

    this.subscriptions.push(favoritesState.order$.subscribe(
      order => localStorageAdapter.setItem(FavoritesStateKeys.Order, order)
    ));

    favoritesState.sortData();
  }

  add() {
    this.headerState.changeSearchActive(true);
  }

  edit() {
    this.sidebarState.changeType(SidebarTypeEnum.Edit);
  }

  reload() {
    this.cancelTimeout();
    this.favoritesApiService.reload();
  }

  select(stock: string) {
    if (this.sidebar) {
      this.headerState.changeSidebar(false);
    }

    this.router.navigate(['/watchlist', stock]);
  }

  togglePill() {
    this.pillIndex++;
    if (this.pillIndex > PillEnum.percentage) {
      this.pillIndex = PillEnum.change;
    }

    this.pillType = PillEnum[this.pillIndex];
  }

  notificationAction(type: string) {
    super.notificationAction(type);
    if (type === FavoriteNotificationActions.Add) {
      this.add();
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.cancelTimeout();
  }

  private updateFavorites(data: StockDataInterface[]) {
    this.data = data;
    this.favoritesData = data.filter((item: StockDataInterface) => {
      return this.favorites.indexOf(item.symbol) !== -1;
    });
    this.watchlistState.changeHighlights(this.favoritesHighlightService.getHighlights(data, this.lastLoadedData));
    this.lastLoadedData = this.favoritesHighlightService.getLastLoadedData(data);

    setTimeout(() => {
      this.watchlistState.changeHighlights({});
    }, 500);

    this.watchlistState.changeStockData(find(data, ['symbol', this.stock]) || {});
    if (this.favoritesData.length === 0) {
      this.updateNotification(
        NotificationTypeEnum.Notification,
        'Your favorites is empty!',
        {
          icon: 'add',
          text: 'Add symbol',
          action: FavoriteNotificationActions.Add
        });
    } else {
      this.startRefresh();
    }
  }

  private changeStock(stock: string) {
    this.stock = stock;
    this.watchlistState.changeStockData(find(this.data, ['symbol', stock]) || {});
  }

  private cancelTimeout() {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
  }

  private startRefresh() {
    this.cancelTimeout();
    this.refreshTimeout = setTimeout(() => {
      this.favoritesApiService.disableLoader = true;
      this.favoritesApiService.reload();
    }, 10000);
  }
}

enum PillEnum {
  change,
  percentage
}

export class FavoriteNotificationActions {
  static Add = 'add';
}
