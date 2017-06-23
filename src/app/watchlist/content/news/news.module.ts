import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {NewsActions} from './state/news-actions';
import {NewsComponent} from './news.component';
import {NewsApiService} from './news-api.service';
import {NewsStateService} from './state/news-state.service';

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
