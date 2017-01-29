import { Component } from '@angular/core';
import { ChartApiService } from './chart-api.service';
import { ChartStateService } from './state/index';
import { WatchlistStateService } from '../../state/watchlist-state.service';

@Component({
  moduleId: module.id,
  selector: 'mp-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css']
})

export class ChartComponent {
  stock:any = {};
  constructor(private chartApiService:ChartApiService,
              private watchlistState:WatchlistStateService) {
    watchlistState.stockSymbol$.subscribe(
      symbol => chartApiService.load(symbol)
    );

    watchlistState.stock$.subscribe(
      stock => this.stock = stock
    );
  }
}
