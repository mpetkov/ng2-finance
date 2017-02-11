import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
  Config,
  CoreApiResponseService
} from '../../../core/index';
import { SearchStateService } from './state/index';
import { WatchlistStateService } from '../../state/watchlist-state.service';
declare let _:any;

@Injectable()
export class SearchApiService extends CoreApiResponseService {
  private favorites:string[] = [];
  private stock:string;
  constructor(public http:Http,
              private watchlistState:WatchlistStateService,
              private searchState:SearchStateService) {
    super(http, searchState);
    this.watchlistState.favorites$.subscribe(
      favorites => this.favorites = favorites
    );
  }

  load(stock:string) {
    this.stock = stock;
    this.searchState.fetchLoader(true);
    if(Config.env === 'PROD') {
      this.post(Config.paths.proxy, 'url=' + encodeURIComponent(Config.paths.search.replace('$stock', encodeURIComponent(stock))))
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    } else {
      this.get(Config.paths.search)
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
