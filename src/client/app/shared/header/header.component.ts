import { Component, ViewEncapsulation } from '@angular/core';
import { HeaderStateService } from './state/header-state.service';

@Component({
  moduleId: module.id,
  selector: 'mp-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent {
  active:boolean;

  constructor(private headerState:HeaderStateService) {
    headerState.searchActive$.subscribe(
      searchActive => this.active = searchActive
    );
  }

  updateSearch(value:string) {
    this.headerState.changeSearch(value);
  }

  activateSearch(active:boolean) {
    this.headerState.changeSearchActive(active);
  }
}
