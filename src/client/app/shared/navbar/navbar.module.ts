import { NgModule } from '@angular/core';
import { MdlModule } from 'angular2-mdl';
import { NavbarComponent } from './index';

@NgModule({
  imports: [
    MdlModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule {
}
