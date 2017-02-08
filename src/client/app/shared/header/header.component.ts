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
  sidebar:boolean;
  private searchFromContent:boolean;

  constructor(private headerState:HeaderStateService) {
    headerState.searchActive$.subscribe(
      searchActive => this.searchActiveChange(searchActive)
    );

    headerState.sidebar$.subscribe(
      sidebar => this.sidebar = sidebar
    );
  }

  updateSearch(value:string) {
    this.headerState.changeSearch(value);
  }

  activateSearch(active:boolean) {
    this.headerState.changeSearchActive(active);
  }

  showSidebar() {
    this.headerState.changeSidebar(true);
  }

  toggleSearch(active:boolean) {
    this.headerState.changeSearchActive(active);
  }

  private searchActiveChange(searchActive:boolean) {
    this.active = searchActive;

    if (searchActive && !this.sidebar) {
      this.searchFromContent = true;
      this.headerState.changeSidebar(true);
    } else if(!searchActive && this.searchFromContent) {
      this.searchFromContent = false;
      if(this.sidebar) {
        this.headerState.changeSidebar(false);
      }
    }
  }
}
