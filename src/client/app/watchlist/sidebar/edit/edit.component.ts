import { Component, HostListener, Renderer, OnDestroy } from '@angular/core';
import { StocksStateService } from '../stocks/state/stocks-state.service';

@Component({
  moduleId: module.id,
  selector: 'mp-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css']
})

export class EditComponent implements OnDestroy {
  deleteSymbol:string;
  private windowClickListener: Function;

  constructor(public stocksState:StocksStateService,
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

  private hideDelete(){
    this.deleteSymbol = null;
    if(this.windowClickListener) {
      this.windowClickListener();
      this.windowClickListener = null;
    }
  }
}
