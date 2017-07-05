import {Component, ElementRef, OnDestroy, Renderer, ViewChild, ViewEncapsulation} from '@angular/core';
import {DragulaService} from 'ng2-dragula';
import {environment} from '../../../../environments/environment';
import {HeaderStateService} from '../../../shared/header/state/header-state.service';
import {WatchlistStateService} from '../../state/watchlist-state.service';
import {StockDataInterface} from '../../state/watchlist-state';
import {EditService} from './edit.service';
import {CoreSubscriptions} from '../../../shared/core/subscriptions';
import {FavoritesStateService} from '../favorites/state/favorites-state.service';
import {SidebarStateService} from '../state/sidebar-state.service';
import {SidebarTypeEnum} from '../state/sidebar-state';

@Component({
  selector: 'mp-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class EditComponent extends CoreSubscriptions implements OnDestroy {
  @ViewChild('list') list: ElementRef;
  favoritesData: StockDataInterface[] = [];
  favorites: string[] = [];
  notification: string;
  selected: string;
  deleted: string[] = [];
  dragName = 'editDrag';
  private windowClickListener: Function;

  constructor(private favoritesState: FavoritesStateService,
              private sidebarState: SidebarStateService,
              private headerState: HeaderStateService,
              private watchlistState: WatchlistStateService,
              private editService: EditService,
              private renderer: Renderer,
              private dragulaService: DragulaService) {
    super();
    this.subscriptions.push(watchlistState.favorites$.subscribe(
      favorites => this.favorites = favorites
    ));

    this.subscriptions.push(favoritesState.data$.subscribe(
      data => this.favoritesData = data.filter((item: StockDataInterface) => {
        return this.favorites.indexOf(item.symbol) !== -1;
      })
    ));

    dragulaService.setOptions(this.dragName, editService.getDragOptions());
  }

  showDelete(symbol: string, event: Event) {
    event.stopPropagation();
    this.selected = symbol;
    this.windowClickListener = this.renderer.listenGlobal('window', 'click',
      () => {
        this.selected = null;
        this.destroyListener();
      });
  }

  close() {
    this.closeScreen(SidebarTypeEnum.List);
  }

  add() {
    this.closeScreen(SidebarTypeEnum.Add);
  }

  delete(symbol: string, event: Event) {
    event.stopPropagation();
    this.deleted.push(symbol);
    if (this.deleted.length === this.favoritesData.length) {
      this.notification = environment.notifications.noFavorites;
    }
    this.destroyListener();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.destroyListener();
    this.dragulaService.destroy(this.dragName);
  }

  private destroyListener() {
    if (this.windowClickListener) {
      this.windowClickListener();
      this.windowClickListener = null;
    }
  }

  private closeScreen(type: SidebarTypeEnum) {
    this.favoritesState.changeOrder(this.editService.getOrder(this.list, this.deleted));

    if (this.deleted.length > 0) {
      this.watchlistState.deleteFavorites(this.deleted);
    }

    if (type === SidebarTypeEnum.Add) {
      this.headerState.changeSearchActive(true);
    } else {
      this.sidebarState.changeType(type);
    }
  }
}
