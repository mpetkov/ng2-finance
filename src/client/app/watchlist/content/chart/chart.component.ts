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
  stock:any = {};
  ranges:ChartRangesInterface[] = Config.chartRanges;
  rangeIndex:number;
  symbol:string;
  private range:ChartRangesInterface;
  constructor(private chartState:ChartStateService,
              private chartApiService:ChartApiService,
              private watchlistState:WatchlistStateService,
              private appState:AppStateService) {
    super(chartState, chartApiService);

    watchlistState.stockSymbol$.subscribe(
      symbol => this.updateSymbol(symbol)
    );

    chartState.range$.subscribe(
      range => this.updateRange(range)
    );

    watchlistState.stock$.subscribe(
      stock => this.stock = stock
    );

    chartState.data$.subscribe(
      data => this.validateChartData(data)
    );
  }

  tabChanged(index:number) {
    if(this.ranges[index]) {
      this.chartState.changeRange(this.ranges[index].id);
    }
  }

  private updateSymbol(symbol:string) {
    this.symbol = symbol;
    if (symbol) {
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
    if (this.symbol && this.range) {
      this.chartApiService.load(this.symbol, this.range.id, this.range.interval);
    }
  }

  private validateChartData(data:any[]) {
    if (data.length === 0) {
      if (this.symbol) {
        this.updateNotification(NotificationTypeEnum.Notification, Config.notifications.noData);
      } else {
        this.updateNotification(NotificationTypeEnum.Notification, Config.notifications.noStock);
      }
    }

    this.appState.changePreloader(false);
  }
}
