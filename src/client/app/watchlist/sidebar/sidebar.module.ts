import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import {
  SidebarComponent,
  EditComponent,
  FavoritesComponent,
  SidebarStateService,
  FavoritesStateService,
  FavoritesApiService
} from './index';
import { SharedModule } from '../../shared/shared.module';
import { SearchModule } from './search/search.module';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    SearchModule,
    DragulaModule
  ],
  declarations: [
    SidebarComponent,
    EditComponent,
    FavoritesComponent
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
