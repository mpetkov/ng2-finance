import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {combineReducers, StoreModule} from '@ngrx/store';
import {compose} from '@ngrx/core';

import {SharedModule} from './shared/shared.module';

import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';

import {HeaderModule} from './shared/header/header.module';
import {HeaderStateService} from './shared/header/state/header-state.service';
import {headerReducer} from './shared/header/state/header-reducer';
import {HeaderActions} from './shared/header/state/header-actions';

import {WatchlistModule} from './watchlist/watchlist.module';
import {watchlistReducer} from './watchlist/state/watchlist-reducer';

import {favoritesReducer} from './watchlist/sidebar/favorites/state/favorites-reducer';
import {sidebarReducer} from './watchlist/sidebar/state/sidebar-reducer';
import {searchReducer} from './watchlist/sidebar/search/state/search-reducer';
import {chartReducer} from './watchlist/content/chart/state/chart-reducer';
import {newsReducer} from './watchlist/content/news/state/news-reducer';
import {infoReducer} from './watchlist/content/info/state/info-reducer';

export function rootReducer(state: any, action: any) {
  const reducer = compose(combineReducers)({
    header: headerReducer,
    watchlist: watchlistReducer,
    favorites: favoritesReducer,
    sidebar: sidebarReducer,
    search: searchReducer,
    chart: chartReducer,
    news: newsReducer,
    info: infoReducer
  });

  return reducer(state, action);
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    StoreModule.provideStore(rootReducer),
    SharedModule,
    HeaderModule,
    WatchlistModule
  ],
  declarations: [AppComponent],
  providers: [
    HeaderStateService,
    HeaderActions
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
