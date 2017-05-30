// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  notifications: {
    noData: 'No results found',
    noStock: 'Please select a stock symbol',
    search: 'Type a company name or stock symbol',
    noFavorites: 'Your favorites is empty'
  },
  chartRanges: [
    {id: '1d', text: '1d', interval: '1m'},
    {id: '5d', text: '1w', interval: '5m'},
    {id: '3mo', text: '3m', interval: '1d'},
    {id: '6mo', text: '6m', interval: '1d'},
    {id: '1y', text: '1y', interval: '1d'},
    {id: '5y', text: '5y', interval: '1wk'},
    {id: 'max', text: 'max', interval: '1mo'}
  ],
  paths: {
    charts: './assets/json/chart/$stock/$range.json',
    news: './assets/json/news/$stock.json',
    proxy: 'http://www.marinpetkov.com/proxy.php',
    search: './assets/json/search.json',
    stocks: './assets/json/stocks.json',
    info: './assets/json/info/$stock.json'
  }
};
