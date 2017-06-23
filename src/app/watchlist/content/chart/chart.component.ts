import {Component, ViewEncapsulation} from '@angular/core';
import {ChartApiService} from './chart-api.service';
import {WatchlistStateService} from '../../state/watchlist-state.service';
import {HeaderStateService} from '../../../shared/header/state/header-state.service';
import {StockDataInterface} from '../../state/watchlist-state';
import {environment} from '../../../../environments/environment';
import {findIndex} from 'lodash';
import {ApiNotification} from '../../../shared/notification/api-notification';
import {ChartStateService} from './state/chart-state.service';
import {ChartDataInterface, ChartStateKeys} from './state/chart-state';
import {NotificationTypeEnum} from '../../../shared/notification/notification.component';
import {localStorageAdapter} from '../../../shared/core/utils';

@Component({
  selector: 'mp-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ChartComponent extends ApiNotification {
  stockData: StockDataInterface = {};
  stock: string;
  ranges: any[] = environment.chartRanges;
  rangeIndex: number;
  favorite: boolean;
  private favorites: string[] = [];
  private range: any;

  constructor(public watchlistState: WatchlistStateService,
              private chartState: ChartStateService,
              private chartApiService: ChartApiService,
              private headerState: HeaderStateService) {
    super(chartState, chartApiService);

    this.subscriptions.push(watchlistState.stockData$.subscribe(
      stockData => this.stockData = stockData
    ));

    this.subscriptions.push(watchlistState.stock$.subscribe(
      stock => this.updateStock(stock)
    ));

    this.subscriptions.push(watchlistState.favorites$.subscribe(
      favorites => this.updateFavorites(favorites)
    ));

    this.subscriptions.push(chartState.range$.subscribe(
      range => this.updateRange(range)
    ));

    this.subscriptions.push(chartState.data$.subscribe(
      data => this.validateChartData(data)
    ));
  }

  tabChanged(index: number) {
    if (this.ranges[index]) {
      this.chartState.changeRange(this.ranges[index].id);
    }
  }

  toggleFavorite(favorite: boolean) {
    if (favorite) {
      this.watchlistState.addFavorite(this.stock);
    } else {
      this.watchlistState.deleteFavorites([this.stock]);
    }
  }

  private updateFavorites(favorites: string[]) {
    this.favorites = favorites;
    this.favorite = this.favorites.indexOf(this.stock) !== -1;
  }

  private updateStock(stock: string) {
    this.stock = stock;
    this.favorite = this.favorites.indexOf(this.stock) !== -1;
    if (stock) {
      this.loadChartData();
    } else {
      this.updateNotification(NotificationTypeEnum.Notification, environment.notifications.noStock);
    }
  }

  private updateRange(range: string) {
    localStorageAdapter.setItem(ChartStateKeys.Range, range);
    let rangeIndex: number = findIndex(this.ranges, ['id', range]);
    if (rangeIndex === -1) {
      rangeIndex = 0;
    }

    setTimeout(() => {
      this.rangeIndex = rangeIndex;
      this.range = this.ranges[rangeIndex];
      this.loadChartData();
    }, 0);
  }

  private loadChartData() {
    if (this.stock && this.range) {
      this.chartApiService.load(this.stock, this.range.id, this.range.interval);
    }
  }

  private validateChartData(data: ChartDataInterface[]) {
    if (data.length === 0) {
      if (this.stock) {
        this.updateNotification(NotificationTypeEnum.Notification, environment.notifications.noData);
      } else {
        this.updateNotification(NotificationTypeEnum.Notification, environment.notifications.noStock);
      }
    }

    this.headerState.changePreloader(false);
  }
}
