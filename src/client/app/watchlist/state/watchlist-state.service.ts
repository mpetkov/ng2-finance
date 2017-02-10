import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CoreStateService } from '../../core/index';
import {
  WatchlistActions,
  WatchlistStateKeys
} from './index';
import 'rxjs/add/operator/let';

@Injectable()
export class WatchlistStateService extends CoreStateService {
  stockData$:Observable<any>;
  stock$:Observable<string>;
  favorites$:Observable<string[]>;
  highlights$:Observable<any>;

  constructor(protected store$:Store<any>) {
    super(store$);
    this.stockData$ = store$.let(this.getState('watchlist', WatchlistStateKeys.StockData));
    this.stock$ = store$.let(this.getState('watchlist', WatchlistStateKeys.Stock));
    this.favorites$ = store$.let(this.getState('watchlist', WatchlistStateKeys.Favorites));
    this.highlights$ = store$.let(this.getState('watchlist', WatchlistStateKeys.Highlights));
  }

  changeStockData(data:any) {
    this.store$.dispatch(WatchlistActions.changeStockData(data));
  }

  changeStock(stock:string) {
    this.store$.dispatch(WatchlistActions.changeStock(stock));
  }

  addFavorite(favorite:string) {
    this.store$.dispatch(WatchlistActions.addFavorite(favorite));
  }

  deleteFavorites(favorites:string[]) {
    this.store$.dispatch(WatchlistActions.deleteFavorites(favorites));
  }

  changeHighlights(highlights:any) {
    this.store$.dispatch(WatchlistActions.changeHighlights(highlights));
  }
}
