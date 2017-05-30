import { NgModule } from '@angular/core';
import { ContentComponent } from './index';
import { ChartModule } from './chart/chart.module';
import { InfoModule } from './info/info.module';
import { NewsModule } from './news/news.module';

@NgModule({
  imports: [
    ChartModule,
    InfoModule,
    NewsModule
  ],
  declarations: [
    ContentComponent
  ],
  exports: [
    ContentComponent
  ]
})
export class ContentModule {
}
