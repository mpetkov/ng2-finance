import { Component } from '@angular/core';
import { NewsApiService } from './news-api.service';
import { NewsStateService } from './state/index';
import { WatchlistStateService } from '../../state/watchlist-state.service';

@Component({
  moduleId: module.id,
  selector: 'mp-news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css'],
  providers: [NewsApiService, NewsStateService]
})

export class NewsComponent {
  constructor(public newsState:NewsStateService,
              private watchlistState:WatchlistStateService,
              private newsApiService:NewsApiService) {
    watchlistState.stockSymbol$.subscribe(
      symbol => newsApiService.load(symbol)
    );
  }
}
