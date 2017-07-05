import {StockDataInterface} from '../../state/watchlist-state';
import {get} from 'lodash';

export class FavoritesHighlightService {
  getHighlights(stocks: StockDataInterface[], lastLoadedData: any): any {
    const data: any = {};

    stocks.forEach((stock: StockDataInterface) => {
      data[stock.symbol] = {
        price: this.getHighlight(stock.price, Number(get(lastLoadedData, stock.symbol + '.price')))
      };
    });

    return data;
  }

  getLastLoadedData(stocks: StockDataInterface[]): any {
    const data: any = {};

    stocks.forEach((stock: StockDataInterface) => {
      data[stock.symbol] = {
        price: stock.price
      };
    });

    return data;
  }

  private getHighlight(value: number, prevValue: number): string {
    let highlight: string;
    if (!isNaN(value) && !isNaN(prevValue) && value !== prevValue) {
      highlight = (value > prevValue) ? 'mdl-color--green-A100' : 'mdl-color--red-100';
    }
    return highlight;
  }
}
