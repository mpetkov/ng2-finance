import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarStateService } from './state/index';
import { FavoritesStateService } from './favorites/state/favorites-state.service';
import { FavoritesApiService } from './favorites-api.service';

@Component({
  moduleId: module.id,
  selector: 'mp-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SidebarComponent {
  constructor(public sidebarState:SidebarStateService,
              private favoritesState:FavoritesStateService,
              private favoritesApiService:FavoritesApiService) {
    favoritesState.symbols$.subscribe(
      symbols => favoritesApiService.load(symbols)
    );
  }
}
