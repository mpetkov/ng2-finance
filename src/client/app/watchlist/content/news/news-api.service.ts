import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
  Config,
  ConfigInterface,
  CoreApiResponseService
} from '../../../core/index';
import {
  NewsStateService,
  NewsDataInterface
} from './state/index';
declare let moment:any;
declare let _:any;

@Injectable()
export class NewsApiService extends CoreApiResponseService {
  private stock:string;

  constructor(public http:Http,
              private newsState:NewsStateService) {
    super(http, newsState);
  }

  load(stock:string, config:ConfigInterface = Config) {
    this.stock = stock;
    this.toggleLoader(true);
    let url:string = config.paths.news.replace('$stock', encodeURIComponent(stock));
    if (config.env === 'PROD') {
      this.post(config.paths.proxy, 'url=' + encodeURIComponent(url))
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    } else {
      this.get(url)
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    }
  }

  reload() {
    this.load(this.stock);
  }

  private transform(data:any):NewsDataInterface[] {
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
    return moment(date * 1000).format('ddd, MMM Do YYYY h:mm A');
  }
}
