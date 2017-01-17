export class ConfigService {
  static yqlUrl:string = 'https://query.yahooapis.com/v1/public/yql';

  static queries():any {
    return {
      quotes: this.yqlUrl +
      '?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20($stocks)' +
      '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    };
  }
}
