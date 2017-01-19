import { Component, ViewEncapsulation } from '@angular/core';
import {
  SidebarStateService,
  StocksStateService
} from './index';

@Component({
  moduleId: module.id,
  selector: 'mp-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [SidebarStateService, StocksStateService]
})

export class SidebarComponent {
  constructor(public sidebarState:SidebarStateService) {
  }
}
