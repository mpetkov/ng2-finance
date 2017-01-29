import { Component } from '@angular/core';
import { NewsApiService } from './news-api.service';
import { NewsStateService } from './state/index';
import { WatchlistStateService } from '../../state/watchlist-state.service';
import { NotificationTypeEnum } from '../../../shared/index';

@Component({
  moduleId: module.id,
  selector: 'mp-news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css']
})

export class NewsComponent {
  news:any[] = [];
  notification:string;
  notificationType:NotificationTypeEnum;
  private symbol:string;
  constructor(private newsState:NewsStateService,
              private watchlistState:WatchlistStateService,
              private newsApiService:NewsApiService) {
    watchlistState.stockSymbol$.subscribe(
      symbol => this.updateSymbol(symbol)
    );

    newsState.data$.subscribe(
      news => this.updateNews(news)
    );

    newsState.loader$.subscribe(
      loader => this.updateNotification(loader ? NotificationTypeEnum.Loader : NotificationTypeEnum.None)
    );

    newsState.error$.subscribe(
      error => this.updateNotification(error ? NotificationTypeEnum.Error : NotificationTypeEnum.None, error)
    );

    this.updateNews([]);
  }
  private updateSymbol(symbol:string) {
    this.symbol = symbol;
    this.newsApiService.load(symbol);
  }

  private updateNews(data:any[]) {
    if (data.length === 0) {
      if (this.symbol) {
        this.updateNotification(NotificationTypeEnum.Notification, 'No results found');
      } else {
        this.updateNotification(NotificationTypeEnum.Notification, 'Please select a stock symbol');
      }
    }

    this.news = data;
  }

  private updateNotification(type:NotificationTypeEnum, value:string = null) {
    this.notificationType = type;
    this.notification = value;
  }
}
