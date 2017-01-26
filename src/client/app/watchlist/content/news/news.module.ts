import { NgModule } from '@angular/core';
import {
  NewsComponent,
  NewsApiService,
  NewsStateService
} from './index';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NewsComponent
  ],
  exports: [
    NewsComponent
  ],
  providers: [
    NewsApiService,
    NewsStateService
  ]
})
export class NewsModule {
}
