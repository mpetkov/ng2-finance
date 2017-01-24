import { Component } from '@angular/core';
import { SidebarStateService, SidebarTypeEnum } from '../state/index';
import { SearchApiService } from './search-api.service';
import { SearchStateService } from './state/search-state.service';
import { FavoritesStateService } from '../favorites/state/favorites-state.service';
import { WatchlistStateService } from '../../state/watchlist-state.service';

@Component({
  moduleId: module.id,
  selector: 'mp-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  providers: [SearchStateService, SearchApiService]
})

export class SearchComponent {
  constructor(public searchState:SearchStateService,
              private sidebarState:SidebarStateService,
              private favoritesState:FavoritesStateService,
              private watchlistState:WatchlistStateService,
              private searchApiService:SearchApiService) {
  }

  updateSearch(value:string) {
    this.searchApiService.load(value);
  }

  add(stock:any) {
    this.favoritesState.add(stock.symbol);
    this.sidebarState.changeType(SidebarTypeEnum.List);
    this.watchlistState.changeStock(stock);
  }

  close() {
    this.sidebarState.changeType(SidebarTypeEnum.List);
  }
}
