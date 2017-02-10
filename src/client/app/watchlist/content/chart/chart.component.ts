import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { ChartApiService } from './chart-api.service';
import { ChartStateService } from './state/index';
import { WatchlistStateService } from '../../state/watchlist-state.service';
import { NotificationTypeEnum } from '../../../shared/index';
import { AppStateService } from '../../../state/app-state.service';
import {
  Config,
  ChartRangesInterface,
  CoreApiNotification
} from '../../../core/index';
declare let _:any;

@Component({
  moduleId: module.id,
  selector: 'mp-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ChartComponent extends CoreApiNotification {
  stockData:any = {};
  stock:string;
  ranges:ChartRangesInterface[] = Config.chartRanges;
  rangeIndex:number;
  private range:ChartRangesInterface;
  constructor(private chartState:ChartStateService,
              private chartApiService:ChartApiService,
              private watchlistState:WatchlistStateService,
              private appState:AppStateService) {
    super(chartState, chartApiService);

    this.subscriptions.push(watchlistState.stockData$.subscribe(
      stockData => this.stockData = stockData
    ));

    this.subscriptions.push(watchlistState.stock$.subscribe(
      stock => this.updateStock(stock)
    ));

    this.subscriptions.push(chartState.range$.subscribe(
      range => this.updateRange(range)
    ));

    this.subscriptions.push(chartState.data$.subscribe(
      data => this.validateChartData(data)
    ));
  }

  tabChanged(index:number) {
    if(this.ranges[index]) {
      this.chartState.changeRange(this.ranges[index].id);
    }
  }

  private updateStock(stock:string) {
    this.stock = stock;
    if (stock) {
      this.loadChartData();
    } else {
      this.updateNotification(NotificationTypeEnum.Notification, Config.notifications.noStock);
    }
  }

  private updateRange(range:string) {
    let rangeIndex:number = _.findIndex(this.ranges, ['id', range]);
    if (rangeIndex === -1) {
      rangeIndex = 0;
    }
    this.rangeIndex = rangeIndex;
    this.range = this.ranges[rangeIndex];
    this.loadChartData();
  }

  private loadChartData() {
    if (this.stock && this.range) {
      this.chartApiService.load(this.stock, this.range.id, this.range.interval);
    }
  }

  private validateChartData(data:any[]) {
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
