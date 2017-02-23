import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { ChartApiService } from './chart-api.service';
import {
  ChartStateService,
  ChartStateKeys,
  ChartDataInterface
} from './state/index';
import { WatchlistStateService } from '../../state/watchlist-state.service';
import { NotificationTypeEnum } from '../../../shared/index';
import { AppStateService } from '../../../state/app-state.service';
import {
  Config,
  ChartRangesInterface,
  CoreApiNotification,
  localStorageAdapter
} from '../../../core/index';
import { StockDataInterface } from '../../state/watchlist.state';
declare let _:any;

@Component({
  moduleId: module.id,
  selector: 'mp-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ChartComponent extends CoreApiNotification {
  stockData:StockDataInterface = {};
  stock:string;
  ranges:ChartRangesInterface[] = Config.chartRanges;
  rangeIndex:number;
  favorite:boolean;
  private favorites:string[] = [];
  private range:ChartRangesInterface;

  constructor(public watchlistState:WatchlistStateService,
              private chartState:ChartStateService,
              private chartApiService:ChartApiService,
              private appState:AppStateService) {
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

  tabChanged(index:number) {
    if (this.ranges[index]) {
      this.chartState.changeRange(this.ranges[index].id);
    }
  }

  toggleFavorite(favorite:boolean) {
    if (favorite) {
      this.watchlistState.addFavorite(this.stock);
    } else {
      this.watchlistState.deleteFavorites([this.stock]);
    }
  }

  private updateFavorites(favorites:string[]) {
    this.favorites = favorites;
    this.favorite = this.favorites.indexOf(this.stock) !== -1;
  }

  private updateStock(stock:string) {
    this.stock = stock;
    this.favorite = this.favorites.indexOf(this.stock) !== -1;
    if (stock) {
      this.loadChartData();
    } else {
      this.updateNotification(NotificationTypeEnum.Notification, Config.notifications.noStock);
    }
  }

  private updateRange(range:string) {
    localStorageAdapter.setItem(ChartStateKeys.Range, range);
    let rangeIndex:number = _.findIndex(this.ranges, ['id', range]);
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

  private validateChartData(data:ChartDataInterface[]) {
    if (data.length === 0) {
      if (this.stock) {
        this.updateNotification(NotificationTypeEnum.Notification, Config.notifications.noData);
      } else {
        this.updateNotification(NotificationTypeEnum.Notification, Config.notifications.noStock);
      }
    }

    this.appState.changePreloader(false);
  }
}
