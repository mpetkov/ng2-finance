import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
  CoreApiResponseService,
  numberUnitFormat
} from '../../../core/index';
import {environment} from '../../../../environments/environment';
import {
  InfoStateService,
  InfoDataInterface
} from './state/index';
import {get} from 'lodash';

@Injectable()
export class InfoApiService extends CoreApiResponseService {
  private stock:string;

  constructor(public http:Http,
              private infoState:InfoStateService) {
    super(http, infoState);
  }

  load(stock:string) {
    this.stock = stock;
    this.toggleLoader(true);
    this.get(environment.paths.info.replace('$stock', encodeURIComponent(stock)))
      .subscribe(
        data => this.complete(this.transform(data)),
        () => this.failed()
      );
  }

  reload() {
    this.load(this.stock);
  }

  private transform(rawData:any):InfoDataInterface[] {
    let data:InfoDataInterface[] = [];
    let info:any = get(rawData, 'query.results.quote');
    if (info) {
      info.Volume = numberUnitFormat(info.Volume, 2);
      info.AverageDailyVolume = numberUnitFormat(info.AverageDailyVolume, 2);
      data.push(info);
    }

    return data;
  }
}
