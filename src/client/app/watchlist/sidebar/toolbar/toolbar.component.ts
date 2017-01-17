import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SidebarActions, SidebarTypeEnum, SidebarStateInterface } from '../../../shared/index';

@Component({
  moduleId: module.id,
  selector: 'mp-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent {
  sidebarStore:Observable<SidebarStateInterface>;
  title:string;

  constructor(private store:Store<any>) {
    this.sidebarStore = store.select((store:any) => store.sidebar);
    this.title = 'Stocks';
  }

  add() {
    this.store.dispatch(SidebarActions.type(SidebarTypeEnum.Add));
    this.title = 'Add';
  }

  edit() {
    this.store.dispatch(SidebarActions.type(SidebarTypeEnum.Edit));
    this.title = 'Edit';
  }

  close() {
    this.store.dispatch(SidebarActions.type(SidebarTypeEnum.List));
    this.title = 'Stocks';
  }
}
