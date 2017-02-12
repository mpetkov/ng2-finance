import {
  Component,
  OnDestroy
} from '@angular/core';
import {
  InfoApiService,
  InfoDataInterface
} from './info-api.service';
import { InfoStateService } from './state/index';
import { RangeOptionsInterface } from './index';
import { WatchlistStateService } from '../../state/watchlist-state.service';
import { StockDataInterface } from '../../state/watchlist.state';
import { NotificationTypeEnum } from '../../../shared/index';
import {
  CoreApiNotification,
  Config
} from '../../../core/index';

@Component({
  moduleId: module.id,
  selector: 'mp-info',
  templateUrl: 'info.component.html',
  styleUrls: ['info.component.css']
})

export class InfoComponent extends CoreApiNotification {
  data:InfoDataInterface = {};
  leftColumn:InfoListInterface[] = [];
  rightColumn:InfoListInterface[] = [];
  dayOptions:RangeOptionsInterface = {};
  yearOptions:RangeOptionsInterface = {};
  private stock:string;
  private loadedInfo:boolean;
  private price:number;

  constructor(private infoState:InfoStateService,
              private watchlistState:WatchlistStateService,
              private infoApiService:InfoApiService) {
    super(infoState, infoApiService);
    this.subscriptions.push(watchlistState.stock$.subscribe(
      stock => this.updateStock(stock)
    ));

    this.subscriptions.push(watchlistState.stockData$.subscribe(
      stockData => this.updateStockData(stockData)
    ));

    this.subscriptions.push(infoState.data$.subscribe(
      info => this.updateInfo(info[0])
    ));

    this.leftColumn = [
      {text: 'Prev Close', id: 'PreviousClose'},
      {text: 'Low', id: 'DaysLow'},
      {text: '52wk Low', id: 'YearLow'},
      {text: 'Mkt Cap', id: 'MarketCapitalization'},
      {text: '1Y Target', id: 'OneyrTargetPrice'},
      {text: 'EPS', id: 'EarningsShare'}
    ];

    this.rightColumn = [
      {text: 'Open', id: 'Open'},
      {text: 'High', id: 'DaysHigh'},
      {text: '52wk High', id: 'YearHigh'},
      {text: 'Volume', id: 'Volume'},
      {text: 'Avg Vol (3m)', id: 'AverageDailyVolume'},
      {text: 'Dividend', id: 'DividendShare'}
    ];
    this.updateInfo();
  }

  reload() {
    this.infoApiService.reload();
  }

  private updateStock(stock:string) {
    this.stock = stock;
    if (stock) {
      this.loadedInfo = false;
      this.infoApiService.load(stock);
    }
  }

  private updateStockData(stockData:StockDataInterface) {
    this.price = stockData.price;
    if (this.loadedInfo) {
      this.updateData();
    }
  }

  private updateInfo(data:InfoDataInterface = null) {
    if (!data) {
      if (this.stock) {
        this.updateNotification(NotificationTypeEnum.Notification, Config.notifications.noData);
      } else {
        this.updateNotification(NotificationTypeEnum.Notification, Config.notifications.noStock);
      }
    } else {
      this.data = data;
      this.updateData();
      this.loadedInfo = true;
    }
  }

  private updateData() {
    if (this.price === null || this.price === undefined) {
      this.price = this.data.LastTradePriceOnly;
    }

    let activeStart:number = Math.min(this.data.Open, this.price);
    let activeEnd:number = Math.max(this.data.Open, this.price);

    this.data.DaysLow = Math.min(this.data.DaysLow, this.price);
    this.data.DaysHigh = Math.max(this.data.DaysHigh, this.price);
    this.data.YearLow = Math.min(this.data.YearLow, this.price);
    this.data.YearHigh = Math.max(this.data.YearHigh, this.price);

    this.dayOptions = {
      text: 'Day\'s Range',
      start: this.data.DaysLow,
      end: this.data.DaysHigh,
      activeStart: activeStart,
      activeEnd: activeEnd,
      active: this.price
    };

    this.yearOptions = {
      text: '52 Week Range',
      start: this.data.YearLow,
      end: this.data.YearHigh,
      activeStart: activeStart,
      activeEnd: activeEnd,
      active: this.price
    };
  }
}


export interface InfoListInterface {
  id?:string;
  text?:string;
}
