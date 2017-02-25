import { NgModule } from '@angular/core';
import {
  NewsComponent,
  NewsApiService,
  NewsStateService
} from './index';
import { SharedModule } from '../../../shared/shared.module';
import { NewsActions } from './state/news.actions';

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
    NewsStateService,
    NewsActions
  ]
})
export class NewsModule {
}
