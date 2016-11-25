import { NgModule } from '@angular/core';
import { MdlModule } from 'angular2-mdl';
import { HeaderComponent } from './header/index';
import { NavbarComponent } from './navbar/index';

@NgModule({
  imports: [
    MdlModule
  ],
  declarations: [
    HeaderComponent,
    NavbarComponent
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    MdlModule
  ]
})

export class SharedModule {}
