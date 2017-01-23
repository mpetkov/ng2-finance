import { Component } from '@angular/core';
import { FavoritesApiService } from './favorites-api.service';
import { SidebarStateService, SidebarTypeEnum } from '../state/index';

@Component({
  moduleId: module.id,
  selector: 'mp-favorites',
  templateUrl: 'favorites.component.html',
  styleUrls: ['favorites.component.css'],
  providers: [FavoritesApiService]
})

export class FavoritesComponent {
  favorites:any[] = [];
  pillType:string = PillEnum[PillEnum.change];
  private pillIndex:number = PillEnum.change;

  constructor(public sidebarState:SidebarStateService,
              private favoritesApiService:FavoritesApiService) {
    sidebarState.favorites$.subscribe(
      value => favoritesApiService.load(value)
    );
  }

  add() {
    this.sidebarState.changeType(SidebarTypeEnum.Add);
  }

  edit() {
    this.sidebarState.changeType(SidebarTypeEnum.Edit);
  }

  changePill() {
    this.pillIndex++;
    if (this.pillIndex > PillEnum.percentage) {
      this.pillIndex = PillEnum.change;
    }

    this.pillType = PillEnum[this.pillIndex];
  }

  changeStock(stock:any) {
    this.sidebarState.changeStock(stock);
  }
}

enum PillEnum {
  change,
  percentage
}
