import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import {
  Config,
  LoaderService
} from '../../../shared/index';
import { NewsStateService } from './state/index';
declare let moment:any;

@Injectable()
export class NewsApiService extends LoaderService {
  constructor(public http:Http,
              private newsState:NewsStateService) {
    super(http);
  }

  load(stock:string) {
    this.get(Config.paths.news.replace('$stock', encodeURIComponent(stock)))
      .subscribe(
        data => this.newsState.fetchNewsFulfilled(this.transform(data)),
        error =>  console.log(error)
      );
  }

  private transform(data:any):any[] {
    let news:any[] = _.get(data, 'Content.result', []);
    return news.map((item:any) => {
      return {
        source: item.provider_name,
        date: this.convertDate(item.provider_publish_time),
        title: item.title,
        url: item.url,
        image: item.thumbnail
      };
    });
  }

  private convertDate(date:number):string {
    return moment(date*1000).format('ddd, MMM Do YYYY h:mm A');
  }
}
