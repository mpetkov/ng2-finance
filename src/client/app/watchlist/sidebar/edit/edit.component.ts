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
    sidebarState.watchlist$.subscribe(
      () => this.hideDelete()
    );
  }

  showDelete(symbol:string, event:any) {
    event.stopPropagation();
    this.deleteSymbol = symbol;
    this.windowClickListener = this.renderer.listenGlobal('window', 'click', (event:any) => {this.hideDelete();});
  }

  delete(symbol:string, event:any) {
    event.stopPropagation();
    this.sidebarState.deleteStock(symbol);
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
