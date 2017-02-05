import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
  Config,
  LoaderService
} from '../../../core/index';
import { FavoritesStateService } from '../favorites/state/index';
import { SearchStateService } from './state/index';
declare let _:any;

@Injectable()
export class SearchApiService extends LoaderService {
  private favorites:string[] = [];
  private stock:string;
  constructor(public http:Http,
              private favoritesState:FavoritesStateService,
              private searchState:SearchStateService) {
    super(http);
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
          data => this.complete(data),
          error => this.searchState.fetchError(error)
        );
    } else {
      this.get(Config.paths.search)
        .subscribe(
          data => this.complete(data),
          error => this.searchState.fetchError(error)
        );
    }
  }

  reload() {
    this.load(this.stock);
  }

  private complete(data:any) {
    this.searchState.fetchLoader(false);
    this.searchState.fetchFulfilled(this.transform(data));
  }

  private transform(data:any):any[] {
    return _.get(data, 'data.items', []).filter((item:any) => {
      return this.favorites.indexOf(item.symbol) === -1;
    });
  }
}
