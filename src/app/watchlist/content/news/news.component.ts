import {Component} from '@angular/core';
import {NewsApiService} from './news-api.service';
import {WatchlistStateService} from '../../state/watchlist-state.service';
import {environment} from '../../../../environments/environment';
import {ApiNotification} from '../../../shared/notification/api-notification';
import {NewsDataInterface} from './state/news-state';
import {NewsStateService} from './state/news-state.service';
import {NotificationTypeEnum} from '../../../shared/notification/notification.component';

@Component({
  selector: 'mp-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent extends ApiNotification {
  news: NewsDataInterface[] = [];
  private stock: string;

  constructor(private newsState: NewsStateService,
              private watchlistState: WatchlistStateService,
              private newsApiService: NewsApiService) {
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

  private updateStock(stock: string) {
    this.stock = stock;
    if (stock) {
      this.newsApiService.load(stock);
    }
  }

  private updateNews(data: NewsDataInterface[]) {
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
