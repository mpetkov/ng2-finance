import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import {
  ConfigService,
  LoaderService
} from '../../../shared/index';

@Injectable()
export class StocksService extends LoaderService {
  constructor(http: Http) {
    super(http);
  }

  load(stocks:string[]) {
    this.get(ConfigService.queries().quotes.replace('$stocks', encodeURIComponent('"' + stocks.join('","') + '"')))
      .subscribe(
        data => this.changeData(this.transform(data)) ,
        error =>  console.log(error)
      );
  }

  private transform(data:any) {
    let quotes:any = _.get(data, 'query.results.quote', []);
    if(!_.isArray(quotes)) {
      quotes = [quotes];
    }
    return quotes.map((quote:any) => {
      let change:string = quote.Change || '0.00';
      return {
        symbol: quote.symbol,
        name: quote.Name,
        price: quote.LastTradePriceOnly,
        change: change,
        percentage: this.calculateChangePercent(change, quote.LastTradePriceOnly)
      }
    });
  }

  private calculateChangePercent(change:string, price:string):string {
    let changeNumber:number = parseFloat(change);
    let plusSign:string = (changeNumber > 0) ? '+' : '';
    return plusSign + (changeNumber/(parseFloat(price) - changeNumber)*100).toFixed(2) + '%';
  }
}
