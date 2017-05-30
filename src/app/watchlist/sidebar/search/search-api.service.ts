import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {CoreApiResponseService} from '../../../core/index';
import {environment} from '../../../../environments/environment';
import { SearchStateService } from './state/index';
import {get} from 'lodash';

@Injectable()
export class SearchApiService extends CoreApiResponseService {
  private stock:string;

  constructor(public http:Http,
              private searchState:SearchStateService) {
    super(http, searchState);
  }

  load(stock:string, config:any = environment) {
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
    return get(data, 'data.items', []);
  }
}
