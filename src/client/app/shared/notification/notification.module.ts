import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from 'angular2-mdl';
import { NotificationComponent } from './index';

@NgModule({
  imports: [
    CommonModule,
    MdlModule
  ],
  declarations: [
    NotificationComponent
  ],
  exports: [
    NotificationComponent
  ]
})
export class NotificationModule {
}
