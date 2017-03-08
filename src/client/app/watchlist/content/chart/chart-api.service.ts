import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
  Config,
  ConfigInterface,
  CoreApiResponseService
} from '../../../core/index';
import {
  ChartStateService,
  ChartDataInterface
} from './state/index';

declare let _:any;

@Injectable()
export class ChartApiService extends CoreApiResponseService {
  private params:any = {};

  constructor(public http:Http,
              private chartState:ChartStateService) {
    super(http, chartState);
  }

  load(stock:string, range:string, interval:string, config:ConfigInterface = Config) {
    this.params = {stock: stock, range: range, interval: interval};
    this.toggleLoader(true);

    let url:string = config.paths.charts.replace('$stock', stock);
    url = url.replace('$range', range);
    url = url.replace('$interval', interval);

    if (config.env === 'PROD') {
      this.post(config.paths.proxy, 'url=' + encodeURIComponent(url))
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    } else {
      this.get(url)
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    }
  }

  reload() {
    this.load(this.params.stock, this.params.range, this.params.interval);
  }

  private transform(rawData:any):ChartDataInterface[] {
    let data:ChartDataInterface[] = [];

    let chartData:any = _.get(rawData, 'chart.result[0]', {});
    if (chartData) {
      let items:any = {
        close: _.get(chartData, 'indicators.quote[0].close', []),
        high: _.get(chartData, 'indicators.quote[0].high', []),
        low: _.get(chartData, 'indicators.quote[0].low', []),
        open: _.get(chartData, 'indicators.quote[0].open', []),
        volume: _.get(chartData, 'indicators.quote[0].volume', []),
        dates: chartData.timestamp || []
      };
      let close:number;
      items.dates.forEach((value:number, index:number) => {
        close = _.get(items, 'close[' + index + ']', null);
        if (close) {
          data.push({
            timestamp: value,
            date: new Date(value * 1000),
            close: close,
            high: _.get(items, 'high[' + index + ']', null),
            low: _.get(items, 'low[' + index + ']', null),
            open: _.get(items, 'open[' + index + ']', null),
            volume: _.get(items, 'volume[' + index + ']', null),
          });
        }
      });
    }

    return data;
  }
}
