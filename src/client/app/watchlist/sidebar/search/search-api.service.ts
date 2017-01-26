import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import {
  Config,
  LoaderService
} from '../../../shared/index';
import { FavoritesStateService } from '../favorites/state/index';
import { SearchStateService } from './state/index';

@Injectable()
export class SearchApiService extends LoaderService {
  private favorites:string[] = [];
  constructor(public http:Http,
              private favoritesState:FavoritesStateService,
              private searchState:SearchStateService) {
    super(http);
    this.favoritesState.symbols$.subscribe(
      symbols => this.favorites = symbols
    );
  }

  load(stock:string) {
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
