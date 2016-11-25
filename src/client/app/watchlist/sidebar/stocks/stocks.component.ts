import { Component } from '@angular/core';
import { StocksService } from './stocks.service';

@Component({
  moduleId: module.id,
  selector: 'mp-stocks',
  templateUrl: 'stocks.component.html',
  styleUrls: ['stocks.component.css'],
  providers: [StocksService]
})

export class StocksComponent {
  stocks:any[] = [];
  pillType:string = PillEnum[PillEnum.change];
  private pillIndex:number = PillEnum.change;

  constructor(private stocksService: StocksService) {
    stocksService.data$.subscribe(
      data => this.stocks = data
    );

    stocksService.load(['YHOO', 'AAPL', 'GOOG', 'ADS']);
  }

  changePill() {
    this.pillIndex++;
    if(this.pillIndex > PillEnum.percentage) {
      this.pillIndex = PillEnum.change;
    }

    this.pillType = PillEnum[this.pillIndex];
  }
}

enum PillEnum {
  change,
  percentage
}
