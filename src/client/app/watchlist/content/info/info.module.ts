import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {
  InfoComponent,
  InfoApiService,
  InfoStateService,
  RangeComponent
} from './index';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    InfoComponent,
    RangeComponent
  ],
  exports: [
    InfoComponent
  ],
  providers: [
    InfoApiService,
    InfoStateService
  ]
})
export class InfoModule {
}
