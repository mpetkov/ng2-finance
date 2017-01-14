import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import {
  ConfigService,
  LoaderService
} from '../../../shared/index';

@Injectable()
export class ChartService extends LoaderService {
  constructor(http:Http) {
    super(http);
  }

  load(stock:string) {
    this.get('./assets/json/chart.json')
      .subscribe(
        data => this.changeData(this.transform(data)),
        error =>  console.log(error)
      );
  }

  private transform(rawData:any):any {
    let data:any = {
      info: {},
      rows: []
    };
    let chartData:any = _.get(rawData, 'chart.result[0]', {});
    if (chartData) {
      data.info = chartData.meta || {};
      let items:any = {
        close: _.get(chartData, 'indicators.quote[0].close', []),
        high: _.get(chartData, 'indicators.quote[0].high', []),
        low: _.get(chartData, 'indicators.quote[0].low', []),
        open: _.get(chartData, 'indicators.quote[0].open', []),
        volume: _.get(chartData, 'indicators.quote[0].volume', []),
        dates: chartData.timestamp || []
      };

      items.dates.forEach((value:number, index:number) => {
        data.rows.push({
          timestamp: value,
          date: new Date(value * 1000),
          close: _.get(items, 'close[' + index + ']', null),
          high: _.get(items, 'high[' + index + ']', null),
          low: _.get(items, 'low[' + index + ']', null),
          open: _.get(items, 'open[' + index + ']', null),
          volume: _.get(items, 'volume[' + index + ']', null),
        });
      });
    }
    return data;
  }
}
