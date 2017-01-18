import { Component } from '@angular/core';
import {
  SidebarStateInterface,
  SidebarStateService,
  StocksStateService
} from './index';

@Component({
  moduleId: module.id,
  selector: 'mp-sidebar',
  templateUrl: 'sidebar.component.html',
  providers: [SidebarStateService, StocksStateService]
})

export class SidebarComponent {
  constructor(public sidebarState:SidebarStateService) {
  }
}
