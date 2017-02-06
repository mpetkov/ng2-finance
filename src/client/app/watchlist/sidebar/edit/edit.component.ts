import { Component, Renderer, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Config } from '../../../core/index';
import { SidebarStateService, SidebarTypeEnum } from '../state/index';
import { FavoritesStateService } from '../favorites/state/index';
import { HeaderStateService } from '../../../shared/header/state/header-state.service';

@Component({
  moduleId: module.id,
  selector: 'mp-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class EditComponent implements OnDestroy {
  favorites:any[] = [];
  notification:string;
  selected:string;
  deleted:string[] = [];
  dragName:string = 'editDrag';
  private windowClickListener: Function;

  constructor(private favoritesState:FavoritesStateService,
              private sidebarState:SidebarStateService,
              private headerState:HeaderStateService,
              private renderer:Renderer,
              private dragulaService: DragulaService) {
    favoritesState.data$.subscribe(
      data => this.favorites = data
    );

    dragulaService.setOptions(this.dragName, {
      moves: function (el:any, container:any, handle:any) {
        return handle.className.indexOf('mp-drag') !== -1;
      }
    });
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
      this.notification = Config.notifications.noFavorites;
    }
    this.destroyListener();
  }

  ngOnDestroy() {
    this.destroyListener();
    this.dragulaService.destroy(this.dragName);
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

    if (type === SidebarTypeEnum.Add) {
      this.headerState.changeSearchActive(true);
    } else {
      this.sidebarState.changeType(type);
    }

    this.updateOrder();
  }

  private updateOrder() {
    let order:string[] = [];
    this.favorites.forEach((item:any) => {
      if (this.deleted.indexOf(item.symbol) === -1) {
        order.push(item.symbol);
      }
    });
    this.favoritesState.changeOrder(order);
  }
}
