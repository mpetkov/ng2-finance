import { Component } from '@angular/core';
import { NewsApiService } from './news-api.service';
import {
  NewsStateService,
  NewsDataInterface
} from './state/index';
import { WatchlistStateService } from '../../state/watchlist-state.service';
import { NotificationTypeEnum } from '../../../shared/index';
import { CoreApiNotification } from '../../../core/index';
import {environment} from '../../../../environments/environment';

@Component({
  moduleId: module.id,
  selector: 'mp-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent extends CoreApiNotification {
  news:NewsDataInterface[] = [];
  private stock:string;

  constructor(private newsState:NewsStateService,
              private watchlistState:WatchlistStateService,
              private newsApiService:NewsApiService) {
    super(newsState, newsApiService);

    this.subscriptions.push(watchlistState.stock$.subscribe(
      stock => this.updateStock(stock)
    ));

    this.subscriptions.push(newsState.data$.subscribe(
      news => this.updateNews(news)
    ));

    this.updateNews([]);
  }

  reload() {
    this.newsApiService.reload();
  }

  private updateStock(stock:string) {
    this.stock = stock;
    if (stock) {
      this.newsApiService.load(stock);
    }
  }

  private updateNews(data:NewsDataInterface[]) {
    if (data.length === 0) {
      if (this.stock) {
        this.updateNotification(NotificationTypeEnum.Notification, environment.notifications.noData);
      } else {
        this.updateNotification(NotificationTypeEnum.Notification, environment.notifications.noStock);
      }
    }

    this.news = data;
  }
}
