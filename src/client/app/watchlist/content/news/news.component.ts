import { Component } from '@angular/core';
import { NewsApiService } from './news-api.service';
import { NewsStateService } from './state/index';
import { WatchlistStateService } from '../../state/watchlist-state.service';
import { NotificationTypeEnum } from '../../../shared/index';
import {
  CoreApiNotification,
  Config
} from '../../../core/index';

@Component({
  moduleId: module.id,
  selector: 'mp-news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css']
})

export class NewsComponent extends CoreApiNotification {
  news:any[] = [];
  private symbol:string;
  constructor(private newsState:NewsStateService,
              private watchlistState:WatchlistStateService,
              private newsApiService:NewsApiService) {
    super(newsState, newsApiService);

    watchlistState.stockSymbol$.subscribe(
      symbol => this.updateSymbol(symbol)
    );

    newsState.data$.subscribe(
      news => this.updateNews(news)
    );

    this.updateNews([]);
  }

  private updateSymbol(symbol:string) {
    this.symbol = symbol;
    if(symbol) {
      this.newsApiService.load(symbol);
    }
  }

  private updateNews(data:any[]) {
    if (data.length === 0) {
      if (this.symbol) {
        this.updateNotification(NotificationTypeEnum.Notification, Config.notifications.noData);
      } else {
        this.updateNotification(NotificationTypeEnum.Notification, Config.notifications.noStock);
      }
    }

    this.news = data;
  }
}
