import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdlMenuComponent } from 'angular2-mdl';
import { WatchlistStateService } from '../../state/watchlist-state.service';
import { FavoritesStateService } from './state/favorites-state.service';
import { SidebarStateService, SidebarTypeEnum } from '../state/index';
import { NotificationTypeEnum } from '../../../shared/index';
import { CoreApiNotification } from '../../../core/index';
import { FavoritesApiService } from '../favorites-api.service';
import { HeaderStateService } from '../../../shared/header/state/header-state.service';
declare let _:any;

@Component({
  moduleId: module.id,
  selector: 'mp-favorites',
  templateUrl: 'favorites.component.html',
  styleUrls: ['favorites.component.css']
})

export class FavoritesComponent extends CoreApiNotification {
  @ViewChild('mdlMenu')mdlMenu:MdlMenuComponent;
  favorites:any[] = [];
  pillType:string = PillEnum[PillEnum.change];
  private pillIndex:number = PillEnum.change;
  private selected:string;
  private sidebar:boolean;

  constructor(public watchlistState:WatchlistStateService,
              public favoritesState:FavoritesStateService,
              private favoritesApiService:FavoritesApiService,
              private sidebarState:SidebarStateService,
              private headerState:HeaderStateService,
              private router:Router) {
    super(favoritesState, favoritesApiService);

    this.subscriptions.push(watchlistState.stockSymbol$.subscribe(
      symbol => this.selected = symbol
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

  select(symbol:string) {
    if (this.sidebar) {
      this.headerState.changeSidebar(false);
    }

    this.router.navigate(['/watchlist', symbol]);
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

  private updateFavorites(data:any[]) {
    this.favorites = data;
    this.watchlistState.changeStock(_.find(data, ['symbol', this.selected]) || {});
    if (data.length === 0) {
      this.updateNotification(
        NotificationTypeEnum.Notification,
        'Your favorites is empty!',
        {
          icon: 'add',
          text: 'Add symbol',
          action: FavoriteNotificationActions.Add
        });
    }
  }
}

enum PillEnum {
  change,
  percentage
}

export class FavoriteNotificationActions {
  static Add = 'add';
}
