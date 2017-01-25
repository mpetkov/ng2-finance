import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdlModule } from 'angular2-mdl';
import { HeaderComponent, NavbarComponent, NotificationComponent, SearchBoxComponent } from './index';

@NgModule({
  imports: [
    MdlModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    NavbarComponent,
    NotificationComponent,
    SearchBoxComponent
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    NotificationComponent,
    SearchBoxComponent,
    MdlModule,
    CommonModule
  ]
})

export class SharedModule {
}
