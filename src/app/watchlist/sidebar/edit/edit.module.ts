import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula';
import {
  EditComponent,
  EditService
} from './index';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    DragulaModule
  ],
  declarations: [
    EditComponent
  ],
  exports: [
    EditComponent
  ],
  providers: [
    EditService
  ]
})
export class EditModule {
}
