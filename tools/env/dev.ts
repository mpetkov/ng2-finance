import { ConfigInterface } from './config.interface';

const DevConfig: ConfigInterface = {
  env: 'DEV',
  paths: {
    charts: './assets/json/chart/$stock/$range.json',
    news: './assets/json/news/$stock.json',
    proxy: 'http://www.marinpetkov.com/proxy.php',
    search: './assets/json/search.json',
    stocks: './assets/json/stocks.json',
    info: './assets/json/info/$stock.json'
  }
};

export = DevConfig;
