import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import {
  SidebarComponent,
  EditComponent,
  FavoritesComponent,
  SearchComponent,
  SidebarStateService,
  FavoritesStateService,
  FavoritesApiService
} from './index';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    DragulaModule
  ],
  declarations: [
    SidebarComponent,
    EditComponent,
    FavoritesComponent,
    SearchComponent
  ],
  exports: [
    SidebarComponent
  ],
  providers: [
    SidebarStateService,
    FavoritesStateService,
    FavoritesApiService
  ]
})
export class SidebarModule {
}
