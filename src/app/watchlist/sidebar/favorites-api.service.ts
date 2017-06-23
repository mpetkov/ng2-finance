import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../../../environments/environment';
import {CoreApiResponseService} from '../../shared/core/services/api-response.service';
import {FavoritesStateService} from './favorites/state/favorites-state.service';
import {get} from 'lodash';

@Injectable()
export class FavoritesApiService extends CoreApiResponseService {
  private stocks: string[] = [];

  constructor(public http: Http,
              private favoritesState: FavoritesStateService) {
    super(http, favoritesState);
  }

  load(stocks: string[]) {
    this.stocks = stocks;
    this.toggleLoader(true);
    this.get(environment.paths.stocks.replace('$stocks', encodeURIComponent('"' + stocks.join('","') + '"')))
      .subscribe(
        data => this.complete(this.transform(data)),
        () => this.failed()
      );
  }

  reload() {
    this.load(this.stocks);
  }

  private transform(data: any) {
    let stocks: any = get(data, 'query.results.quote', []);
    if (!Array.isArray(stocks)) {
      stocks = [stocks];
    }

    return stocks.map((quote: any) => {
      const change: number = Number(quote.Change) || 0.00;
      return {
        symbol: quote.symbol,
        name: quote.Name,
        price: Number(quote.LastTradePriceOnly),
        priceDisplay: Number(quote.LastTradePriceOnly).toFixed(2),
        change: this.getPlusSign(change) + change.toFixed(2),
        percentage: this.calculateChangePercent(change, quote.LastTradePriceOnly)
      };
    });
  }

  private calculateChangePercent(change: number, price: string): string {
    return this.getPlusSign(change) + (change / (Number(price) - change) * 100).toFixed(2) + '%';
  }

  private getPlusSign(change: number): string {
    return (change > 0) ? '+' : '';
  }
}
