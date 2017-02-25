import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { EditModule } from './edit/edit.module';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    SearchModule,
    EditModule
  ],
  declarations: [
    SidebarComponent,
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
