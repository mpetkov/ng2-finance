/* tslint:disable:no-unused-variable */

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { HeaderModule } from './shared/header/header.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { AppComponent } from './app.component';
import { AppStateService } from './state/app-state.service';
import { HeaderStateService } from './shared/header/state/header-state.service';
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

export function main() {
  describe('AppComponent', () => {
    let fixture:ComponentFixture<AppComponent>;
    let component:AppComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterModule.forRoot(appRoutes, {useHash: true}),
          StoreModule.provideStore({
            app: appReducer,
            header: headerReducer,
            watchlist: watchlistReducer,
            favorites: favoritesReducer,
            sidebar: sidebarReducer,
            search: searchReducer,
            chart: chartReducer,
            news: newsReducer,
            info: infoReducer
          }),
          SharedModule,
          HeaderModule,
          WatchlistModule
        ],
        declarations: [
          AppComponent
        ],
        providers: [
          AppStateService,
          HeaderStateService
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create the app', () => {
      expect(component).toBeTruthy();
    });
  });
}
