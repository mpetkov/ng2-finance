import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SidebarStateInterface } from '../../shared/index';

@Component({
  moduleId: module.id,
  selector: 'mp-sidebar',
  templateUrl: 'sidebar.component.html'
})

export class SidebarComponent {
  sidebarStore:Observable<SidebarStateInterface>;

  constructor(private store:Store<any>) {
    this.sidebarStore = store.select((store:any) => store.sidebar);
  }
}
