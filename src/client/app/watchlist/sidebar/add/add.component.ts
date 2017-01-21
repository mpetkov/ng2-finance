import { Component, Renderer, OnDestroy } from '@angular/core';
import { SidebarStateService, SidebarTypeEnum } from '../state/index';

@Component({
  moduleId: module.id,
  selector: 'mp-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css']
})

export class AddComponent {
  constructor(public sidebarState:SidebarStateService) {
  }

  updateSearch(value:string) {
    
  }

  close() {
    this.sidebarState.changeType(SidebarTypeEnum.List);
  }
}
