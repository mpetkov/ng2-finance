import {Component, ViewEncapsulation} from '@angular/core';
import {HeaderStateService} from './state/header-state.service';
import {CoreSubscriptions} from '../core/subscriptions';

@Component({
  selector: 'mp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent extends CoreSubscriptions {
  active: boolean;
  sidebar: boolean;
  private searchFromContent: boolean;

  constructor(private headerState: HeaderStateService) {
    super();
    this.subscriptions.push(headerState.searchActive$.subscribe(
      searchActive => this.searchActiveChange(searchActive)
    ));

    this.subscriptions.push(headerState.sidebar$.subscribe(
      sidebar => this.sidebar = sidebar
    ));
  }

  updateSearch(value: string) {
    this.headerState.changeSearch(value);
  }

  activateSearch(active: boolean) {
    this.headerState.changeSearchActive(active);
  }

  showSidebar() {
    this.headerState.changeSidebar(true);
  }

  toggleSearch(active: boolean) {
    this.headerState.changeSearchActive(active);
  }

  private searchActiveChange(searchActive: boolean) {
    this.active = searchActive;

    if (searchActive && !this.sidebar) {
      this.searchFromContent = true;
      this.headerState.changeSidebar(true);
    } else if (!searchActive && this.searchFromContent) {
      this.searchFromContent = false;
      if (this.sidebar) {
        this.headerState.changeSidebar(false);
      }
    }
  }
}
