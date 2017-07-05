import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdlModule} from 'angular2-mdl';
import {SearchBoxModule} from '../search-box/search-box.module';
import {HeaderComponent} from './header.component';

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
  ]
})
export class HeaderModule {
}
