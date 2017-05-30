import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { StoreModule, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import {
  watchlistReducer,
  chartReducer,
  newsReducer,
  infoReducer
} from './watchlist/index';


import {
  favoritesReducer,
  searchReducer,
  sidebarReducer
} from './watchlist/sidebar/index';

import { appReducer } from './state/index';
import { headerReducer } from './shared/header/index';
import { AppStateService } from './state/app-state.service';
import { HeaderStateService } from './shared/header/state/header-state.service';

import { SharedModule } from './shared/shared.module';
import { HeaderModule } from './shared/header/header.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { AppActions } from './state/app.actions';
import { HeaderActions } from './shared/header/state/header.actions';

export function rootReducer(state: any, action: any) {
  const reducer = compose(combineReducers)({
    app: appReducer,
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
    AppStateService,
    AppActions,
    HeaderStateService,
    HeaderActions
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
