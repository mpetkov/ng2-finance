import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/index';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})

export class SharedModule {}
