import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import {
  Config,
  LoaderService
} from '../../../shared/index';
import { SidebarStateService } from '../state/index';

@Injectable()
export class SearchApiService extends LoaderService {
  private watchlist:string[] = [];
  constructor(public http:Http,
              private sidebarState:SidebarStateService) {
    super(http);
    this.sidebarState.watchlist$.subscribe(
      data => this.watchlist = data
    );
  }

  load(stock:string) {
    if(Config.env === 'PROD') {
      this.post(Config.paths.proxy, 'url=' + encodeURIComponent(Config.paths.search.replace('$stock', encodeURIComponent(stock))))
        .subscribe(
          data => this.sidebarState.fetchStocksSearchFulfilled(this.transform(data)),
          error =>  console.log(error)
        );
    } else {
      this.get(Config.paths.search)
        .subscribe(
          data => this.sidebarState.fetchStocksSearchFulfilled(this.transform(data)),
          error =>  console.log(error)
        );
    }
  }

  private transform(data:any):any[] {
    return _.get(data, 'data.items', []).filter((item:any) => {
      return this.watchlist.indexOf(item.symbol) === -1;
    });
  }
}
