import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  SearchComponent,
  SearchStateService,
  SearchApiService
} from './index';
import { SharedModule } from '../../../shared/shared.module';

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
    SearchApiService
  ]
})
export class SearchModule {
}
