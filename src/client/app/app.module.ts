import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import {
  sidebarReducer,
  stockReducer,
  watchlistReducer,
  chartReducer
} from './watchlist/index';

import { SharedModule } from './shared/shared.module';
import { WatchlistModule } from './watchlist/watchlist.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    StoreModule.provideStore({
      sidebar: sidebarReducer,
      stock: stockReducer,
      watchlist: watchlistReducer,
      chart: chartReducer
    }),
    SharedModule,
    WatchlistModule
  ],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})

export class AppModule {
}
