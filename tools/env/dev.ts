import { ConfigInterface } from './config.interface';

const yqlUrl:string = 'https://query.yahooapis.com/v1/public/yql';

const DevConfig: ConfigInterface = {
  env: 'DEV',
  paths: {
    charts: './assets/json/chart.json',
    news: './assets/json/news.json',
    proxy: 'http://www.marinpetkov.com/proxy.php',
    search: './assets/json/search.json',
    stocks: yqlUrl +
    '?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20($stocks)' +
    '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
  }
};

export = DevConfig;
