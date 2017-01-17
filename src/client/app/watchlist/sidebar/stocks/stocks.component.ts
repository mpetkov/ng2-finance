import { Component } from '@angular/core';
import { StocksApiService } from './stocks-api.service';
import { StocksStateService } from './state/stocks-state.service';

@Component({
  moduleId: module.id,
  selector: 'mp-stocks',
  templateUrl: 'stocks.component.html',
  styleUrls: ['stocks.component.css'],
  providers: [StocksApiService, StocksStateService]
})

export class StocksComponent {
  stocks:any[] = [];
  pillType:string = PillEnum[PillEnum.change];
  private pillIndex:number = PillEnum.change;

  constructor(private stocksApiService:StocksApiService,
              private stocksState:StocksStateService) {
    stocksState.watchlist$.subscribe(
      value => stocksApiService.load(value)
    );
  }

  changePill() {
    this.pillIndex++;
    if (this.pillIndex > PillEnum.percentage) {
      this.pillIndex = PillEnum.change;
    }

    this.pillType = PillEnum[this.pillIndex];
  }

  changeStock(stock:any) {
    this.stocksState.changeStock(stock);
  }
}

enum PillEnum {
  change,
  percentage
}
