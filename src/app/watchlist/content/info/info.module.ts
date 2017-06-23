import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {InfoActions} from './state/info-actions';
import {InfoComponent} from './info.component';
import {RangeComponent} from './range/range.component';
import {InfoApiService} from './info-api.service';
import {InfoService} from './info.service';
import {InfoStateService} from './state/info-state.service';

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
    InfoService,
    InfoStateService,
    InfoActions
  ]
})
export class InfoModule {
}
