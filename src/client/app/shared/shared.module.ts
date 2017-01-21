import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdlModule } from 'angular2-mdl';
import { HeaderComponent, NavbarComponent, SearchBoxComponent } from './index';

@NgModule({
  imports: [
    MdlModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    NavbarComponent,
    SearchBoxComponent
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    SearchBoxComponent,
    MdlModule,
    CommonModule
  ]
})

export class SharedModule {
}
