import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
  Config,
  LoaderService,
  numberUnitFormat
} from '../../../core/index';
import { InfoStateService } from './state/index';
declare let moment:any;
declare let _:any;

@Injectable()
export class InfoApiService extends LoaderService {
  private stock:string;
  constructor(public http:Http,
              private infoState:InfoStateService) {
    super(http);
  }

  load(stock:string) {
    this.stock = stock;
    this.infoState.fetchLoader(true);
    this.get(Config.paths.info)
      .subscribe(
        data => this.complete(data),
        error => {this.infoState.fetchError(error)}
      );
  }
  reload() {
    this.load(this.stock);
  }

  private complete(data:any) {
    this.infoState.fetchLoader(false);
    this.infoState.fetchFulfilled(this.transform(data));
  }

  private transform(data:any):any {
    let info:any = _.get(data, 'query.results.quote', {});
    info.Volume = numberUnitFormat(info.Volume, 2);
    info.AverageDailyVolume = numberUnitFormat(info.AverageDailyVolume, 2);
    return info;
  }

  private convertDate(date:number):string {
    return moment(date*1000).format('ddd, MMM Do YYYY h:mm A');
  }
}
