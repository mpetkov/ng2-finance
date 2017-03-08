import {
  Component,
  OnDestroy
} from '@angular/core';
import { InfoApiService } from './info-api.service';
import {
  InfoStateService,
  InfoDataInterface
} from './state/index';
import { InfoService } from './info.service';
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
  leftColumn:InfoListInterface[] = [
    {text: 'Prev Close', id: 'PreviousClose'},
    {text: 'Low', id: 'DaysLow'},
    {text: '52wk Low', id: 'YearLow'},
    {text: 'Mkt Cap', id: 'MarketCapitalization'},
    {text: '1Y Target', id: 'OneyrTargetPrice'},
    {text: 'EPS', id: 'EarningsShare'}
  ];
  rightColumn:InfoListInterface[] = [
    {text: 'Open', id: 'Open'},
    {text: 'High', id: 'DaysHigh'},
    {text: '52wk High', id: 'YearHigh'},
    {text: 'Volume', id: 'Volume'},
    {text: 'Avg Vol (3m)', id: 'AverageDailyVolume'},
    {text: 'Dividend', id: 'DividendShare'}
  ];
  dayOptions:RangeOptionsInterface = {};
  yearOptions:RangeOptionsInterface = {};
  private stock:string;
  private loadedInfo:boolean;
  private price:number;

  constructor(private infoState:InfoStateService,
              private watchlistState:WatchlistStateService,
              private infoApiService:InfoApiService,
              private infoService:InfoService) {
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

    this.data = this.infoService.getDataWithUpdatedPrice(this.data, this.price);
    this.dayOptions = this.infoService.getDayOptions(this.data, this.price);
    this.yearOptions = this.infoService.getDayOptions(this.data, this.price);
    this.yearOptions = this.infoService.getYearOptions(this.data, this.price);
  }
}


export interface InfoListInterface {
  id?:string;
  text?:string;
}
