import { NgModule } from '@angular/core';
import { MdlModule } from 'angular2-mdl';
import { HeaderComponent } from './header/index';
import { SidebarComponent } from './sidebar/index';

@NgModule({
  imports: [
    MdlModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    MdlModule
  ]
})

export class SharedModule {}
