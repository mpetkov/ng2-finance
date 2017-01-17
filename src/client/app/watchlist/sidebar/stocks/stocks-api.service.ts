import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import {
  ConfigService,
  LoaderService
} from '../../../shared/index';
import { WatchlistActions } from './index';

@Injectable()
export class StocksApiService extends LoaderService {
  constructor(private http:Http,
              private store$:Store<any>) {
    super(http);
  }

  load(stocks:string[]) {
    this.get(ConfigService.queries().quotes.replace('$stocks', encodeURIComponent('"' + stocks.join('","') + '"')))
      .subscribe(
        data => this.store$.dispatch(WatchlistActions.fetchStocksFulfilled(this.transform(data))),
        error =>  console.log(error)
      );
  }

  private transform(data:any) {
    let quotes:any = _.get(data, 'query.results.quote', []);
    if (!_.isArray(quotes)) {
      quotes = [quotes];
    }
    return quotes.map((quote:any) => {
      let change:number = parseFloat(quote.Change) || 0.00;
      return {
        symbol: quote.symbol,
        name: quote.Name,
        price: parseFloat(quote.LastTradePriceOnly).toLocaleString(undefined, {maximumFractionDigits: 2}),
        change: this.getPlusSign(change) + change.toFixed(2),
        percentage: this.calculateChangePercent(change, quote.LastTradePriceOnly)
      };
    });
  }

  private calculateChangePercent(change:Number, price:string):string {
    return this.getPlusSign(change) + (change / (parseFloat(price) - change) * 100).toFixed(2) + '%';
  }

  private getPlusSign(change:Number):string {
    return (change > 0) ? '+' : '';
  }
}
