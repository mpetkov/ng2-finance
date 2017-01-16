import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SidebarStateInterface } from "../../../shared/index";
import { StocksService } from './stocks.service';
import { StocksActions } from "./state/index";

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
  stocksStore: Observable<SidebarStateInterface>;
  private pillIndex:number = PillEnum.change;

  constructor(private store: Store,
              private stocksService: StocksService) {
    stocksService.data$.subscribe(
      data => this.stocks = data
    );

    this.stocksStore = store.select(store => store.stocks);
    stocksService.load(['YHOO', 'AAPL', 'GOOG', 'ADS']);
  }

  changePill() {
    this.pillIndex++;
    if(this.pillIndex > PillEnum.percentage) {
      this.pillIndex = PillEnum.change;
    }

    this.pillType = PillEnum[this.pillIndex];
  }

  changeStock(stock:string) {
    this.store.dispatch(StocksActions.stock(stock));
  }
}

enum PillEnum {
  change,
  percentage
}
