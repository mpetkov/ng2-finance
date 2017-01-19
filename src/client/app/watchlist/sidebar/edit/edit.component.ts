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
    event.stopPropagation();
    this.deleteSymbol = symbol;
    this.windowClickListener = this.renderer.listenGlobal('window', 'click',
      (event:any) => {
        this.deleteSymbol = null;
        this.destroyListener();
      });
  }

  delete(symbol:string, event:any) {
    event.stopPropagation();
    this.sidebarState.deleteStock(symbol);
    this.destroyListener();
  }

  ngOnDestroy() {
    this.destroyListener();
  }

  private destroyListener() {
    if(this.windowClickListener) {
      this.windowClickListener();
      this.windowClickListener = null;
    }
  }
}
