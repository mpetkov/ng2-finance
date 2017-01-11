import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import {
  ConfigService,
  LoaderService
} from '../../../shared/index';

@Injectable()
export class ChartsService extends LoaderService {
  constructor(http: Http) {
    super(http);
  }

  load(stock:string) {
    this.get('./assets/json/chart.json')
      .subscribe(
        data => this.changeData(this.transform(data)) ,
        error =>  console.log(error)
      );
  }

  private transform(data:any):any {
    let chartData:any = _.get(data, 'chart.result[0]', {});
    return {
      close: _.get(chartData, 'indicators.quote[0].close', []),
      high: _.get(chartData, 'indicators.quote[0].high', []),
      low: _.get(chartData, 'indicators.quote[0].low', []),
      open: _.get(chartData, 'indicators.quote[0].open', []),
      volume: _.get(chartData, 'indicators.quote[0].volume', []),
      info: chartData.meta || {},
      dates: chartData.timestamp || []
    };
  }
}
