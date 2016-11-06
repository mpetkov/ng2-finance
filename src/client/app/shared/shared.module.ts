import { NgModule } from '@angular/core';
import { MdlModule } from 'angular2-mdl';
import { HeaderComponent } from './header/index';

@NgModule({
  imports: [
    MdlModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent,
    MdlModule
  ]
})

export class SharedModule {}
