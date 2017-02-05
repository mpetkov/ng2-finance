import { NgModule } from '@angular/core';
import { MdlModule } from 'angular2-mdl';
import { HeaderComponent } from './index';

@NgModule({
  imports: [
    MdlModule
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
