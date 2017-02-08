import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
  Config,
  CoreApiResponseService,
  numberUnitFormat
} from '../../../core/index';
import { InfoStateService } from './state/index';
declare let moment:any;
declare let _:any;

@Injectable()
export class InfoApiService extends CoreApiResponseService {
  private stock:string;
  constructor(public http:Http,
              private infoState:InfoStateService) {
    super(http, infoState);
  }

  load(stock:string) {
    this.stock = stock;
    this.infoState.fetchLoader(true);
    this.get(Config.paths.info.replace('$stock', encodeURIComponent(stock)))
      .subscribe(
        data => this.complete(this.transform(data)),
        () => this.failed()
      );
  }
  reload() {
    this.load(this.stock);
  }

  private transform(rawData:any):any {
    let data:any[] = [];
    let info:any = _.get(rawData, 'query.results.quote');
    if (info) {
      info.Volume = numberUnitFormat(info.Volume, 2);
      info.AverageDailyVolume = numberUnitFormat(info.AverageDailyVolume, 2);
      data.push(info);
    }

    return data;
  }

  private convertDate(date:number):string {
    return moment(date*1000).format('ddd, MMM Do YYYY h:mm A');
  }
}
