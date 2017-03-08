import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
  Config,
  ConfigInterface,
  CoreApiResponseService
} from '../../../core/index';
import { SearchStateService } from './state/index';
declare let _:any;

@Injectable()
export class SearchApiService extends CoreApiResponseService {
  private stock:string;

  constructor(public http:Http,
              private searchState:SearchStateService) {
    super(http, searchState);
  }

  load(stock:string, config:ConfigInterface = Config) {
    this.stock = stock;
    this.toggleLoader(true);
    if (config.env === 'PROD') {
      this.post(config.paths.proxy, 'url=' + encodeURIComponent(config.paths.search.replace('$stock', encodeURIComponent(stock))))
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    } else {
      this.get(config.paths.search)
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    }
  }

  reload() {
    this.load(this.stock);
  }

  private transform(data:any):any[] {
    return _.get(data, 'data.items', []);
  }
}
