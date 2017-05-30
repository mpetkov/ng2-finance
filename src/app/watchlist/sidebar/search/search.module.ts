import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  SearchComponent,
  SearchStateService,
  SearchApiService
} from './index';
import { SharedModule } from '../../../shared/shared.module';
import { SearchActions } from './state/search.actions';

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  declarations: [
    SearchComponent
  ],
  exports: [
    SearchComponent
  ],
  providers: [
    SearchStateService,
    SearchActions,
    SearchApiService
  ]
})
export class SearchModule {
}
