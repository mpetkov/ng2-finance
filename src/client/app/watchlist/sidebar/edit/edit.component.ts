import { Component, Renderer, OnDestroy } from '@angular/core';
import { SidebarStateService, SidebarTypeEnum } from '../state/index';
import { FavoritesStateService } from '../favorites/state/index';

@Component({
  moduleId: module.id,
  selector: 'mp-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css']
})

export class EditComponent implements OnDestroy {
  selected:string;
  deleted:string[] = [];
  private windowClickListener: Function;

  constructor(public favoritesState:FavoritesStateService,
              private sidebarState:SidebarStateService,
              private renderer:Renderer) {
  }

  showDelete(symbol:string, event:any) {
    event.stopPropagation();
    this.selected = symbol;
    this.windowClickListener = this.renderer.listenGlobal('window', 'click',
      (event:any) => {
        this.selected = null;
        this.destroyListener();
      });
  }

  close() {
    this.favoritesState.delete(this.deleted);
    this.sidebarState.changeType(SidebarTypeEnum.List);
  }

  add() {
    this.favoritesState.delete(this.deleted);
    this.sidebarState.changeType(SidebarTypeEnum.Add);
  }

  delete(symbol:string, event:any) {
    event.stopPropagation();
    this.deleted.push(symbol);
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
