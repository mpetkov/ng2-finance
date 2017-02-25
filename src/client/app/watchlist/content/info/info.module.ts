import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {
  InfoComponent,
  InfoApiService,
  InfoStateService,
  RangeComponent
} from './index';
import { InfoActions } from './state/info.actions';

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
    InfoStateService,
    InfoActions
  ]
})
export class InfoModule {
}
