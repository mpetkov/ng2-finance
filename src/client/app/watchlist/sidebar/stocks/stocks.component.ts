import { Component } from '@angular/core';
import { StocksApiService } from './stocks-api.service';
import { SidebarStateService } from '../state/index';

@Component({
  moduleId: module.id,
  selector: 'mp-stocks',
  templateUrl: 'stocks.component.html',
  styleUrls: ['stocks.component.css'],
  providers: [StocksApiService]
})

export class StocksComponent {
  stocks:any[] = [];
  pillType:string = PillEnum[PillEnum.change];
  private pillIndex:number = PillEnum.change;

  constructor(public sidebarState:SidebarStateService,
              private stocksApiService:StocksApiService) {
    sidebarState.watchlist$.subscribe(
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
    this.sidebarState.changeStock(stock);
  }
}

enum PillEnum {
  change,
  percentage
}
