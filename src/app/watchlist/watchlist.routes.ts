import { Route } from '@angular/router';
import { WatchlistComponent } from './index';

export const WatchlistRoutes:Route[] = [
  {
    path: 'watchlist/:id',
    component: WatchlistComponent
  },
  {
    path: 'watchlist',
    component: WatchlistComponent
  }
];
