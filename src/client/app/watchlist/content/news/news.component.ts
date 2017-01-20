import { Component } from '@angular/core';
import { NewsApiService } from './news-api.service';
import { NewsStateService } from './state/index';
import { SidebarStateService } from '../../sidebar/state/index';

@Component({
  moduleId: module.id,
  selector: 'mp-news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css'],
  providers: [NewsApiService, NewsStateService]
})

export class NewsComponent {
  constructor(public newsState:NewsStateService,
              private sidebarState:SidebarStateService,
              private newsApiService:NewsApiService) {
    sidebarState.stock$.subscribe(
      stock => newsApiService.load(stock)
    );
  }
}
