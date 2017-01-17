import { Component } from '@angular/core';
import { SidebarStateInterface, SidebarStateService } from "./index";

@Component({
  moduleId: module.id,
  selector: 'mp-sidebar',
  templateUrl: 'sidebar.component.html',
  providers: [SidebarStateService]
})

export class SidebarComponent {
  constructor(public sidebarState:SidebarStateService) {
  }
}
