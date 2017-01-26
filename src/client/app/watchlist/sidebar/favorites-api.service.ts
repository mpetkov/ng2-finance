import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import {
  Config,
  LoaderService
} from '../../shared/index';
import { FavoritesStateService } from './favorites/state/index';

@Injectable()
export class FavoritesApiService extends LoaderService {
  private order:string[] = [];
  constructor(public http:Http,
              private favoritesState:FavoritesStateService) {
    super(http);
    favoritesState.order$.subscribe(
      order => this.order = order
    );
  }

  load(stocks:string[]) {
    this.favoritesState.fetchLoader(true);
    this.get(Config.paths.stocks.replace('$stocks', encodeURIComponent('"' + stocks.join('","') + '"')))
      .subscribe(
        data => this.complete(data),
        error =>  this.favoritesState.fetchError(error)
      );
  }

  private complete(data:any) {
    this.favoritesState.fetchFulfilled(this.transform(data));
    this.favoritesState.fetchLoader(false);
  }

  private transform(data:any) {
    let stocks:any = _.get(data, 'query.results.quote', []);
    if (!_.isArray(stocks)) {
      stocks = [stocks];
    }

    let favorites:any[] = stocks.map((quote:any) => {
      let change:number = parseFloat(quote.Change) || 0.00;
      let index:number = this.order.indexOf(quote.symbol);
      if(index < 0) {
        index = 999;
      }
      return {
        symbol: quote.symbol,
        name: quote.Name,
        order: index,
        price: parseFloat(quote.LastTradePriceOnly).toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        }),
        change: this.getPlusSign(change) + change.toFixed(2),
        percentage: this.calculateChangePercent(change, quote.LastTradePriceOnly)
      };
    });

    return _.sortBy(favorites, ['order']);
  }

  private calculateChangePercent(change:number, price:string):string {
    return this.getPlusSign(change) + (change / (parseFloat(price) - change) * 100).toFixed(2) + '%';
  }

  private getPlusSign(change:number):string {
    return (change > 0) ? '+' : '';
  }
}
