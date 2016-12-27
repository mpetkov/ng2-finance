import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SidebarActions, SidebarTypeEnum } from "../../../shared/index";

@Component({
  moduleId: module.id,
  selector: 'mp-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent {
  sidebarStore: Observable<any>;

  constructor(private store: Store){
    this.sidebarStore = store.select(store => store.sidebar);
  }

  add(){
    this.store.dispatch(SidebarActions.type(SidebarTypeEnum.Add));
  }

  edit(){
    this.store.dispatch(SidebarActions.type(SidebarTypeEnum.Edit));
  }
}
