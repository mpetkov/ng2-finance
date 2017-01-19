import { Component } from '@angular/core';
import { SidebarStateService, SidebarTypeEnum } from '../index';

@Component({
  moduleId: module.id,
  selector: 'mp-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent {
  title:string;

  constructor(public sidebarState:SidebarStateService) {
    this.title = 'Stocks';
  }

  add() {
    this.sidebarState.changeType(SidebarTypeEnum.Add);
    this.title = 'Add';
  }

  edit() {
    this.sidebarState.changeType(SidebarTypeEnum.Edit);
    this.title = 'Edit';
  }

  close() {
    this.sidebarState.changeType(SidebarTypeEnum.List);
    this.title = 'Stocks';
  }
}
