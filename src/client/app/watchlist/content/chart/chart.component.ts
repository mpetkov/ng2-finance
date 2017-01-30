import { Component, ViewEncapsulation } from '@angular/core';
import { ChartApiService } from './chart-api.service';
import { ChartStateService } from './state/index';
import { WatchlistStateService } from '../../state/watchlist-state.service';
import { NotificationTypeEnum } from '../../../shared/index';
import { Config, ChartRangesInterface } from '../../../shared/index';

@Component({
  moduleId: module.id,
  selector: 'mp-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ChartComponent {
  stock:any = {};
  chartRanges:ChartRangesInterface[] = Config.chartRanges;
  notification:string;
  notificationType:NotificationTypeEnum;
  private symbol:string;
  constructor(private chartState:ChartStateService,
              private chartApiService:ChartApiService,
              private watchlistState:WatchlistStateService) {
    watchlistState.stockSymbol$.subscribe(
      symbol => this.updateSymbol(symbol)
    );

    watchlistState.stock$.subscribe(
      stock => this.stock = stock
    );

    chartState.data$.subscribe(
      data => this.validateChartData(data)
    );

    chartState.loader$.subscribe(
      loader => this.updateNotification(loader ? NotificationTypeEnum.Loader : NotificationTypeEnum.None)
    );

    chartState.error$.subscribe(
      error => this.updateNotification(error ? NotificationTypeEnum.Error : NotificationTypeEnum.None, error)
    );
  }

  tabChanged(index:number) {
    console.log(range);
  }

  private updateSymbol(symbol:string) {
    this.symbol = symbol;
    this.chartApiService.load(symbol);
  }

  private validateChartData(data:any[]) {
    if (data.length === 0) {
      if (this.symbol) {
        this.updateNotification(NotificationTypeEnum.Notification, 'No results found');
      } else {
        this.updateNotification(NotificationTypeEnum.Notification, 'Please select a stock symbol');
      }
    }
  }

  private updateNotification(type:NotificationTypeEnum, value:string = null) {
    this.notificationType = type;
    this.notification = value;
  }
}
