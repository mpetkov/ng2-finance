import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdlMenuComponent } from 'angular2-mdl';
import { WatchlistStateService } from '../../state/watchlist-state.service';
import { FavoritesStateService } from './state/favorites-state.service';
import { SidebarStateService, SidebarTypeEnum } from '../state/index';
import { NotificationTypeEnum } from '../../../shared/index';
import { CoreApiNotification } from '../../../core/index';
import { FavoritesApiService } from '../favorites-api.service';
import { FavoritesHighlightService } from './favorites-highlight.service';
import { HeaderStateService } from '../../../shared/header/state/header-state.service';
declare let _:any;

@Component({
  moduleId: module.id,
  selector: 'mp-favorites',
  templateUrl: 'favorites.component.html',
  styleUrls: ['favorites.component.css'],
  providers: [FavoritesHighlightService]
})

export class FavoritesComponent extends CoreApiNotification implements OnDestroy {
  @ViewChild('mdlMenu')mdlMenu:MdlMenuComponent;
  favoritesData:any[] = [];
  stock:string;
  pillType:string = PillEnum[PillEnum.change];
  private pillIndex:number = PillEnum.change;
  private sidebar:boolean;
  private refreshTimeout:any;
  private lastLoadedData:any = {};

  constructor(public watchlistState:WatchlistStateService,
              public favoritesState:FavoritesStateService,
              private favoritesApiService:FavoritesApiService,
              private favoritesHighlightService:FavoritesHighlightService,
              private sidebarState:SidebarStateService,
              private headerState:HeaderStateService,
              private router:Router) {
    super(favoritesState, favoritesApiService);

    this.subscriptions.push(watchlistState.stock$.subscribe(
      stock => this.changeStock(stock)
    ));

    this.subscriptions.push(favoritesState.data$.subscribe(
      data => this.updateFavorites(data)
    ));

    this.subscriptions.push(headerState.sidebar$.subscribe(
      sidebar => this.sidebar = sidebar
    ));
  }

  add() {
    this.headerState.changeSearchActive(true);
  }

  edit() {
    this.sidebarState.changeType(SidebarTypeEnum.Edit);
  }

  select(stock:string) {
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

  notificationAction(type:string) {
    super.notificationAction(type);
    if (type === FavoriteNotificationActions.Add) {
      this.add();
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.cancelTimeout();
  }

  private updateFavorites(data:any[]) {
    this.favoritesData = data;
    this.watchlistState.changeHighlights(this.favoritesHighlightService.getHighlights(data, this.lastLoadedData));
    this.lastLoadedData = this.favoritesHighlightService.getLastLoadedData(data);

    setTimeout(() => {
      this.watchlistState.changeHighlights({});
    },500);

    this.watchlistState.changeStockData(_.find(data, ['symbol', this.stock]) || {});
    if (data.length === 0) {
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

  private changeStock(stock:string) {
    this.stock = stock;
    this.watchlistState.changeStockData(_.find(this.favoritesData, ['symbol', stock]) || {});
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
