import { Component, Renderer, OnDestroy } from '@angular/core';
import { SidebarStateService } from '../state/index';

@Component({
  moduleId: module.id,
  selector: 'mp-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css']
})

export class EditComponent implements OnDestroy {
  deleteSymbol:string;
  private windowClickListener: Function;

  constructor(public sidebarState:SidebarStateService,
              private renderer:Renderer) {
  }

  showDelete(symbol:string, event:any) {
    this.deleteSymbol = symbol;
    event.stopPropagation();
    this.windowClickListener = this.renderer.listenGlobal('window', 'click', (event:any) => {this.hideDelete();});
  }

  delete(symbol:string) {
    //Delete logic will go here
  }

  ngOnDestroy() {
    this.hideDelete();
  }

  private hideDelete() {
    this.deleteSymbol = null;
    if(this.windowClickListener) {
      this.windowClickListener();
      this.windowClickListener = null;
    }
  }
}
