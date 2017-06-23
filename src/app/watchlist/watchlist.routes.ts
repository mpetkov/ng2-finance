import {Route} from '@angular/router';
import {WatchlistComponent} from './watchlist.component';

export const WatchlistRoutes: Route[] = [
  {
    path: 'watchlist/:id',
    component: WatchlistComponent
  },
  {
    path: 'watchlist',
    component: WatchlistComponent
  }
];
