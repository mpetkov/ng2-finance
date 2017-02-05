import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import {
  stockReducer,
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
import { AppStateService } from './state/app-state.service';

import { SharedModule } from './shared/shared.module';
import { WatchlistModule } from './watchlist/watchlist.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    StoreModule.provideStore({
      app: appReducer,
      stock: stockReducer,
      favorites: favoritesReducer,
      sidebar: sidebarReducer,
      search: searchReducer,
      chart: chartReducer,
      news: newsReducer,
      info: infoReducer
    }),
    SharedModule,
    WatchlistModule
  ],
  declarations: [AppComponent],
  providers: [
    AppStateService,
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
