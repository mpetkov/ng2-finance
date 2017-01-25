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
  favorites:any[] = [];
  notification:string;
  selected:string;
  deleted:string[] = [];
  private windowClickListener: Function;

  constructor(private favoritesState:FavoritesStateService,
              private sidebarState:SidebarStateService,
              private renderer:Renderer) {
    favoritesState.data$.subscribe(
      data => this.favorites = data
    );
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
    this.closeScreen(SidebarTypeEnum.List);
  }

  add() {
    this.closeScreen(SidebarTypeEnum.Add);
  }

  delete(symbol:string, event:any) {
    event.stopPropagation();
    this.deleted.push(symbol);
    if (this.deleted.length === this.favorites.length) {
      this.notification = 'Your favorites is now empty';
    }
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

  private closeScreen(type:SidebarTypeEnum) {
    if (this.deleted.length > 0) {
      this.favoritesState.delete(this.deleted);
    }
    this.sidebarState.changeType(type);
  }
}
