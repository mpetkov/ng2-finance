import { NgModule } from '@angular/core';
import { MdlModule } from 'angular2-mdl';
import { SearchBoxModule } from '../search-box/search-box.module';
import { HeaderComponent } from './index';

@NgModule({
  imports: [
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
