import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {FavoritesApiService} from './favorites-api.service';
import {WatchlistStateService} from '../state/watchlist-state.service';
import {WatchlistStateKeys} from '../state/watchlist-state';
import {HeaderStateService} from '../../shared/header/state/header-state.service';
import {CoreSubscriptions} from '../../shared/core/subscriptions';
import {localStorageAdapter} from '../../shared/core/utils';
import {SidebarStateService} from './state/sidebar-state.service';
import {SidebarTypeEnum} from './state/sidebar-state';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'mp-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SidebarComponent extends CoreSubscriptions implements OnDestroy {
  private ngOnDestroy$ = new Subject<boolean>();
  private favorites: string[] = [];
  private stock: string;

  constructor(public sidebarState: SidebarStateService,
              private route: ActivatedRoute,
              private favoritesApiService: FavoritesApiService,
              private watchlistState: WatchlistStateService,
              private headerState: HeaderStateService) {
    super();
    this.subscriptions.push(watchlistState.favorites$.subscribe(
      favorites => this.updateFavorites(favorites)
    ));

    this.subscriptions.push(watchlistState.stock$.subscribe(
      stock => this.updateStock(stock)
    ));

    this.subscriptions.push(headerState.searchActive$.subscribe(
      searchActive => searchActive ? sidebarState.changeType(SidebarTypeEnum.Add) : sidebarState.changeType(SidebarTypeEnum.List)
    ));

    route.params
      .takeUntil(this.ngOnDestroy$)
      .pluck('id')
      .distinctUntilChanged()
      .subscribe((id: string) => watchlistState.changeStock(id));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.ngOnDestroy$.next(true);
  }

  private updateFavorites(favorites: string[]) {
    localStorageAdapter.setItem(WatchlistStateKeys.Favorites, favorites);
    this.favorites = favorites.slice();
    this.loadFavoritesData();
  }

  private updateStock(stock: string) {
    this.stock = stock;
    if (this.favorites.indexOf(this.stock) === -1) {
      this.loadFavoritesData();
    }
  }

  private loadFavoritesData() {
    if (this.stock) {
      if (this.favorites.indexOf(this.stock) === -1) {
        this.favorites.push(this.stock);
      }
    }
    this.favoritesApiService.load(this.favorites);
  }
}
