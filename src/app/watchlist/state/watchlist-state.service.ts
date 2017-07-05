import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {CoreStateService} from '../../shared/core/state/state.service';
import {StockDataInterface, WatchlistStateKeys} from './watchlist-state';
import {WatchlistActions} from './watchlist-actions';
import 'rxjs/add/operator/let';

@Injectable()
export class WatchlistStateService extends CoreStateService {
  stockData$: Observable<StockDataInterface>;
  stock$: Observable<string>;
  favorites$: Observable<string[]>;
  highlights$: Observable<any>;

  constructor(protected store$: Store<any>,
              private actions: WatchlistActions) {
    super();
    this.stateName = WatchlistStateKeys.StateName;
    this.stockData$ = store$.let(this.getState(WatchlistStateKeys.StockData));
    this.stock$ = store$.let(this.getState(WatchlistStateKeys.Stock));
    this.favorites$ = store$.let(this.getState(WatchlistStateKeys.Favorites));
    this.highlights$ = store$.let(this.getState(WatchlistStateKeys.Highlights));
  }

  changeStockData(data: StockDataInterface) {
    this.store$.dispatch(this.actions.changeStockData(data));
  }

  changeStock(stock: string) {
    this.store$.dispatch(this.actions.changeStock(stock));
  }

  addFavorite(favorite: string) {
    this.store$.dispatch(this.actions.addFavorite(favorite));
  }

  deleteFavorites(favorites: string[]) {
    this.store$.dispatch(this.actions.deleteFavorites(favorites));
  }

  changeHighlights(highlights: any) {
    this.store$.dispatch(this.actions.changeHighlights(highlights));
  }
}
