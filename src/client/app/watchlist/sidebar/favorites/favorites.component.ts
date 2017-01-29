import { Component, ViewChild } from '@angular/core';
import { MdlMenuComponent } from 'angular2-mdl';
import { WatchlistStateService } from '../../state/watchlist-state.service';
import { FavoritesStateService } from './state/favorites-state.service';
import { SidebarStateService, SidebarTypeEnum } from '../state/index';
import { NotificationTypeEnum } from '../../../shared/index';
import * as _ from 'lodash';

@Component({
  moduleId: module.id,
  selector: 'mp-favorites',
  templateUrl: 'favorites.component.html',
  styleUrls: ['favorites.component.css']
})

export class FavoritesComponent {
  @ViewChild('mdlMenu')mdlMenu:MdlMenuComponent;
  favorites:any[] = [];
  notification:string;
  notificationType:NotificationTypeEnum;
  pillType:string = PillEnum[PillEnum.change];
  private pillIndex:number = PillEnum.change;
  private selected:string;

  constructor(public watchlistState:WatchlistStateService,
              public favoritesState:FavoritesStateService,
              private sidebarState:SidebarStateService) {
    watchlistState.stockSymbol$.subscribe(
      symbol => this.selected = symbol
    );

    favoritesState.data$.subscribe(
      data => this.updateFavorites(data)
    );

    favoritesState.loader$.subscribe(
      loader => this.updateNotification(loader ? NotificationTypeEnum.Loader : NotificationTypeEnum.None)
    );

    favoritesState.error$.subscribe(
      error => this.updateNotification(error ? NotificationTypeEnum.Error : NotificationTypeEnum.None, error)
    );
  }

  add() {
    this.sidebarState.changeType(SidebarTypeEnum.Add);
  }

  edit() {
    this.sidebarState.changeType(SidebarTypeEnum.Edit);
  }

  select(stock:any) {
    this.watchlistState.changeStock(stock);
    this.watchlistState.changeStockSymbol(stock.symbol);
  }

  togglePill() {
    this.pillIndex++;
    if (this.pillIndex > PillEnum.percentage) {
      this.pillIndex = PillEnum.change;
    }

    this.pillType = PillEnum[this.pillIndex];
  }

  private updateNotification(type:NotificationTypeEnum, value:string = null) {
    this.notificationType = type;
    this.notification = value;
  }

  private updateFavorites(data:any[]) {
    this.favorites = data;
    this.watchlistState.changeStock(_.find(data, ['symbol', this.selected]) || {});
  }
}

enum PillEnum {
  change,
  percentage
}
