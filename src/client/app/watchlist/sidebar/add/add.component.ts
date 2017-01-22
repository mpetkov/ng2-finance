import { Component } from '@angular/core';
import { SidebarStateService, SidebarTypeEnum } from '../state/index';
import { SearchApiService } from './search-api.service';

@Component({
  moduleId: module.id,
  selector: 'mp-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css'],
  providers: [SearchApiService]
})

export class AddComponent {
  constructor(public sidebarState:SidebarStateService,
              public searchApiService:SearchApiService) {
  }

  updateSearch(value:string) {
    this.searchApiService.load(value);
  }

  add(stock:any) {
    this.sidebarState.addStock(stock.symbol);
    this.sidebarState.changeType(SidebarTypeEnum.List);
    this.sidebarState.changeStock(stock);
  }

  close() {
    this.sidebarState.changeType(SidebarTypeEnum.List);
  }
}
