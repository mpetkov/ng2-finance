import { Component } from '@angular/core';
import { WatchlistStateService } from '../../state/watchlist-state.service';
import { FavoritesStateService } from './state/favorites-state.service';
import { SidebarStateService, SidebarTypeEnum } from '../state/index';

@Component({
  moduleId: module.id,
  selector: 'mp-favorites',
  templateUrl: 'favorites.component.html',
  styleUrls: ['favorites.component.css']
})

export class FavoritesComponent {
  favorites:any[] = [];
  pillType:string = PillEnum[PillEnum.change];
  private pillIndex:number = PillEnum.change;

  constructor(public watchlistState:WatchlistStateService,
              public favoritesState:FavoritesStateService,
              private sidebarState:SidebarStateService) {
  }

  add() {
    this.sidebarState.changeType(SidebarTypeEnum.Add);
  }

  edit() {
    this.sidebarState.changeType(SidebarTypeEnum.Edit);
  }

  select(stock:any) {
    this.watchlistState.changeStock(stock);
  }

  togglePill() {
    this.pillIndex++;
    if (this.pillIndex > PillEnum.percentage) {
      this.pillIndex = PillEnum.change;
    }

    this.pillType = PillEnum[this.pillIndex];
  }
}

enum PillEnum {
  change,
  percentage
}
