import { ConfigInterface } from './config.interface';

const DevConfig: ConfigInterface = {
  env: 'DEV',
  paths: {
    charts: './assets/csv/chart.csv',
    news: './assets/json/news-details.json',
    proxy: 'http://www.marinpetkov.com/proxy.php',
    search: './assets/json/search.json',
    stocks: './assets/json/stocks.json',
    info: './assets/json/info.json'
  }
};

export = DevConfig;
