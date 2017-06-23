import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../../../../environments/environment';
import {CoreApiResponseService} from '../../../shared/core/services/api-response.service';
import {NewsStateService} from './state/news-state.service';
import {NewsDataInterface} from './state/news-state';
import {get} from 'lodash';
import * as moment from 'moment';

@Injectable()
export class NewsApiService extends CoreApiResponseService {
  private stock: string;

  constructor(public http: Http,
              private newsState: NewsStateService) {
    super(http, newsState);
  }

  load(stock: string, env: any = environment) {
    this.stock = stock;
    this.toggleLoader(true);
    const url: string = env.paths.news.replace('$stock', encodeURIComponent(stock));
    if (env.production) {
      this.post(env.paths.proxy, 'url=' + encodeURIComponent(url))
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

  private transform(data: any): NewsDataInterface[] {
    const news: any[] = get(data, 'Content.result', []);
    return news.map((item: any) => {
      return {
        source: item.provider_name,
        date: this.convertDate(item.provider_publish_time),
        title: item.title,
        url: item.url,
        image: item.thumbnail
      };
    });
  }

  private convertDate(date: number): string {
    return moment(date * 1000).format('ddd, MMM Do YYYY h:mm A');
  }
}
