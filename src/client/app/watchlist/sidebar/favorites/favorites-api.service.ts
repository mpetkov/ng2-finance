import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import {
  Config,
  LoaderService
} from '../../../shared/index';
import { FavoritesStateService } from './state/index';

@Injectable()
export class FavoritesApiService extends LoaderService {
  constructor(public http:Http,
              private favoritesState:FavoritesStateService) {
    super(http);
  }

  load(stocks:string[]) {
    this.get(Config.paths.stocks.replace('$stocks', encodeURIComponent('"' + stocks.join('","') + '"')))
      .subscribe(
        data => this.complete(data),
        error =>  console.log(error)
      );
  }

  private complete(data:any) {
    this.favoritesState.fetchFulfilled(this.transform(data));
  }

  private transform(data:any) {
    let stocks:any = _.get(data, 'query.results.quote', []);
    if (!_.isArray(stocks)) {
      stocks = [stocks];
    }
    return stocks.map((quote:any) => {
      let change:number = parseFloat(quote.Change) || 0.00;
      return {
        symbol: quote.symbol,
        name: quote.Name,
        price: parseFloat(quote.LastTradePriceOnly).toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        }),
        change: this.getPlusSign(change) + change.toFixed(2),
        percentage: this.calculateChangePercent(change, quote.LastTradePriceOnly)
      };
    });
  }

  private calculateChangePercent(change:number, price:string):string {
    return this.getPlusSign(change) + (change / (parseFloat(price) - change) * 100).toFixed(2) + '%';
  }

  private getPlusSign(change:number):string {
    return (change > 0) ? '+' : '';
  }
}
