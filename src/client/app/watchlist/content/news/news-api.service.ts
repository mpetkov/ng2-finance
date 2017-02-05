import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
  Config,
  LoaderService
} from '../../../core/index';
import { NewsStateService } from './state/index';
declare let moment:any;
declare let _:any;

@Injectable()
export class NewsApiService extends LoaderService {
  private stock:string;
  constructor(public http:Http,
              private newsState:NewsStateService) {
    super(http);
  }

  load(stock:string) {
    this.stock = stock;
    this.newsState.fetchLoader(true);
    if(Config.env === 'PROD') {
      this.post(Config.paths.proxy, 'url=' + encodeURIComponent(Config.paths.news.replace('$stock', encodeURIComponent(stock))))
        .subscribe(
          data => this.complete(data),
          error => this.newsState.fetchError(error)
        );
    } else {
      this.get(Config.paths.news)
        .subscribe(
          data => this.complete(data),
          error => this.newsState.fetchError(error)
        );
    }
  }
  reload() {
    this.load(this.stock);
  }

  private complete(data:any) {
    this.newsState.fetchLoader(false);
    this.newsState.fetchFulfilled(this.transform(data));
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
