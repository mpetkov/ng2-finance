import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from 'angular2-mdl';
import { SearchBoxModule } from '../search-box/search-box.module';
import { HeaderComponent } from './index';
import { HeaderStateService } from './state/header-state.service';
import { HeaderActions } from './state/header.actions';

@NgModule({
  imports: [
    CommonModule,
    MdlModule,
    SearchBoxModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    HeaderStateService,
    HeaderActions
  ]
})
export class HeaderModule {
}
