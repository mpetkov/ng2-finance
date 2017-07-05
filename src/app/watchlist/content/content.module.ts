import {NgModule} from '@angular/core';
import {ChartModule} from './chart/chart.module';
import {InfoModule} from './info/info.module';
import {NewsModule} from './news/news.module';
import {ContentComponent} from './content.component';

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
