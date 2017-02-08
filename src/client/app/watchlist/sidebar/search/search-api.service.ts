import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
  Config,
  CoreApiResponseService
} from '../../../core/index';
import { FavoritesStateService } from '../favorites/state/index';
import { SearchStateService } from './state/index';
declare let _:any;

@Injectable()
export class SearchApiService extends CoreApiResponseService {
  private favorites:string[] = [];
  private stock:string;
  constructor(public http:Http,
              private favoritesState:FavoritesStateService,
              private searchState:SearchStateService) {
    super(http, searchState);
    this.favoritesState.symbols$.subscribe(
      symbols => this.favorites = symbols
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
    return _.get(data, 'data.items', []).filter((item:any) => {
      return this.favorites.indexOf(item.symbol) === -1;
    });
  }
}
