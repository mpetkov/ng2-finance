import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
  Config,
  CoreApiResponseService,
  LoaderDataTypeEnum,
  ChartRangesIntervalInterface
} from '../../../core/index';
import { ChartStateService } from './state/index';
declare let _:any;
declare let moment:any;

@Injectable()
export class ChartApiService extends CoreApiResponseService {
  private params:any = {};
  constructor(public http:Http,
              private chartState:ChartStateService) {
    super(http, chartState);
  }

  load(stock:string, range:string, interval:string) {
    this.params = {stock:stock, range:range, interval:interval};
    this.chartState.fetchLoader(true);

    let url:string = Config.paths.charts.replace('$stock', stock);
    url = url.replace('$range', this.getDateRange(interval));
    if(Config.env === 'PROD') {
      this.post(Config.paths.proxy, 'url=' + encodeURIComponent(url), LoaderDataTypeEnum.CSV)
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    } else {
      this.get(url, LoaderDataTypeEnum.CSV)
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    }
  }

  reload() {
    this.load(this.params.stock, this.params.range, this.params.interval);
  }

  private transform(rawData:any):any[] {
    let data:any[] = [];
    if (rawData) {
      let timestamp:number;
      rawData.forEach((row:string[]) => {
        timestamp = moment(row[0], 'YYYY-MM-DD').unix();
        data.push({
          timestamp: timestamp,
          date: new Date(timestamp * 1000),
          close: Number(row[4]),
          high: Number(row[2]),
          low: Number(row[3]),
          open: Number(row[1]),
          volume: Number(row[5])
        });
      });
    }
    return data;
  }

  private getDateRange(interval:ChartRangesIntervalInterface):string {
    let previousDate:any = moment().subtract(interval.value, interval.type);
    return 'a=' + previousDate.month() + '&b=' + previousDate.format('DD') + '&c=' + previousDate.format('YYYY');
  }
}
