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
    this.get(Config.paths.news)
      .subscribe(
        data => this.newsState.fetchNewsFulfilled(this.transform(data)),
        error =>  console.log(error)
      );
  }

  private transform(data:any):any[] {
    let news:any[] = _.get(data, 'query.results.item', []);
    return news.map((item:any) => {
      item.pubDate = this.convertDate(item.pubDate);
      item.title = this.convertLinks(item.title);

      return item;
    });
  }

  private convertDate(date:string):string {
    return moment(new Date(date)).format('ddd, MMM Do YYYY h:mm A');
  }

  private convertLinks(text:string):string {
    text = text.replace('href=', 'target="_blank" href=');
    text = text.replace('href="/', 'href="https://finance.yahoo.com/');
    return text;
  }
}
