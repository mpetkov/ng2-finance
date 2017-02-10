import {
  Component,
  OnDestroy
} from '@angular/core';
import { InfoApiService } from './info-api.service';
import { InfoStateService } from './state/index';
import { RangeOptionsInterface } from './index';
import { WatchlistStateService } from '../../state/watchlist-state.service';
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
  data:any = {};
  leftColumn:any[] = [];
  rightColumn:any[] = [];
  dayOptions:RangeOptionsInterface = {};
  yearOptions:RangeOptionsInterface = {};
  private stock:string;
  constructor(private infoState:InfoStateService,
              private watchlistState:WatchlistStateService,
              private infoApiService:InfoApiService) {
    super(infoState, infoApiService);
    this.subscriptions.push(watchlistState.stock$.subscribe(
      stock => this.updateStock(stock)
    ));

    this.subscriptions.push(infoState.data$.subscribe(
      info => this.updateInfo(info[0])
    ));

    this.leftColumn = [
      { text: 'Prev Close', id: 'PreviousClose' },
      { text: 'Low', id: 'DaysLow' },
      { text: '52wk Low', id: 'YearLow' },
      { text: 'Mkt Cap', id: 'MarketCapitalization' },
      { text: '1Y Target', id: 'OneyrTargetPrice' },
      { text: 'EPS', id: 'EarningsShare' }
    ];

    this.rightColumn = [
      { text: 'Open', id: 'Open' },
      { text: 'High', id: 'DaysHigh' },
      { text: '52wk High', id: 'YearHigh' },
      { text: 'Volume', id: 'Volume' },
      { text: 'Avg Vol (3m)', id: 'AverageDailyVolume' },
      { text: 'Dividend', id: 'DividendShare' }
    ];
    this.updateInfo();
  }

  private updateStock(stock:string) {
    this.stock = stock;
    if(stock) {
      this.infoApiService.load(stock);
    }
  }

  private updateInfo(data:any = null) {
    if (!data) {
      if (this.stock) {
        this.updateNotification(NotificationTypeEnum.Notification, Config.notifications.noData);
      } else {
        this.updateNotification(NotificationTypeEnum.Notification, Config.notifications.noStock);
      }
    } else {
      let activeStart:number = Math.min(data.Open, data.LastTradePriceOnly);
      let activeEnd:number = Math.max(data.Open, data.LastTradePriceOnly);

      this.dayOptions = {
        text: 'Day\'s Range',
        start: data.DaysLow,
        end: data.DaysHigh,
        activeStart: activeStart,
        activeEnd: activeEnd,
        active: data.LastTradePriceOnly
      };

      this.yearOptions = {
        text: '52 Week Range',
        start: data.YearLow,
        end: data.YearHigh,
        activeStart: activeStart,
        activeEnd: activeEnd,
        active: data.LastTradePriceOnly
      };
    }

    this.data = data;
  }
}
