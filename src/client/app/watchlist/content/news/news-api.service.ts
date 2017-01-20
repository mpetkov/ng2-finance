import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import {
  ConfigService,
  LoaderService
} from '../../../shared/index';
import { NewsStateService } from './state/index';


@Injectable()
export class NewsApiService extends LoaderService {
  constructor(public http:Http,
              private newsState:NewsStateService) {
    super(http);
  }

  load(stock:string) {
    this.get('/assets/json/news.json')
      .subscribe(
        data => this.newsState.fetchNewsFulfilled(this.transform(data)),
        error =>  console.log(error)
      );
  }

  private transform(rawData:any):any[] {
    return _.get(rawData, 'query.results.item', []);
  }
}
