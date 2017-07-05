import {NgModule} from '@angular/core';
import {DragulaModule} from 'ng2-dragula';
import {SharedModule} from '../../../shared/shared.module';
import {EditComponent} from './edit.component';
import {EditService} from './edit.service';

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
