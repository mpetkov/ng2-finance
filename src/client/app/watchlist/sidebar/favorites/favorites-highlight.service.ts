declare let _:any;

export class FavoritesHighlightService {
  getHighlights(stocks:any[], lastLoadedData:any):any {
    let data:any = {};

    stocks.forEach((stock:any) => {
      data[stock.symbol] = {
        price: this.getHighlight(stock.price, _.get(lastLoadedData, stock.symbol + '.price'))
      };
    });

    return data;
  }

  getLastLoadedData(stocks:any[]):any {
    let data:any = {};

    stocks.forEach((stock:any) => {
      data[stock.symbol] = {
        price: stock.price
      };
    });

    return data;
  }

  private getHighlight(value:number, prevValue:number):string {
    let highlight:string;

    if (prevValue !== null && prevValue !== undefined && value !== prevValue) {
      highlight = (value > prevValue) ? 'mdl-color--green-A100' : 'mdl-color--red-100';
    }

    return highlight;
  }
}
